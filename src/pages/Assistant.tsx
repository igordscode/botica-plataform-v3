import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
    <div className="max-w-4xl mx-auto px-6 py-12 h-[calc(100vh-80px)] flex flex-col">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-[#2B5DB6] rounded-2xl flex items-center justify-center text-white shadow-lg shadow-[#2B5DB6]/20">
            <Sparkles size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-serif font-black uppercase tracking-tighter leading-none mb-1">Concierge Guaraní</h1>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#152C60]/60">
                Operado por: <span className="text-[#2B5DB6]">{AGENTS[currentAgent].name} ({AGENTS[currentAgent].role})</span>
              </span>
            </div>
          </div>
        </div>
        <button 
          onClick={() => {
            setMessages([{ role: 'model', content: 'Hola! Soy Sofia, de Botica Guaraní 😊 ¿Cómo posso te ajudar hoje?', agent: 'SOFIA' }]);
            setCurrentAgent('SOFIA');
          }}
          className="p-2 text-[#152C60]/40 hover:text-[#2B5DB6] transition-colors"
          title="Reiniciar conversa"
        >
          <RefreshCcw size={20} />
        </button>
      </div>

      <div className="flex-1 bg-white rounded-[2.5rem] border border-[#152C60]/5 shadow-2xl shadow-[#152C60]/5 overflow-hidden flex flex-col">
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((m, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: m.role === 'user' ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex gap-3 max-w-[80%] ${m.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm ${
                  m.role === 'user' ? 'bg-[#152C60] text-white' : 'bg-[#F3F6FA] text-[#2B5DB6]'
                }`}>
                  {m.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                </div>
                <div className={`p-4 rounded-3xl text-sm leading-relaxed ${
                  m.role === 'user' 
                    ? 'bg-[#152C60] text-white rounded-tr-none' 
                    : 'bg-[#F3F6FA] text-[#152C60] rounded-tl-none border border-[#152C60]/5'
                }`}>
                  {m.content}
                </div>
              </div>
            </motion.div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex gap-3 animate-pulse">
                <div className="w-8 h-8 rounded-full bg-[#F3F6FA] flex items-center justify-center text-[#2B5DB6]">
                  <Bot size={16} />
                </div>
                <div className="bg-[#F3F6FA] h-10 w-24 rounded-3xl rounded-tl-none border border-[#152C60]/5" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 border-t border-[#152C60]/5 bg-white space-y-4">
          <AnimatePresence>
            {attachedFile && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center text-green-600">
                    <FileText size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase text-green-800 leading-none">{attachedFile.name}</p>
                    <p className="text-[8px] text-green-600 font-bold">PRONTO PARA ANALISAR</p>
                  </div>
                </div>
                <button onClick={() => setAttachedFile(null)} className="p-2 text-green-800/40 hover:text-green-800 transition-colors">
                  <X size={16} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="relative group flex gap-3">
            <input 
              type="file" 
              className="hidden" 
              ref={fileInputRef} 
              onChange={(e) => setAttachedFile(e.target.files?.[0] || null)}
            />
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="w-14 h-14 bg-[#F3F6FA] text-[#152C60]/40 hover:text-[#2B5DB6] rounded-2xl flex items-center justify-center transition-all border border-transparent hover:border-[#2B5DB6]"
            >
              <Paperclip size={20} />
            </button>
            <div className="relative flex-1">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Digite sua mensagem ou anexe uma fórmula..."
                className="w-full pl-6 pr-14 py-4 bg-[#F3F6FA]/50 rounded-2xl border border-transparent focus:outline-none focus:border-[#2B5DB6] focus:bg-white transition-all text-sm"
              />
              <button
                onClick={handleSend}
                disabled={isLoading}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#2B5DB6] text-white rounded-xl flex items-center justify-center hover:bg-[#5C88DA] transition-colors disabled:opacity-50 shadow-lg shadow-[#2B5DB6]/20"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
          <p className="text-[10px] text-center text-[#152C60]/30 font-bold uppercase tracking-widest">
            Tecnologia Gemini 3 Flash • Concierge Guaraní
          </p>
        </div>
      </div>
    </div>
  );
}
