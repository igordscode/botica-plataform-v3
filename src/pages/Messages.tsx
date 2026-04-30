import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Search, Send, Paperclip, MoreVertical, Check, CheckCheck, Smile, Phone, Video } from 'lucide-react';

export default function Messages() {
  const [activeChat, setActiveChat] = useState<number>(1);
  const [messageText, setMessageText] = useState('');

  const chats = [
    {
      id: 1,
      name: 'Dr. Fernando Lemos',
      type: 'Médico Prescritor',
      avatar: 'https://images.unsplash.com/photo-1612349317150-e410f624c427?w=100&h=100&fit=crop',
      unread: 2,
      lastMessage: 'Vou ajustar a dose da sua formulação base.',
      time: '10:30',
      online: true
    },
    {
      id: 2,
      name: 'Sofia (IA Guaraní)',
      type: 'Assistente Virtual',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop',
      unread: 0,
      lastMessage: 'Aqui está a literatura sobre Ashwagandha...',
      time: 'Ontem',
      online: true
    },
    {
      id: 3,
      name: 'Suporte Farmacêutico',
      type: 'Equipe Técnica',
      avatar: 'https://images.unsplash.com/photo-1582750433449-648ed127c09e?w=100&h=100&fit=crop',
      unread: 0,
      lastMessage: 'Seu pedido #8472 foi despachado.',
      time: 'Segunda',
      online: false
    }
  ];

  const activeChatData = chats.find(c => c.id === activeChat);

  return (
    <div className="bg-[#F3F6FA] h-screen pt-20 flex flex-col overflow-hidden">
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 flex gap-6 overflow-hidden">
        
        {/* Sidebar */}
        <div className="w-full md:w-80 lg:w-96 bg-white rounded-3xl shadow-sm border border-[#152C60]/5 flex flex-col overflow-hidden shrink-0 hidden md:flex">
          <div className="p-6 border-b border-[#152C60]/5">
            <h2 className="text-2xl font-serif font-black text-[#152C60] mb-4">Mensagens</h2>
            <div className="relative">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#152C60]/40" />
              <input 
                type="text" 
                placeholder="Buscar conversa..." 
                className="w-full bg-[#F3F6FA] rounded-xl py-3 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-[#2B5DB6] transition-all"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {chats.map(chat => (
              <div 
                key={chat.id}
                onClick={() => setActiveChat(chat.id)}
                className={`flex items-center gap-4 p-4 cursor-pointer transition-colors border-b border-[#152C60]/5 last:border-0 ${
                  activeChat === chat.id ? 'bg-[#152C60]/5' : 'hover:bg-[#F3F6FA]'
                }`}
              >
                <div className="relative">
                  <img src={chat.avatar} alt={chat.name} className="w-12 h-12 rounded-full object-cover" />
                  {chat.online && (
                    <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-bold text-[#152C60] truncate">{chat.name}</h3>
                    <span className="text-[10px] font-bold text-[#152C60]/40">{chat.time}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className={`text-xs truncate ${chat.unread ? 'font-bold text-[#152C60]' : 'text-[#152C60]/60'}`}>
                      {chat.lastMessage}
                    </p>
                    {chat.unread > 0 && (
                      <span className="bg-[#2B5DB6] text-white text-[9px] font-black w-5 h-5 flex items-center justify-center rounded-full ml-2 shrink-0">
                        {chat.unread}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 bg-white rounded-3xl shadow-sm border border-[#152C60]/5 flex flex-col overflow-hidden relative">
          {activeChatData ? (
            <>
              {/* Chat Header */}
              <div className="p-6 border-b border-[#152C60]/5 flex items-center justify-between bg-white/80 backdrop-blur-md z-10">
                <div className="flex items-center gap-4">
                  <img src={activeChatData.avatar} alt={activeChatData.name} className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <h2 className="font-bold text-[#152C60] text-lg leading-tight">{activeChatData.name}</h2>
                    <p className="text-[10px] font-black uppercase tracking-widest text-[#2B5DB6]">
                      {activeChatData.type}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#F3F6FA] text-[#152C60]/60 transition-colors">
                    <Phone size={18} />
                  </button>
                  <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#F3F6FA] text-[#152C60]/60 transition-colors">
                    <Video size={18} />
                  </button>
                  <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#F3F6FA] text-[#152C60]/60 transition-colors">
                    <MoreVertical size={18} />
                  </button>
                </div>
              </div>

              {/* Messages Area */}
              <div className="flex-1 p-6 overflow-y-auto bg-[#F3F6FA]/30 flex flex-col gap-6">
                <div className="text-center">
                  <span className="bg-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-[#152C60]/40 shadow-sm border border-[#152C60]/5">
                    Hoje
                  </span>
                </div>

                <div className="flex flex-col gap-2 max-w-[80%] self-start">
                  <div className="bg-white p-4 rounded-2xl rounded-tl-sm shadow-sm border border-[#152C60]/5 text-[#152C60] text-sm">
                    Olá! Estive analisando seus últimos exames e notei uma melhora significativa nos marcadores de estresse.
                  </div>
                  <span className="text-[10px] font-bold text-[#152C60]/40 ml-1">10:28</span>
                </div>

                <div className="flex flex-col gap-2 max-w-[80%] self-end items-end">
                  <div className="bg-[#152C60] p-4 rounded-2xl rounded-tr-sm shadow-sm text-white text-sm">
                    Excelente notícia Dr.! Realmente tenho me sentido com mais energia nos treinos após começarmos o novo protocolo com Rhodiola e Ashwagandha. O sono também está bem melhor.
                  </div>
                  <div className="flex items-center gap-1 mr-1">
                    <span className="text-[10px] font-bold text-[#152C60]/40">10:29</span>
                    <CheckCheck size={12} className="text-[#2B5DB6]" />
                  </div>
                </div>

                <div className="flex flex-col gap-2 max-w-[80%] self-start">
                  <div className="bg-white p-4 rounded-2xl rounded-tl-sm shadow-sm border border-[#152C60]/5 text-[#152C60] text-sm">
                    Perfeito. Com base nisso, vou ajustar a dose da sua formulação base. Vou enviar a nova prescrição direto para a farmácia e ela aparecerá no seu painel.
                  </div>
                  <span className="text-[10px] font-bold text-[#152C60]/40 ml-1">10:30</span>
                </div>
              </div>

              {/* Input Area */}
              <div className="p-4 bg-white border-t border-[#152C60]/5">
                <div className="flex items-center gap-3 bg-[#F3F6FA] p-2 rounded-2xl">
                  <button className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white text-[#152C60]/40 transition-colors shrink-0">
                    <Paperclip size={20} />
                  </button>
                  <input 
                    type="text" 
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    placeholder="Digite sua mensagem..." 
                    className="flex-1 bg-transparent outline-none text-sm text-[#152C60] placeholder-[#152C60]/40"
                  />
                  <button className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white text-[#152C60]/40 transition-colors shrink-0 hidden sm:flex">
                    <Smile size={20} />
                  </button>
                  <button className={`w-10 h-10 flex items-center justify-center rounded-xl transition-colors shrink-0 ${
                    messageText.trim() ? 'bg-[#2B5DB6] text-white shadow-md' : 'bg-white text-[#152C60]/40'
                  }`}>
                    <Send size={18} className={messageText.trim() ? 'ml-1' : ''} />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8 opacity-50">
              <div className="w-24 h-24 bg-[#F3F6FA] rounded-full flex items-center justify-center mb-6 text-[#152C60]/20">
                <Send size={40} />
              </div>
              <h2 className="text-2xl font-serif font-black text-[#152C60] mb-2">Suas Conversas</h2>
              <p className="text-sm font-medium">Selecione um chat na barra lateral para começar a enviar mensagens.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
