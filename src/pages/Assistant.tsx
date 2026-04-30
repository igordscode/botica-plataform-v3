import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Send, User, Bot, Sparkles, RefreshCcw, Paperclip, X, FileText, CheckCircle2 } from 'lucide-react';
import { AGENTS } from '../constants';
import { getAgentResponse } from '../services/geminiService';
import { db, auth } from '../lib/firebase';
import { collection, addDoc, serverTimestamp, doc, setDoc, query, where, orderBy, onSnapshot, getDocs, limit } from 'firebase/firestore';
import { handleFirestoreError, OperationType } from '../lib/firestore';
import { trackEvent } from '../services/analytics';

export default function Assistant() {
  const [messages, setMessages] = useState<{ role: string; content: string; agent?: string }[]>([
    { 
      role: 'model', 
      content: 'Hola! Soy Sofia, de Botica Guaraní 😊 ¿Cómo posso te ajudar hoje?', 
      agent: 'SOFIA' 
    }
  ]);
  const [input, setInput] = useState('');
  const [currentAgent, setCurrentAgent] = useState<keyof typeof AGENTS>('SOFIA');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [attachedFile, setAttachedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load existing session or create new one if logged in
  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
       setSessionId(null);
       return;
    }

    const initSession = async () => {
      try {
        const q = query(
          collection(db, 'chatSessions'),
          where('userId', '==', user.uid),
          orderBy('updatedAt', 'desc'),
          limit(1)
        );
        const snapshot = await getDocs(q);
        
        if (!snapshot.empty) {
          const lastSession = snapshot.docs[0];
          setSessionId(lastSession.id);
          setCurrentAgent(lastSession.data().currentAgent as keyof typeof AGENTS);
          
          // Load messages for this session
          const mq = query(
            collection(db, `chatSessions/${lastSession.id}/messages`),
            orderBy('createdAt', 'asc')
          );
          const mSnapshot = await getDocs(mq);
          if (!mSnapshot.empty) {
            setMessages(mSnapshot.docs.map(d => ({
              role: d.data().role,
              content: d.data().content,
              agent: d.data().agent
            })));
          }
        } else {
          // Create new session
          const newSession = await addDoc(collection(db, 'chatSessions'), {
            userId: user.uid,
            currentAgent: 'SOFIA',
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
          });
          setSessionId(newSession.id);
        }
      } catch (error) {
        handleFirestoreError(error, OperationType.WRITE, 'chatSessions');
      }
    };

    initSession();
  }, [auth.currentUser]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if ((!input.trim() && !attachedFile) || isLoading) return;

    let messageContent = input;
    if (attachedFile) {
      messageContent += `\n\n[Arquivo anexo: ${attachedFile.name}]`;
    }

    const userMessage = { role: 'user', content: messageContent };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setAttachedFile(null);
    setIsLoading(true);
    trackEvent('Chat', 'Message Sent', currentAgent);

    const user = auth.currentUser;
    if (user && sessionId) {
      try {
        await addDoc(collection(db, `chatSessions/${sessionId}/messages`), {
          sessionId,
          role: 'user',
          content: input,
          createdAt: serverTimestamp()
        });
      } catch (e) {
        console.error("Error saving message", e);
      }
    }

    try {
      // Prepare history for API
      const history = messages.map(m => ({ role: m.role, content: m.content }));
      history.push(userMessage);

      const responseText = await getAgentResponse(history, currentAgent);
      
      // Check for agent switch command
      let processedText = responseText;
      let nextAgent = currentAgent;
      const switchMatch = responseText.match(/\[SWITCH_TO:(.*?)\]/);
      
      if (switchMatch) {
        const targetAgent = switchMatch[1] as keyof typeof AGENTS;
        if (AGENTS[targetAgent]) {
          nextAgent = targetAgent;
          processedText = responseText.replace(/\[SWITCH_TO:.*?\]/, '').trim();
          setCurrentAgent(nextAgent);
          trackEvent('Chat', 'Agent Switch', nextAgent);
          
          if (user && sessionId) {
            await setDoc(doc(db, 'chatSessions', sessionId), { 
              currentAgent: nextAgent,
              updatedAt: serverTimestamp()
            }, { merge: true });
          }
        }
      }

      const modelMessage = { role: 'model', content: processedText, agent: nextAgent };
      setMessages(prev => [...prev, modelMessage]);

      if (user && sessionId) {
        await addDoc(collection(db, `chatSessions/${sessionId}/messages`), {
          sessionId,
          role: 'model',
          content: processedText,
          agent: nextAgent,
          createdAt: serverTimestamp()
        });
        await setDoc(doc(db, 'chatSessions', sessionId), { updatedAt: serverTimestamp() }, { merge: true });
      }
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'model', content: "Ocorreu um erro no sistema. Por favor, tente novamente.", agent: currentAgent }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative h-[calc(100dvh-74px)] md:h-[calc(100vh-88px)] flex flex-col bg-[#F3F6FA] overflow-hidden">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-white to-transparent pointer-events-none z-0" />
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#2B5DB6]/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 -left-32 w-96 h-96 bg-[#2B5DB6]/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="w-full max-w-4xl mx-auto flex-1 flex flex-col relative z-10 px-6 py-12">
        <div className="flex items-center justify-between mb-12">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-2 h-2 bg-[#2B5DB6] rounded-full animate-pulse shadow-[0_0_10px_rgba(43,93,182,0.8)]" />
              <span className="text-xs font-black uppercase tracking-titles text-[#152C60]/60 tracking-[0.2em]">
                {AGENTS[currentAgent].role}
              </span>
            </div>
            <h1 className="text-4xl font-serif font-black text-[#152C60] tracking-tighter">
              Guaraní <span className="text-[#2B5DB6] font-light italic">Intelligence</span>
            </h1>
          </div>
          <button 
            onClick={() => {
              setMessages([{ role: 'model', content: 'Olá! Sou a IA da Botica Guaraní. Como posso ajudar com sua performance ou saúde hoje?', agent: 'SOFIA' }]);
              setCurrentAgent('SOFIA');
            }}
            className="w-12 h-12 rounded-full border border-[#152C60]/10 flex items-center justify-center text-[#152C60]/40 hover:text-[#2B5DB6] hover:bg-white transition-all hover:scale-105 active:scale-95 bg-white/50 backdrop-blur-sm"
            title="Nova Conversa"
          >
            <RefreshCcw size={18} />
          </button>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto space-y-8 scrollbar-hide pb-[200px] md:pb-40 pt-4 px-2 -mx-2">
          {messages.map((m, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05, duration: 0.4, ease: "easeOut" }}
              className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div className={`max-w-[85%] md:max-w-[75%] ${m.role === 'user' ? 'text-right' : 'text-left'}`}>
                {m.role !== 'user' && (
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-[#152C60] to-[#2B5DB6] flex items-center justify-center shadow-lg">
                      <Sparkles size={12} className="text-white" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#152C60]/50">
                      {m.agent ? AGENTS[m.agent as keyof typeof AGENTS]?.name : 'Assistente'}
                    </span>
                  </div>
                )}
                
                <div className={`relative group ${
                  m.role === 'user' 
                    ? 'inline-block bg-[#152C60] text-white px-6 py-4 rounded-3xl rounded-tr-sm shadow-xl shadow-[#152C60]/10 text-base font-medium' 
                    : 'text-[#152C60] text-lg leading-relaxed'
                }`}>
                  {m.role === 'user' ? (
                    m.content
                  ) : (
                    <div className="markdown-body prose prose-lg prose-p:leading-relaxed text-[#152C60] prose-headings:font-serif prose-headings:font-bold prose-a:text-[#2B5DB6] prose-strong:text-[#152C60] mt-1">
                      <Markdown remarkPlugins={[remarkGfm]}>{m.content}</Markdown>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
          {isLoading && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-start"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-[#152C60] to-[#2B5DB6] flex items-center justify-center shadow-lg relative overflow-hidden">
                   <div className="absolute inset-0 bg-white/20 animate-pulse" />
                   <Sparkles size={12} className="text-white relative z-10" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#152C60]/50">
                  Processando
                </span>
              </div>
              <div className="flex gap-1.5 ml-2">
                <div className="w-2 h-2 rounded-full bg-[#2B5DB6]/40 animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 rounded-full bg-[#2B5DB6]/40 animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 rounded-full bg-[#2B5DB6]/40 animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Floating Input Area */}
        <div className="absolute bottom-[130px] md:bottom-6 left-4 right-4 md:left-auto md:right-auto md:w-full max-w-4xl mx-auto z-20">
          <AnimatePresence>
            {attachedFile && (
              <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute bottom-full mb-4 left-0 bg-white/90 backdrop-blur-md px-4 py-3 rounded-2xl shadow-xl shadow-[#152C60]/5 border border-[#152C60]/10 flex items-center gap-4"
              >
                <div className="w-10 h-10 bg-[#2B5DB6]/10 rounded-xl flex items-center justify-center text-[#2B5DB6]">
                  <FileText size={18} />
                </div>
                <div>
                  <p className="text-xs font-black uppercase text-[#152C60] tracking-wider truncate max-w-[200px]">
                    {attachedFile.name}
                  </p>
                  <p className="text-[9px] text-[#2B5DB6] font-bold uppercase tracking-widest mt-0.5">Pronto para Análise</p>
                </div>
                <button onClick={() => setAttachedFile(null)} className="p-2 ml-2 text-[#152C60]/40 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                  <X size={16} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="bg-white/80 backdrop-blur-xl p-2 md:p-3 rounded-[2rem] shadow-[0_20px_40px_-15px_rgba(21,44,96,0.1)] border border-white/50 relative overflow-hidden group transition-all duration-300 hover:shadow-[0_20px_40px_-15px_rgba(21,44,96,0.15)] focus-within:shadow-[0_20px_40px_-15px_rgba(21,44,96,0.2)] focus-within:bg-white">
            <div className="flex items-end gap-2">
              <input 
                type="file" 
                className="hidden" 
                ref={fileInputRef} 
                onChange={(e) => setAttachedFile(e.target.files?.[0] || null)}
              />
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="w-12 h-12 md:w-14 md:h-14 shrink-0 rounded-[1.25rem] bg-[#F3F6FA] text-[#152C60]/50 hover:text-[#2B5DB6] hover:bg-[#2B5DB6]/5 flex items-center justify-center transition-all"
                title="Anexar Arquivo ou Receita"
              >
                <Paperclip size={20} />
              </button>
              
              <textarea
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  e.target.style.height = 'auto';
                  e.target.style.height = `${Math.min(e.target.scrollHeight, 150)}px`;
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                placeholder="Como posso otimizar sua performance hoje?"
                className="flex-1 max-h-[150px] min-h-[56px] resize-none bg-transparent py-4 px-2 focus:outline-none text-[#152C60] placeholder:text-[#152C60]/30 text-[15px] leading-relaxed scrollbar-hide"
                rows={1}
              />
              
              <button
                onClick={handleSend}
                disabled={isLoading || (!input.trim() && !attachedFile)}
                className="w-12 h-12 md:w-14 md:h-14 shrink-0 bg-[#152C60] text-white rounded-[1.25rem] flex items-center justify-center hover:bg-[#2B5DB6] hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:hover:scale-100 disabled:hover:bg-[#152C60]"
              >
                {isLoading ? <RefreshCcw className="animate-spin" size={20} /> : <Send size={18} className="ml-1" />}
              </button>
            </div>
          </div>
          <div className="mt-4 text-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#152C60]/30">
              Guaraní Intelligence — Powered by Gemini 2.5
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
