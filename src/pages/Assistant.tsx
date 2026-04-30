import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Send, User, Bot, Sparkles, RefreshCcw, Paperclip, X, FileText, CheckCircle2, Menu, Plus, MessageSquare, Settings, ChevronLeft, ChevronRight, Activity, Brain } from 'lucide-react';
import { AGENTS } from '../constants';
import { getAgentResponse } from '../services/geminiService';
import { db, auth } from '../lib/firebase';
import { collection, addDoc, serverTimestamp, doc, setDoc, query, where, orderBy, onSnapshot, getDocs, limit, deleteDoc } from 'firebase/firestore';
import { handleFirestoreError, OperationType } from '../lib/firestore';
import { trackEvent } from '../services/analytics';
import { Link } from 'react-router-dom';

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
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [sidebarMode, setSidebarMode] = useState<'chats' | 'agents'>('chats');
  const [chatSessions, setChatSessions] = useState<{id: string, title?: string, currentAgent: string, updatedAt: any}[]>([]);
  const [isCreatingAgent, setIsCreatingAgent] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load existing sessions list
  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const q = query(
      collection(db, 'chatSessions'),
      where('userId', '==', user.uid),
      orderBy('updatedAt', 'desc'),
      limit(20)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setChatSessions(snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as any)));
      
      // Select the first one initially if no session is set
      if (!sessionId && snapshot.docs.length > 0) {
        selectSession(snapshot.docs[0].id);
      }
    });

    return () => unsubscribe();
  }, [auth.currentUser]);

  const selectSession = async (id: string) => {
    try {
      setSessionId(id);
      setIsCreatingAgent(false);
      
      const mq = query(
        collection(db, `chatSessions/${id}/messages`),
        orderBy('createdAt', 'asc')
      );
      const mSnapshot = await getDocs(mq);
      if (!mSnapshot.empty) {
        setMessages(mSnapshot.docs.map(d => ({
          role: d.data().role,
          content: d.data().content,
          agent: d.data().agent
        })));
      } else {
        setMessages([{ role: 'model', content: 'Olá! Sou a IA da Botica Guaraní. Como posso ajudar?', agent: 'SOFIA' }]);
      }

      // Update current agent based on session (simplified)
      const sessionData = chatSessions.find(s => s.id === id);
      if (sessionData && sessionData.currentAgent) {
        setCurrentAgent(sessionData.currentAgent as any);
      }

    } catch (e) {
      console.error(e);
    }
  };

  const createNewSession = async () => {
    const user = auth.currentUser;
    if (!user) return;
    
    setIsCreatingAgent(false);
    setMessages([{ role: 'model', content: 'Olá! Sou a IA da Botica Guaraní. Como posso ajudar com sua performance ou saúde hoje?', agent: 'SOFIA' }]);
    setCurrentAgent('SOFIA');
    
    try {
      const newSession = await addDoc(collection(db, 'chatSessions'), {
        userId: user.uid,
        currentAgent: 'SOFIA',
        title: 'Nova Conversa',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      setSessionId(newSession.id);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'chatSessions');
    }
  };

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
    
    // Auto-generate title for first message if title is new
    if (messages.length <= 1 && sessionId) {
       const titleSnippet = input.substring(0, 30) + (input.length > 30 ? '...' : '');
       await setDoc(doc(db, 'chatSessions', sessionId), { title: titleSnippet }, { merge: true });
    }

    setInput('');
    setAttachedFile(null);
    setIsLoading(true);
    trackEvent('Chat', 'Message Sent', currentAgent);

    const user = auth.currentUser;
    
    let activeSessionId = sessionId;
    if (user && !activeSessionId) {
      const newSession = await addDoc(collection(db, 'chatSessions'), {
        userId: user.uid,
        currentAgent: currentAgent,
        title: input.substring(0, 30) + (input.length > 30 ? '...' : ''),
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      activeSessionId = newSession.id;
      setSessionId(activeSessionId);
    }

    if (user && activeSessionId) {
      try {
        await addDoc(collection(db, `chatSessions/${activeSessionId}/messages`), {
          sessionId: activeSessionId,
          role: 'user',
          content: messageContent,
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
          
          if (user && activeSessionId) {
            await setDoc(doc(db, 'chatSessions', activeSessionId), { 
              currentAgent: nextAgent,
              updatedAt: serverTimestamp()
            }, { merge: true });
          }
        }
      }

      const modelMessage = { role: 'model', content: processedText, agent: nextAgent };
      setMessages(prev => [...prev, modelMessage]);

      if (user && activeSessionId) {
        await addDoc(collection(db, `chatSessions/${activeSessionId}/messages`), {
          sessionId: activeSessionId,
          role: 'model',
          content: processedText,
          agent: nextAgent,
          createdAt: serverTimestamp()
        });
        await setDoc(doc(db, 'chatSessions', activeSessionId), { updatedAt: serverTimestamp() }, { merge: true });
      }
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'model', content: "Ocorreu um erro no sistema. Por favor, tente novamente.", agent: currentAgent }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-[calc(100vh-74px)] md:h-[calc(100vh-88px)] bg-white flex overflow-hidden font-sans pt-0">
      
      {/* Sidebar (Desktop & Mobile with toggle) */}
      <div 
        className={`${isSidebarOpen ? 'w-[280px] shrink-0' : 'w-0'} transition-all duration-300 bg-[#F9FBFC] border-r border-[#152C60]/5 hidden md:flex flex-col relative z-20 overflow-hidden`}
      >
        <div className="p-4">
           <button 
             onClick={createNewSession}
             className="w-full flex items-center justify-between px-4 py-3 bg-white border border-[#152C60]/10 rounded-2xl hover:bg-[#F3F6FA] hover:border-[#2B5DB6] transition-all text-[#152C60] shadow-sm group"
           >
              <div className="flex items-center gap-2 font-bold text-sm">
                <Sparkles size={16} className="text-[#2B5DB6]" /> Nova Conversa
              </div>
              <Plus size={16} className="text-[#152C60]/40 group-hover:text-[#2B5DB6]" />
           </button>
        </div>

        <div className="flex border-b border-[#152C60]/5 mx-4 mt-2">
           <button 
             onClick={() => setSidebarMode('chats')}
             className={`flex-1 pb-3 text-xs font-black uppercase tracking-widest transition-colors ${sidebarMode === 'chats' ? 'text-[#2B5DB6] border-b-2 border-[#2B5DB6]' : 'text-[#152C60]/40'}`}
           >
             Histórico
           </button>
           <button 
             onClick={() => setSidebarMode('agents')}
             className={`flex-1 pb-3 text-xs font-black uppercase tracking-widest transition-colors ${sidebarMode === 'agents' ? 'text-[#2B5DB6] border-b-2 border-[#2B5DB6]' : 'text-[#152C60]/40'}`}
           >
             Meus Gems
           </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-1 scrollbar-hide">
           {sidebarMode === 'chats' && (
             chatSessions.map((session) => (
               <button 
                 key={session.id}
                 onClick={() => selectSession(session.id)}
                 className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-[#152C60]/5 transition-colors text-left ${sessionId === session.id && !isCreatingAgent ? 'bg-[#152C60]/5 font-bold' : ''}`}
               >
                 <MessageSquare size={16} className={`shrink-0 ${sessionId === session.id ? 'text-[#2B5DB6]' : 'text-[#152C60]/40'}`} />
                 <span className="text-sm truncate text-[#152C60]/80">
                   {session.title || 'Nova Conversa'}
                 </span>
               </button>
             ))
           )}

           {sidebarMode === 'agents' && (
             <>
               <button 
                 onClick={() => setIsCreatingAgent(true)}
                 className="w-full flex items-center justify-center gap-2 px-3 py-4 rounded-xl border border-dashed border-[#152C60]/20 hover:border-[#2B5DB6] hover:bg-[#2B5DB6]/5 transition-all text-[#152C60]/60 hover:text-[#2B5DB6] mb-4 group"
               >
                 <div className="p-1 rounded-full bg-[#152C60]/5 group-hover:bg-[#2B5DB6]/20">
                   <Plus size={14} />
                 </div>
                 <span className="text-[10px] font-black uppercase tracking-widest">Criar "Gem" Pessoal</span>
               </button>
               
               <div className="mb-2 px-2 text-[9px] font-bold uppercase tracking-widest text-[#152C60]/30 py-2">Especialistas Oficiais</div>
               {Object.entries(AGENTS).map(([key, config]) => (
                  <button 
                   key={key}
                   className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-[#152C60]/5 transition-colors text-left ${currentAgent === key && !isCreatingAgent ? 'bg-white shadow-sm border border-[#152C60]/5' : ''}`}
                   onClick={() => {
                     setCurrentAgent(key as any);
                     setIsCreatingAgent(false);
                   }}
                 >
                   <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#152C60] to-[#2B5DB6] flex items-center justify-center shadow-inner shrink-0">
                     <Sparkles size={12} className="text-white" />
                   </div>
                   <div className="overflow-hidden">
                     <div className="text-sm font-bold text-[#152C60] truncate">{config.name}</div>
                     <div className="text-[9px] font-black uppercase tracking-widest text-[#152C60]/40 truncate">{config.role}</div>
                   </div>
                 </button>
               ))}
             </>
           )}
        </div>

        <div className="p-4 border-t border-[#152C60]/5">
          <Link to="/conta" className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-[#152C60]/5 transition-colors text-left group">
            <div className="w-8 h-8 rounded-full bg-[#152C60]/10 flex items-center justify-center shrink-0">
               <User size={14} className="text-[#152C60]" />
            </div>
            <span className="text-xs font-bold text-[#152C60] group-hover:text-[#2B5DB6]">Seu Perfil</span>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col relative w-full h-full">
        {/* Top bar */}
        <div className="h-16 shrink-0 border-b border-[#152C60]/5 flex items-center justify-between px-4 sticky top-0 bg-white/80 backdrop-blur-md z-30">
          <div className="flex items-center gap-3">
             <button 
               onClick={() => setIsSidebarOpen(!isSidebarOpen)}
               className="p-2 rounded-xl text-[#152C60]/40 hover:bg-[#F3F6FA] hover:text-[#152C60] transition-colors md:flex hidden"
             >
               <Menu size={20} />
             </button>
             
             {isCreatingAgent ? (
               <div className="flex items-center gap-2">
                 <Brain className="text-[#2B5DB6]" size={20} />
                 <span className="font-serif font-black text-lg text-[#152C60]">Criar Gem</span>
               </div>
             ) : (
               <div className="flex items-center gap-2 group cursor-pointer hover:bg-[#F3F6FA] p-1.5 px-3 rounded-xl transition-colors">
                  <span className="font-serif font-black text-lg text-[#152C60]">{AGENTS[currentAgent]?.name || 'GuaranIA'}</span>
                  <ChevronRight size={14} className="text-[#152C60]/40" />
               </div>
             )}
          </div>
          <div>
            {!isCreatingAgent && (
              <button 
                onClick={createNewSession}
                className="w-8 h-8 rounded-full hover:bg-[#F3F6FA] flex items-center justify-center text-[#152C60]/50"
              >
                <Plus size={18} />
              </button>
            )}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-x-hidden relative flex flex-col bg-white">
          
          {isCreatingAgent ? (
            /* Gem Creation View */
            <div className="flex-1 overflow-y-auto p-4 md:p-8 max-w-4xl mx-auto w-full">
               <div className="mb-8">
                 <h2 className="text-3xl font-serif font-black text-[#152C60] mb-2">Configure seu especialista.</h2>
                 <p className="text-[#152C60]/60">Forneça contexto, PDFs de exames ou protocolos para que a IA atue como seu assistente personalizado.</p>
               </div>

               <div className="space-y-6">
                  <div className="bg-[#F3F6FA] rounded-3xl p-6 border border-[#152C60]/5">
                     <label className="block text-xs font-black uppercase tracking-widest text-[#152C60] mb-2">Nome do Gem</label>
                     <input type="text" placeholder="Ex: Meu Nutricionista Clínico" className="w-full bg-white rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#2B5DB6] border border-[#152C60]/5 font-bold" />
                  </div>

                  <div className="bg-[#F3F6FA] rounded-3xl p-6 border border-[#152C60]/5">
                     <label className="block text-xs font-black uppercase tracking-widest text-[#152C60] mb-2">Instruções de Sistema (System Prompt)</label>
                     <p className="text-xs text-[#152C60]/50 mb-3">Como a IA deve se comportar? Quais regras ela deve seguir?</p>
                     <textarea 
                       placeholder="Você é um especialista em interpretação de exames de sangue focados em longevidade (TIR, VCM alto, Hemocisteína). Você nunca deve receitar medicamentos alopáticos, e sim enfatizar correções via suplementação e fitoterapia orgânica..."
                       className="w-full h-40 bg-white rounded-2xl p-4 outline-none focus:ring-2 focus:ring-[#2B5DB6] border border-[#152C60]/5 resize-none"
                     ></textarea>
                  </div>

                  <div className="bg-[#F3F6FA] rounded-3xl p-6 border border-[#152C60]/5">
                     <div className="flex items-center justify-between mb-4">
                       <div>
                         <label className="block text-xs font-black uppercase tracking-widest text-[#152C60] mb-1">Base de Conhecimento</label>
                         <p className="text-xs text-[#152C60]/50">Envie PDFs, exames, protocolos do Dr. Lemos para referenciar.</p>
                       </div>
                       <button className="px-4 py-2 bg-white text-[#2B5DB6] border border-[#2B5DB6]/20 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#2B5DB6] hover:text-white transition-colors flex items-center gap-2">
                         <Plus size={14} /> Arquivos
                       </button>
                     </div>
                     
                     <div className="border-2 border-dashed border-[#152C60]/10 rounded-2xl bg-white p-8 text-center">
                       <FileText size={32} className="mx-auto text-[#152C60]/20 mb-3" />
                       <p className="font-bold text-sm text-[#152C60]/60">Nenhum conhecimento anexado ainda.</p>
                     </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-4 border-t border-[#152C60]/5">
                     <button onClick={() => setIsCreatingAgent(false)} className="px-6 py-3 rounded-2xl font-bold text-[#152C60]/60 hover:bg-[#F3F6FA]">Cancelar</button>
                     <button onClick={() => setIsCreatingAgent(false)} className="px-6 py-3 rounded-2xl font-black uppercase tracking-widest text-[10px] bg-[#152C60] text-white hover:bg-[#2B5DB6] shadow-xl">Salvar e Conversar</button>
                  </div>
               </div>
            </div>
          ) : (
            /* Chat View */
            <>
              {messages.length <= 1 ? (
                 <div className="flex-1 flex flex-col items-center justify-center p-6 text-center max-w-2xl mx-auto w-full">
                    <div className="w-20 h-20 bg-gradient-to-br from-[#152C60] to-[#2B5DB6] rounded-[2rem] flex items-center justify-center shadow-2xl mb-8 -rotate-6 transform hover:rotate-0 transition-transform duration-500">
                       <Sparkles size={32} className="text-white" />
                    </div>
                    <h1 className="text-3xl font-serif font-black text-[#152C60] mb-4">
                       Como posso ajudar com seus resultados hoje?
                    </h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full mt-8">
                       <button onClick={() => setInput('Analise o meu último exame de Testosterona Livre e me sugira ajustes com fitoativos.')} className="p-4 rounded-2xl bg-[#F3F6FA] border border-[#152C60]/5 hover:border-[#2B5DB6] hover:bg-white text-left transition-all group">
                         <span className="block font-bold text-sm text-[#152C60] mb-1">Interpretar Exames</span>
                         <span className="block text-xs text-[#152C60]/50 group-hover:text-[#2B5DB6]">Faça upload e eu te ajudo a entender.</span>
                       </button>
                       <button onClick={() => setInput('Me indique quais suplementos devo usar para melhorar meu sono REM, que está a menos de 10% do ideal.')} className="p-4 rounded-2xl bg-[#F3F6FA] border border-[#152C60]/5 hover:border-[#2B5DB6] hover:bg-white text-left transition-all group">
                         <span className="block font-bold text-sm text-[#152C60] mb-1">Rotina de Sono</span>
                         <span className="block text-xs text-[#152C60]/50 group-hover:text-[#2B5DB6]">Tire dúvidas sobre Ashwagandha, Magnésio, etc.</span>
                       </button>
                    </div>
                 </div>
              ) : (
                <div className="flex-1 overflow-y-auto p-4 md:p-8 md:pb-40 pb-40 scrollbar-hide space-y-6">
                  <div className="max-w-3xl mx-auto space-y-8 w-full">
                    {messages.map((m, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex gap-4 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        {m.role !== 'user' && (
                          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#152C60] to-[#2B5DB6] flex items-center justify-center shrink-0 mt-1 shadow-md">
                            <Sparkles size={14} className="text-white" />
                          </div>
                        )}
                        <div className={`max-w-[85%] ${m.role === 'user' ? '' : ''}`}>
                          {m.role === 'user' ? (
                            <div className="bg-[#F3F6FA] text-[#152C60] px-5 py-3 rounded-3xl rounded-tr-sm text-[15px] leading-relaxed">
                              {m.content}
                            </div>
                          ) : (
                            <div className="text-[#152C60] text-[15px] leading-relaxed prose prose-p:my-2 prose-headings:font-serif prose-headings:font-bold prose-a:text-[#2B5DB6] prose-strong:text-[#152C60]">
                              <Markdown remarkPlugins={[remarkGfm]}>{m.content}</Markdown>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                    {isLoading && (
                      <div className="flex gap-4">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#152C60] to-[#2B5DB6] flex items-center justify-center shrink-0 mt-1 shadow-md overflow-hidden relative">
                           <div className="absolute inset-0 bg-white/20 animate-pulse" />
                           <Sparkles size={14} className="text-white relative z-10" />
                        </div>
                        <div className="flex items-center gap-1.5 h-10">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#152C60]/30 animate-bounce" style={{ animationDelay: '0ms' }} />
                          <div className="w-1.5 h-1.5 rounded-full bg-[#152C60]/30 animate-bounce" style={{ animationDelay: '150ms' }} />
                          <div className="w-1.5 h-1.5 rounded-full bg-[#152C60]/30 animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                </div>
              )}

              {/* Input Area */}
              <div className="absolute bottom-6 left-0 right-0 px-4 z-40 bg-gradient-to-t from-white via-white to-transparent pt-10 pb-2">
                <div className="max-w-3xl mx-auto w-full relative">
                  <AnimatePresence>
                    {attachedFile && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute bottom-full mb-3 left-4 bg-white px-4 py-2 rounded-xl shadow-lg border border-[#152C60]/10 flex items-center gap-3"
                      >
                        <FileText size={16} className="text-[#2B5DB6]" />
                        <span className="text-xs font-bold text-[#152C60] truncate max-w-[150px]">{attachedFile.name}</span>
                        <button onClick={() => setAttachedFile(null)} className="ml-1 text-[#152C60]/40 hover:text-red-500">
                          <X size={14} />
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="bg-[#F3F6FA] rounded-[2rem] border border-[#152C60]/5 shadow-sm focus-within:bg-white focus-within:shadow-md focus-within:border-[#2B5DB6]/30 transition-all flex items-end p-2.5">
                    <input 
                      type="file" 
                      className="hidden" 
                      ref={fileInputRef} 
                      onChange={(e) => setAttachedFile(e.target.files?.[0] || null)}
                    />
                    <button 
                      onClick={() => fileInputRef.current?.click()}
                      className="w-10 h-10 shrink-0 rounded-[1rem] bg-white text-[#152C60]/50 hover:text-[#2B5DB6] flex items-center justify-center shadow-sm"
                      title="Anexar Arquivo ou Receita"
                    >
                      <Paperclip size={18} />
                    </button>
                    
                    <textarea
                      value={input}
                      onChange={(e) => {
                        setInput(e.target.value);
                        e.target.style.height = 'auto';
                        e.target.style.height = `${Math.min(e.target.scrollHeight, 200)}px`;
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSend();
                        }
                      }}
                      placeholder="Envie uma mensagem a GuaranIA..."
                      className="flex-1 max-h-[200px] min-h-[40px] resize-none bg-transparent py-2.5 px-4 focus:outline-none text-[#152C60] text-sm md:text-[15px] scrollbar-hide"
                      rows={1}
                    />
                    
                    <button
                      onClick={handleSend}
                      disabled={isLoading || (!input.trim() && !attachedFile)}
                      className="w-10 h-10 shrink-0 bg-[#152C60] text-white rounded-[1rem] flex items-center justify-center hover:bg-[#2B5DB6] transition-all disabled:opacity-30 disabled:bg-[#152C60]/30"
                    >
                      <Send size={16} className="ml-0.5" />
                    </button>
                  </div>
                  <div className="text-center mt-3 text-[10px] text-[#152C60]/40 font-medium">
                    A IA pode cometer erros. Considere verificar informações importantes com um profissional.
                  </div>
                </div>
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
}
