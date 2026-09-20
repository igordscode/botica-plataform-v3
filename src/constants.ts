export const CONTACT = {
  whatsappNumber: '595992221423',
  whatsappDisplay: '+595 992 221423',
  email: 'hola@boticaguarani.com',
  address: 'Av. Monseñor Rodríguez, Patio Fuelpar (ex Km4), Ciudad del Este, Paraguay',
  hours: 'Lun-Vie 7-12 / 13-17, Sáb 7-12',
  instagram: 'https://instagram.com/boticaguarani',
  facebook: 'https://facebook.com/boticaguarani',
};

export const waLink = (message: string) =>
  `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(message)}`;

export const COLORS = {
  azulPetroleo: '#152C60',
  vermelhoTelha: '#2B5DB6',
  laranjaVibrante: '#5C88DA',
  begeClaro: '#F3F6FA',
  azulPincelado: '#2F70A3',
};

export const AGENTS = {
  SOFIA: {
    name: 'Sofia',
    role: 'Recepcionista Digital',
    personality: 'Amigável, eficiente, organizada. Usa espanhol (voseo) ou português (BR).',
    goal: 'Primeira linha de atendimento, triagem e direcionamento.',
  },
  LUCAS: {
    name: 'Lucas',
    role: 'Comercial/SDR',
    personality: 'Consultivo, confiável, educativo. Não usa listas numeradas.',
    goal: 'Prospecção, qualificação, orçamento e fechamento.',
  },
  ELENA: {
    name: 'Dra. Elena',
    role: 'Expertise Técnica',
    personality: 'Profissional, técnica mas acessível. Foco em saúde e segurança.',
    goal: 'Dúvidas técnicas, interações medicamentosas, dosagens.',
  },
  POSVENDA: {
    name: 'Pós-Venda',
    role: 'Fidelização',
    personality: 'Empática, atenciosa, grata.',
    goal: 'Satisfação, feedback, recompra, retenção.',
  }
};

export const CATEGORIES = [
  'Salud',
  'Beleza',
  'Adelgazamiento',
  'Rendimiento Fisico',
  'Dermocosmeticos',
  'Linea Home',
  'Mujer',
  'Hombre'
];
