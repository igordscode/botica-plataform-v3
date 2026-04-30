export const PRODUCTS = [
  // --- ADELGAZAMIENTO (1-8) ---
  { 
    id: 1, name: 'Acelerador Lipo-Max', category: 'Adelgazamiento', price: '165.000 Gs', desc: 'Té Verde + Garcinia + L-Carnitina', tags: ['Metabolismo', 'Natural'],
    subCategory: 'Metabolismo', rating: 4.9, inStock: true, science_seal: "LabGuarani Phytotech",
    benefits: ['Aceleração Metabólica', 'Redução de Medidas', 'Mais Disposição'],
    ai_insight: 'Sofia: Ideal para tomar 30 min antes do treino matinal.',
    fullDesc: 'Sinergia de extratos secos concentrados para aceleração metabólica basal. Combina Té Verde, Garcinia Cambogia e L-Carnitina.',
    images: ['https://images.unsplash.com/photo-1594882645126-14020914d58d?auto=format&fit=crop&q=60&w=800']
  },
  { 
    id: 2, name: 'Sugar-Blocker Pro', category: 'Adelgazamiento', price: '145.000 Gs', desc: 'Picolinato de Cromo + Chitosan', tags: ['Controle', 'Doce'],
    subCategory: 'Controle', rating: 4.8, inStock: true, science_seal: "Padrão Botica Guaraní",
    benefits: ['Controle de Insulina', 'Bloqueio de Gordura'],
    ai_insight: 'Sofia: Reduz a vontade de comer doces à tarde.',
    fullDesc: 'Picolinato de Cromo em alta concentração associado ao Chitosan para bloquear gorduras e reduzir picos de insulina.',
    images: ['https://images.unsplash.com/photo-1591343395902-1adcb454c2e6?auto=format&fit=crop&q=60&w=800']
  },
  { 
    id: 3, name: 'Detox-Night Cleanse', category: 'Adelgazamiento', price: '125.000 Gs', desc: 'Cascara Sagrada + Porangaba', tags: ['Limpeza', 'Noite'],
    subCategory: 'Limpeza', rating: 4.7, inStock: true, science_seal: "Padrão Botica Guaraní",
    benefits: ['Limpeza Digestiva', 'Efeito Noturno'],
    ai_insight: 'Sofia: Melhora o inchaço abdominal ao acordar.',
    fullDesc: 'Cascara Sagrada e Porangaba para suporte ao trânsito intestinal e eliminação de toxinas durante o sono.',
    images: ['https://images.unsplash.com/photo-1594882645126-14020914d58d?auto=format&fit=crop&q=60&w=800']
  },
  { 
    id: 4, name: 'Dreno-Turbo Oral', category: 'Adelgazamiento', price: '135.000 Gs', desc: 'Cavalinha + Té Verde', tags: ['Drenagem', 'Retenção'],
    subCategory: 'Drenagem', rating: 4.6, inStock: true, science_seal: "Padrão Botica Guaraní",
    benefits: ['Redução de Edema', 'Leveza'],
    ai_insight: 'Sofia: Beba pelo menos 2L de água para potencializar.',
    fullDesc: 'Fórmula drenante com Cavalinha e Té Verde para redução de edema e inchaço.',
    images: ['https://images.unsplash.com/photo-1591343395902-1adcb454c2e6?auto=format&fit=crop&q=60&w=800']
  },
  { 
    id: 45, name: 'Chitosan Fat-Binder', category: 'Adelgazamiento', price: '110.000 Gs', desc: 'Fibra natural que absorve gorduras.', tags: ['Fibra', 'Dieta'],
    subCategory: 'Bloqueador', rating: 4.5, inStock: true, science_seal: "Padrão", benefits: ['Redução de Caloria'], ai_insight: 'Sofia: Use antes das refeições gordurosas.',
    fullDesc: 'O Chitosan é uma fibra extraída de crustáceos que auxilia no controle de peso.',
    images: ['https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?auto=format&fit=crop&q=60&w=800']
  },
  { 
    id: 46, name: 'Porangaba Slim-Drink', category: 'Adelgazamiento', price: '90.000 Gs', desc: 'Suporte natural para perda de medidas.', tags: ['Natural', 'Slim'],
    subCategory: 'Diurético', rating: 4.4, inStock: true, science_seal: "Padrão", benefits: ['Ação Natural'], ai_insight: 'Sofia: Suporte natural para perda de medidas.',
    fullDesc: 'Extrato concentrado de Porangaba para auxílio na saciedade.',
    images: ['https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=60&w=800']
  },
  { 
    id: 47, name: 'Cascara Sagrada Gentle', category: 'Adelgazamiento', price: '75.000 Gs', desc: 'Regularidade intestinal garantida.', tags: ['Intestino', 'Saúde'],
    subCategory: 'Digestivo', rating: 4.3, inStock: true, science_seal: "Padrão", benefits: ['Bem-estar'], ai_insight: 'Sofia: Regularidade intestinal garantida.',
    fullDesc: 'Ativo clássico para constipação ocasional.',
    images: ['https://images.unsplash.com/photo-1471864190281-ad5fe9acaca7?auto=format&fit=crop&q=60&w=800']
  },
  { 
    id: 48, name: 'Metabolic Cromo-Max', category: 'Adelgazamiento', price: '85.000 Gs', desc: 'Regulação glicêmica avançada.', tags: ['Metabolismo', 'Elite'],
    subCategory: 'Insulina', rating: 4.8, inStock: true, science_seal: "Padrão", benefits: ['Controle do Doce'], ai_insight: 'Sofia: Regulação glicêmica avançada.',
    fullDesc: '400mcg de Cromo Quelado para otimizar o metabolismo.',
    images: ['https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&q=60&w=800']
  },

  // --- RENDIMIENTO FISICO (9-16) ---
  { 
    id: 5, name: 'Testo-Alpha Boost', category: 'Rendimiento Fisico', price: '195.000 Gs', desc: 'Zinco + Arginina + Boro', tags: ['Vigor', 'Força'],
    subCategory: 'Performance Masculina', rating: 4.9, inStock: true, science_seal: "LabGuarani Elite",
    benefits: ['Vigor Masculino', 'Recuperação'],
    ai_insight: 'Sofia: Melhora a libido e a força nos treinos.',
    fullDesc: 'Zinco Quelado, Arginina e Boro para suporte à testosterona e força.',
    images: ['https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=60&w=800']
  },
  { 
    id: 6, name: 'Neuro-Flow Focus', category: 'Rendimiento Fisico', price: '145.000 Gs', desc: 'Ashwagandha + Ginko Biloba', tags: ['Foco', 'Cérebro'],
    subCategory: 'Neuro-Performance', rating: 4.8, inStock: true, science_seal: "Padrão",
    benefits: ['Foco Executivo', 'Gestão de Estresse'],
    ai_insight: 'Sofia: Ideal para manhãs de alta demanda cognitiva.',
    fullDesc: 'Sinergia entre Ashwagandha KSM-66 e Ginko Biloba.',
    images: ['https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=60&w=800']
  },
  { 
    id: 7, name: 'Recovery Magnesium Triple', category: 'Rendimiento Fisico', price: '115.000 Gs', desc: 'Citrato + Bisglicinato + Quelado', tags: ['Sono', 'Músculos'],
    subCategory: 'Recuperación', rating: 4.9, inStock: true, science_seal: "Padrão",
    benefits: ['Fim das Cãibras', 'Sono Reparador'],
    ai_insight: 'Sofia: Tome após o último treino do dia.',
    fullDesc: 'Citrato, Bisglicinato e Quelado para recuperação muscular e sono.',
    images: ['https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&q=60&w=800']
  },
  { 
    id: 8, name: 'Pre-Workout Energy Bio', category: 'Rendimiento Fisico', price: '155.000 Gs', desc: 'Arginina + Vitamina C + Magnésio', tags: ['Pump', 'Energia'],
    subCategory: 'Energia', rating: 4.5, inStock: true, science_seal: "Padrão",
    benefits: ['Aumento de Performance', 'Vasodilatação'],
    ai_insight: 'Sofia: Vasodilatação superior para o seu "Pump".',
    fullDesc: 'Arginina, Vitamina C e Magnésio para performance intensa.',
    images: ['https://images.unsplash.com/photo-1593079831268-3381b0f4977b?auto=format&fit=crop&q=60&w=800']
  },
  { 
    id: 49, name: 'Arginina Nitric-Pump', category: 'Rendimiento Fisico', price: '130.000 Gs', desc: 'Melhora o fluxo sanguíneo e o "pump".', tags: ['Pump', 'Vascularização'],
    subCategory: 'Vasodilatador', rating: 4.7, inStock: true, science_seal: "Padrão", benefits: ['Oxigenação'], ai_insight: 'Sofia: Melhora o fluxo sanguíneo.',
    fullDesc: 'L-Arginina pura para otimização da performance vascular.',
    images: ['https://images.unsplash.com/photo-1593079831268-3381b0f4977b?auto=format&fit=crop&q=60&w=800']
  },
  { 
    id: 50, name: 'Muscle-Repair Glutamina', category: 'Rendimiento Fisico', price: '120.000 Gs', desc: 'Recuperação muscular e saúde imune.', tags: ['Reparação', 'Imunidade'],
    subCategory: 'Recuperación', rating: 4.8, inStock: true, science_seal: "Padrão", benefits: ['Proteção'], ai_insight: 'Sofia: Recuperação muscular.',
    fullDesc: 'L-Glutamina pura de grau farmacêutico para proteção contra o catabolismo.',
    images: ['https://images.unsplash.com/photo-1559089733-517415fa01ea?auto=format&fit=crop&q=60&w=800']
  },
  { 
    id: 51, name: 'Energy-Boost Complex B', category: 'Rendimiento Fisico', price: '95.000 Gs', desc: 'Vitamina B12 e ativos energéticos.', tags: ['Energia', 'Saúde'],
    subCategory: 'Vitalidad', rating: 4.6, inStock: true, science_seal: "Padrão", benefits: ['ATP'], ai_insight: 'Sofia: Vitamina B12 e ativos energéticos.',
    fullDesc: 'Complexo B completo para suporte ao sistema nervoso e produção de ATP.',
    images: ['https://images.unsplash.com/photo-1616671285410-994df5684784?auto=format&fit=crop&q=60&w=800']
  },
  { 
    id: 52, name: 'Endurance Beta-Alanina', category: 'Rendimiento Fisico', price: '140.000 Gs', desc: 'Reduz a fadiga muscular periférica.', tags: ['Resistência', 'Fadiga'],
    subCategory: 'Resistencia', rating: 4.7, inStock: true, science_seal: "Padrão", benefits: ['Resistência'], ai_insight: 'Sofia: Reduz a fadiga muscular.',
    fullDesc: 'Aumenta os níveis de carnosina nos músculos, permitindo treinos mais longos.',
    images: ['https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=60&w=800']
  },

  // --- DERMOCOSMETICOS (17-24) ---
  { 
    id: 9, name: 'Serum Hialurônico 4D', category: 'Dermocosmeticos', price: '175.000 Gs', desc: 'Ácido Hialurônico Multipeso.', tags: ['Anti-idade', 'Elite'],
    subCategory: 'Hidratación', rating: 4.9, inStock: true, science_seal: "LabGuarani Skin",
    benefits: ['Hidratação 24h', 'Preenchimento'],
    ai_insight: 'Sofia: Use de manhã e à noite antes do protetor.',
    fullDesc: 'Penetra profundamente para hidratação e preenchimento de linhas.',
    images: ['https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=60&w=800']
  },
  { 
    id: 10, name: 'Peeling Renew Noturno', category: 'Dermocosmeticos', price: '155.000 Gs', desc: 'Glicólico + Láctico renovador.', tags: ['Peeling', 'Manchas'],
    subCategory: 'Renovación', rating: 4.8, inStock: true, science_seal: "Padrão",
    benefits: ['Pele Renovada', 'Fim das Manchas'],
    ai_insight: 'Sofia: Obrigatório usar protetor solar no dia seguinte.',
    fullDesc: 'Esfoliação química suave noturna para clarear manchas e uniformizar a pele.',
    images: ['https://images.unsplash.com/photo-1552046122-03184de85e08?auto=format&fit=crop&q=60&w=800']
  },
  { 
    id: 11, name: 'Serum C-Glow 15%', category: 'Dermocosmeticos', price: '185.000 Gs', desc: 'Vitamina C + Vitamina E.', tags: ['Luminosidade', 'Proteção'],
    subCategory: 'Luminosidad', rating: 4.7, inStock: true, science_seal: "Padrão",
    benefits: ['Escudo Antioxidante', 'Brilho Natural'],
    ai_insight: 'Sofia: Sua dose diária de brilho e proteção UV.',
    fullDesc: 'Antioxidante potente para brilho e proteção contra radicais livres.',
    images: ['https://images.unsplash.com/photo-1590156216881-96866bf74771?auto=format&fit=crop&q=60&w=800']
  },
  { 
    id: 12, name: 'B-Control Niacinamida', category: 'Dermocosmeticos', price: '125.000 Gs', desc: 'Niacinamida + Zinco PCA', tags: ['Poros', 'Zinco'],
    subCategory: 'Oleosidad', rating: 4.6, inStock: true, science_seal: "Padrão",
    benefits: ['Controle de Oleosidade', 'Pele Lisa'],
    ai_insight: 'Sofia: Excelente para peles mistas e oleosas.',
    fullDesc: 'Niacinamida 10% + Zinco PCA para peles mistas e oleosas.',
    images: ['https://images.unsplash.com/photo-1576448191517-460b3d3a7ba3?auto=format&fit=crop&q=60&w=800']
  },
  { 
    id: 53, name: 'Urea 10% Soft-Foot', category: 'Dermocosmeticos', price: '65.000 Gs', desc: 'Hidratação profunda para pés ressecados.', tags: ['Uréia', 'Reparação'],
    subCategory: 'Pies', rating: 4.5, inStock: true, science_seal: "Padrão", benefits: ['Reparação'], ai_insight: 'Sofia: Hidratação profunda para pés ressecados.',
    fullDesc: 'Creme com alta concentração de uréia para reparação de fissuras.',
    images: ['https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=60&w=800']
  },
  { 
    id: 54, name: 'Salicilico Anti-Acne', category: 'Dermocosmeticos', price: '85.000 Gs', desc: 'Secativo de espinhas e controle de cravos.', tags: ['Acne', 'Limpeza'],
    subCategory: 'Acne', rating: 4.6, inStock: true, science_seal: "Padrão", benefits: ['Secativo'], ai_insight: 'Sofia: Secativo de espinhas.',
    fullDesc: 'Ácido Salicílico 2% em base gel toque seco.',
    images: ['https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=60&w=800']
  },
  { 
    id: 55, name: 'Vitamina E Lip-Repair', category: 'Dermocosmeticos', price: '45.000 Gs', desc: 'Bálsamo labial regenerador.', tags: ['Lábios', 'Inverno'],
    subCategory: 'Labios', rating: 4.4, inStock: true, science_seal: "Padrão", benefits: ['Regenerador'], ai_insight: 'Sofia: Bálsamo labial regenerador.',
    fullDesc: 'Vitamina E pura e Manteiga de Cacau para proteção labial intensa.',
    images: ['https://images.unsplash.com/photo-1616671285410-994df5684784?auto=format&fit=crop&q=60&w=800']
  },
  { 
    id: 56, name: 'Aloe Vera Soothing-Gel', category: 'Dermocosmeticos', price: '55.000 Gs', desc: 'Gel calmante pós-sol e pós-barba.', tags: ['Aloe', 'Frio'],
    subCategory: 'Calmante', rating: 4.7, inStock: true, science_seal: "Padrão", benefits: ['Refrescância'], ai_insight: 'Sofia: Gel calmante pós-sol.',
    fullDesc: 'Extrato puro de Aloe Vera para regeneração imediata da pele.',
    images: ['https://images.unsplash.com/photo-1556229167-731309f9846b?auto=format&fit=crop&q=60&w=800']
  },

  // --- BELEZA (25-32) ---
  { 
    id: 13, name: 'Sun-Shield Bio-Protector', category: 'Beleza', price: '185.000 Gs', desc: 'Proteção solar oral sistêmica.', tags: ['Sol', 'Oral'],
    subCategory: 'Oral', rating: 4.9, inStock: true, science_seal: "LabGuarani Protect",
    benefits: ['Proteção Celular', 'Prevenção de Manchas'],
    ai_insight: 'Sofia: Essencial para o verão paraguaio.',
    fullDesc: 'Polypodium Leucotomos e Glutathion para prevenção de manchas.',
    images: ['https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=60&w=800']
  },
  { 
    id: 14, name: 'Bio-Glow Beauty Caps', category: 'Beleza', price: '210.000 Gs', desc: 'Peeling em cápsulas (Oli Ola).', tags: ['Clareamento', 'Colágeno'],
    subCategory: 'Pele', rating: 4.8, inStock: true, science_seal: "Padrão",
    benefits: ['Pele Iluminada', 'Estímulo de Colágeno'],
    ai_insight: 'Sofia: Pele renovada sem a agressão do peeling químico.',
    fullDesc: 'Uniformiza o tom da pele e estimula o colágeno de dentro para fora.',
    images: ['https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=60&w=800']
  },
  { 
    id: 39, name: 'Rosa Mosqueta Pure Gold', category: 'Beleza', price: '120.000 Gs', desc: 'Óleo regenerador facial e corporal.', tags: ['Nobre', 'Pele'],
    subCategory: 'Aceites', rating: 4.9, inStock: true, science_seal: "PureGrade", benefits: ['Cicatrizante'], ai_insight: 'Sofia: Óleo regenerador.',
    fullDesc: '100% puro óleo de Rosa Mosqueta prensado a frio para alta performance.',
    images: ['https://images.unsplash.com/photo-1579165466541-74e2b70a112a?auto=format&fit=crop&q=60&w=800']
  },
  { 
    id: 40, name: 'Pantenol Hair-Hydrate', category: 'Beleza', price: '85.000 Gs', desc: 'Brilho e maciez imediata para os fios.', tags: ['Cabelo', 'Brilho'],
    subCategory: 'Capilar', rating: 4.6, inStock: true, science_seal: "Padrão", benefits: ['Sedosidade'], ai_insight: 'Sofia: Brilho imediato.',
    fullDesc: 'D-Pantenol concentrado para uso direto ou misturado.',
    images: ['https://images.unsplash.com/photo-1552046122-03184de85e08?auto=format&fit=crop&q=60&w=800']
  },
  { 
    id: 41, name: 'Unhas de Ferro 15ml', category: 'Beleza', price: '55.000 Gs', desc: 'Base fortalecedora magistral.', tags: ['Unhas', 'Força'],
    subCategory: 'Uñas', rating: 4.8, inStock: true, science_seal: "Padrão", benefits: ['Anti-Quebra'], ai_insight: 'Sofia: Unhas inquebráveis.',
    fullDesc: 'Queratina e Biotina tópica para acabar com unhas quebradiças.',
    images: ['https://images.unsplash.com/photo-1590156216881-96866bf74771?auto=format&fit=crop&q=60&w=800']
  },
  { 
    id: 42, name: 'Resveratrol 100mg Elite', category: 'Beleza', price: '195.000 Gs', desc: 'A molécula da juventude.', tags: ['Célula', 'Jovem'],
    subCategory: 'Longevidad', rating: 4.9, inStock: true, science_seal: "Padrão", benefits: ['Antienvelhecimento'], ai_insight: 'Sofia: O segredo dos centenários.',
    fullDesc: 'Antioxidante potente derivado de uvas.',
    images: ['https://images.unsplash.com/photo-1579165466541-74e2b70a112a?auto=format&fit=crop&q=60&w=800']
  },
  { 
    id: 31, name: 'Pantenol Hydrate Mist', category: 'Beleza', price: '85.000 Gs', desc: 'Hidratação versátil e imediata.', tags: ['Mist', 'Praticidade'],
    subCategory: 'Piel y Pelo', rating: 4.6, inStock: true, science_seal: "Padrão", benefits: ['Frescor'], ai_insight: 'Sofia: Hidratação em spray.',
    fullDesc: 'D-Pantenol em spray para refrescar e hidratar.',
    images: ['https://images.unsplash.com/photo-1552046122-03184de85e08?auto=format&fit=crop&q=60&w=800']
  },
  { 
    id: 32, name: 'Antiox-Plus Glow', category: 'Beleza', price: '145.000 Gs', desc: 'Vitamina C + Picnogenol.', tags: ['Antiox', 'Beleza'],
    subCategory: 'Oral', rating: 4.7, inStock: true, science_seal: "Padrão", benefits: ['Brilho'], ai_insight: 'Sofia: Ilumina o semblante.',
    fullDesc: 'Combate as manchas de dentro para fora.',
    images: ['https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=60&w=800']
  },

  // --- SALUD (33-40) ---
  { 
    id: 17, name: 'Bio-Immune Guard D3', category: 'Salud', price: '95.000 Gs', desc: 'D3 50.000 UI + Zinco Quelado.', tags: ['Defesa', 'Vitamina D'],
    subCategory: 'Inmunología', rating: 4.9, inStock: true, science_seal: "ImmuneBoost",
    benefits: ['Defesa Total', 'Regulação Imune'],
    ai_insight: 'Sofia: Indispensável para quem trabalha em escritórios.',
    fullDesc: 'Regulação do sistema imune e saúde óssea total.',
    images: ['https://images.unsplash.com/photo-1616671285410-994df5684784?auto=format&fit=crop&q=60&w=800']
  },
  { 
    id: 18, name: 'Liver-Detox Pro Hepatic', category: 'Salud', price: '115.000 Gs', desc: 'Silimarina + Metionina + Alcachofra', tags: ['Fígado', 'Detox'],
    subCategory: 'Hepatoprotector', rating: 4.8, inStock: true, science_seal: "Padrão",
    benefits: ['Limpeza Hepática', 'Melhor Digestão'],
    ai_insight: 'Sofia: Melhora a digestão e elimina o cansaço hepático.',
    fullDesc: 'Silimarina e Metionina para suporte ao fígado sobrecarregado.',
    images: ['https://images.unsplash.com/photo-1559089733-517415fa01ea?auto=format&fit=crop&q=60&w=800']
  },
  { 
    id: 19, name: 'Lugol Forte Solution', category: 'Salud', price: '75.000 Gs', desc: 'Iodo Inorgânico 5%.', tags: ['Tireoide', 'Energia'],
    subCategory: 'Metabolismo', rating: 4.7, inStock: true, science_seal: "Clássico",
    benefits: ['Saúde da Tireoide', 'Foco Mental'],
    ai_insight: 'Sofia: Aumenta seu metabolismo basal de forma segura.',
    fullDesc: 'Essencial para a tireoide e produção de energia basal.',
    images: ['https://images.unsplash.com/photo-1471864190281-ad5fe9acaca7?auto=format&fit=crop&q=60&w=800']
  },
  { 
    id: 20, name: 'Mind-Zen Chill Complex', category: 'Salud', price: '135.000 Gs', desc: 'Ashwagandha + Magnésio + Teanina', tags: ['Paz', 'Cérebro'],
    subCategory: 'Bienestar', rating: 4.6, inStock: true, science_seal: "ZenTech",
    benefits: ['Redução de Ansiedade', 'Clareza Mental'],
    ai_insight: 'Sofia: Perfeito para profissionais sob alta pressão.',
    fullDesc: 'Ashwagandha e Magnésio para reduzir a ansiedade sem sono.',
    images: ['https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=60&w=800']
  },
  { 
    id: 37, name: 'Quebra-Pedra Ultra', category: 'Salud', price: '65.000 Gs', desc: 'Saúde renal natural.', tags: ['Rins', 'Natural'],
    subCategory: 'Urinario', rating: 4.7, inStock: true, science_seal: "Natural", benefits: ['Detox Renal'], ai_insight: 'Sofia: Eliminação de toxinas.',
    fullDesc: 'Phyllanthus niruri para eliminação de toxinas e suporte urinário.',
    images: ['https://images.unsplash.com/photo-1550573104-4eb8260482d4?auto=format&fit=crop&q=60&w=800']
  },
  { 
    id: 38, name: 'Quercetina Immune Plus', category: 'Salud', price: '145.000 Gs', desc: 'Proteção respiratória e antiviral.', tags: ['Pulmão', 'Imunidade'],
    subCategory: 'Inmunología', rating: 4.8, inStock: true, science_seal: "Padrão", benefits: ['Proteção'], ai_insight: 'Sofia: Blindagem imunológica.',
    fullDesc: 'Quercetina associada a Zinco para blindagem imunológica.',
    images: ['https://images.unsplash.com/photo-1616671285410-994df5684784?auto=format&fit=crop&q=60&w=800']
  },
  { 
    id: 39, name: 'Balsamo Blanco Crystal', category: 'Salud', price: '45.000 Gs', desc: 'Unguento clássico.', tags: ['Alívio', 'Clássico'],
    subCategory: 'Respiratorio', rating: 4.9, inStock: true, science_seal: "Padrão", benefits: ['Alívio Local'], ai_insight: 'Sofia: Alívio imediato.',
    fullDesc: 'Mentol e Cânfora pura para alívio imediato do cansaço.',
    images: ['https://images.unsplash.com/photo-1471864190281-ad5fe9acaca7?auto=format&fit=crop&q=60&w=800']
  },
  { 
    id: 40, name: 'Magnesio-Quelado Pro', category: 'Salud', price: '95.000 Gs', desc: 'Suporte muscular e neural.', tags: ['Músculos', 'Saúde'],
    subCategory: 'Minerales', rating: 4.8, inStock: true, science_seal: "Padrão", benefits: ['Alta Pureza'], ai_insight: 'Sofia: Magnésio de alta biodisponibilidade.',
    fullDesc: 'Forma mais pura de magnésio para alta biodisponibilidade celular.',
    images: ['https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&q=60&w=800']
  },

  // --- MUJER (41-48) ---
  { 
    id: 41, name: 'Mujer: Harmony Balance', category: 'Mujer', price: '155.000 Gs', desc: 'Conforto na menopausa e TPM.', tags: ['Equilíbrio', 'Feminino'],
    subCategory: 'Hormonal', rating: 4.9, inStock: true, science_seal: "Padrão", benefits: ['Alívio'], ai_insight: 'Sofia: Equilíbrio hormonal natural.',
    fullDesc: 'Isoflavonas e Vitamina E para modulação hormonal natural.',
    images: ['https://images.unsplash.com/photo-1590156216881-96866bf74771?auto=format&fit=crop&q=60&w=800']
  },
  { 
    id: 42, name: 'Mujer: Hair & Nail Force', category: 'Mujer', price: '135.000 Gs', desc: 'Protocolo de crescimento capilar.', tags: ['Cabelo', 'Unhas'],
    subCategory: 'Estética', rating: 4.8, inStock: true, science_seal: "Padrão", benefits: ['Força'], ai_insight: 'Sofia: Beleza de dentro para fora.',
    fullDesc: 'Protocolo de crescimento com Biotina e Queratina.',
    images: ['https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=60&w=800']
  },
  { 
    id: 43, name: 'Mujer: Iron-Vigor Pro', category: 'Mujer', price: '95.000 Gs', desc: 'Ferro Quelado de alta absorção.', tags: ['Energia', 'Sangue'],
    subCategory: 'Vitalidad', rating: 4.7, inStock: true, science_seal: "Padrão", benefits: ['Energia'], ai_insight: 'Sofia: Suporte na fase menstrual.',
    fullDesc: 'Ferro Quelado para energia contra o cansaço.',
    images: ['https://images.unsplash.com/photo-1616671285410-994df5684784?auto=format&fit=crop&q=60&w=800']
  },
  { 
    id: 44, name: 'Mujer: Libido Rose Rose', category: 'Mujer', price: '185.000 Gs', desc: 'Disposição e desejo natural.', tags: ['Vitalidade', 'Desejo'],
    subCategory: 'Libido', rating: 4.6, inStock: true, science_seal: "Elite", benefits: ['Desejo'], ai_insight: 'Sofia: Disposição natural.',
    fullDesc: 'Maca Peruana e Arginina para bem-estar e vitalidade.',
    images: ['https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=60&w=800']
  },
  { 
    id: 450, name: 'Wild-Yam Menopause', category: 'Mujer', price: '135.000 Gs', desc: 'Precursor natural de progesterona.', tags: ['Natural', 'Mulher'],
    subCategory: 'Hormonal', rating: 4.7, inStock: true, science_seal: "Padrão", benefits: ['Feminino'], ai_insight: 'Sofia: Precursor de progesterona.',
    fullDesc: 'Suporte nos fogachos e oscilações de humor.',
    images: ['https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=60&w=800']
  },
  { 
    id: 460, name: 'Prenatal Gold Complex', category: 'Mujer', price: '220.000 Gs', desc: 'Vitaminas ativas para gestantes.', tags: ['Gestação', 'Saúde'],
    subCategory: 'Maternidad', rating: 4.9, inStock: true, science_seal: "Padrão", benefits: ['Mãe e Bebê'], ai_insight: 'Sofia: Vitaminas ativas.',
    fullDesc: 'Metilfolato e Ferro Quelado para segurança total.',
    images: ['https://images.unsplash.com/photo-1616671285410-994df5684784?auto=format&fit=crop&q=60&w=800']
  },
  { 
    id: 470, name: 'Metionina Detox Caps', category: 'Mujer', price: '110.000 Gs', desc: 'Auxílio na quebra de gordura.', tags: ['Amino', 'Beleza'],
    subCategory: 'Detox', rating: 4.5, inStock: true, science_seal: "Padrão", benefits: ['Pele'], ai_insight: 'Sofia: Metabolismo de gorduras.',
    fullDesc: 'Aminoácido essencial para o metabolismo de gorduras.',
    images: ['https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=60&w=800']
  },
  { 
    id: 480, name: 'Soft-Skin Urea Pro', category: 'Mujer', price: '75.000 Gs', desc: 'Creme hidratante intensivo.', tags: ['Creme', 'Mulher'],
    subCategory: 'Estética', rating: 4.8, inStock: true, science_seal: "Padrão", benefits: ['Maciez'], ai_insight: 'Sofia: Reparação imediata.',
    fullDesc: 'Para peles que precisam de reparação com 10% de Ureia.',
    images: ['https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=60&w=800']
  },

  // --- HOMBRE (49-56) ---
  { 
    id: 490, name: 'Hombre: Alpha Vigor Pro', category: 'Hombre', price: '215.000 Gs', desc: 'Boost de vitalidade masculina.', tags: ['Alpha', 'Vigor'],
    subCategory: 'Testo', rating: 4.9, inStock: true, science_seal: "Padrão", benefits: ['Alpha'], ai_insight: 'Sofia: Vitalidade masculina.',
    fullDesc: 'Tribulus 90% e Zinco para dominar a rotina.',
    images: ['https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=60&w=800']
  },
  { 
    id: 500, name: 'Beard-Grow Master', category: 'Hombre', price: '145.000 Gs', desc: 'Serum de preenchimento para barba.', tags: ['Barba', 'Beleza'],
    subCategory: 'Estética', rating: 4.8, inStock: true, science_seal: "Padrão", benefits: ['Densidade'], ai_insight: 'Sofia: Barba densa.',
    fullDesc: 'Minoxidil e Óleo de Rícino para uma barba densa.',
    images: ['https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?auto=format&fit=crop&q=60&w=800']
  },
  { 
    id: 510, name: 'Prostate-Guard Shield', category: 'Hombre', price: '155.000 Gs', desc: 'Proteção masculina preventiva.', tags: ['Prevenção', 'Saúde'],
    subCategory: 'Salud', rating: 4.7, inStock: true, science_seal: "Padrão", benefits: ['Próstata'], ai_insight: 'Sofia: Proteção preventiva.',
    fullDesc: 'Licopeno e Zinco para saúde prostática.',
    images: ['https://images.unsplash.com/photo-1579165466541-74e2b70a112a?auto=format&fit=crop&q=60&w=800']
  },
  { 
    id: 520, name: 'Sleep-Muscle Elite', category: 'Hombre', price: '125.000 Gs', desc: 'ZMA de alta potência.', tags: ['Recuperação', 'Sono'],
    subCategory: 'Recuperación', rating: 4.9, inStock: true, science_seal: "Padrão", benefits: ['Regeneração'], ai_insight: 'Sofia: Recuperação hormonal.',
    fullDesc: 'Zinco, Magnésio e B6 para recuperação noturna.',
    images: ['https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&q=60&w=800']
  },
  { 
    id: 530, name: 'Hombre: Cardio-Energy', category: 'Hombre', price: '175.000 Gs', desc: 'Proteção do coração.', tags: ['Coração', 'Homem'],
    subCategory: 'Saúde', rating: 4.6, inStock: true, science_seal: "Padrão", benefits: ['Coração'], ai_insight: 'Sofia: Coenzima Q10 cardíaca.',
    fullDesc: 'Coenzima Q10 para suporte mitocondrial.',
    images: ['https://images.unsplash.com/photo-1559089733-517415fa01ea?auto=format&fit=crop&q=60&w=800']
  },
  { 
    id: 540, name: 'Scalp-Revive Shampoo', category: 'Hombre', price: '95.000 Gs', desc: 'Shampoo antiqueda magistral.', tags: ['Cabelo', 'Limpeza'],
    subCategory: 'Capilar', rating: 4.7, inStock: true, science_seal: "Padrão", benefits: ['Antiqueda'], ai_insight: 'Sofia: Limpeza profunda.',
    fullDesc: 'Limpeza profunda e estímulo folicular.',
    images: ['https://images.unsplash.com/photo-1552046122-03184de85e08?auto=format&fit=crop&q=60&w=800']
  },
  { 
    id: 550, name: 'Arginina Max-Vigor', category: 'Hombre', price: '135.000 Gs', desc: 'Vasodilatação e vigor físico.', tags: ['Vigor', 'Vascular'],
    subCategory: 'Libido', rating: 4.8, inStock: true, science_seal: "Padrão", benefits: ['Vigor'], ai_insight: 'Sofia: Fluxo sanguíneo.',
    fullDesc: 'Pura L-Arginina para melhora do fluxo sanguíneo.',
    images: ['https://images.unsplash.com/photo-1593079831268-3381b0f4977b?auto=format&fit=crop&q=60&w=800']
  },
  { 
    id: 560, name: 'Multi-Alpha Men', category: 'Hombre', price: '110.000 Gs', desc: 'Multivitamínico masculino.', tags: ['Vitalidade', 'Elite'],
    subCategory: 'Vitalidad', rating: 4.9, inStock: true, science_seal: "Padrão", benefits: ['Meta'], ai_insight: 'Sofia: Metabolismo masculino.',
    fullDesc: 'Minerais quelados para o metabolismo masculino.',
    images: ['https://images.unsplash.com/photo-1616671285410-994df5684784?auto=format&fit=crop&q=60&w=800']
  },

  // --- LINEA HOME (57-64) ---
  { 
    id: 570, name: 'Mist Relax Lavanda', category: 'Linea Home', price: '85.000 Gs', desc: 'Aroma de pura calma.', tags: ['Calma', 'Casa'],
    subCategory: 'Relax', rating: 4.9, inStock: true, science_seal: "Padrão", benefits: ['Calma'], ai_insight: 'Sofia: Lavanda para ambiente.',
    fullDesc: 'Óleo essencial de Lavanda para ambiente.',
    images: ['https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=60&w=800']
  },
  { 
    id: 580, name: 'Eucalyptus Pure-Air', category: 'Linea Home', price: '75.000 Gs', desc: 'Limpeza respiratória.', tags: ['Fresco', 'Respirar'],
    subCategory: 'Fresco', rating: 4.8, inStock: true, science_seal: "Padrão", benefits: ['Aroma'], ai_insight: 'Sofia: Respiração leve.',
    fullDesc: 'Spray de Eucalipto para purificação.',
    images: ['https://images.unsplash.com/photo-1559089733-517415fa01ea?auto=format&fit=crop&q=60&w=800']
  },
  { 
    id: 590, name: 'Rosemary Focus-Mist', category: 'Linea Home', price: '85.000 Gs', desc: 'Energia mental para foco.', tags: ['Foco', 'Trabalho'],
    subCategory: 'Enfoque', rating: 4.7, inStock: true, science_seal: "Padrão", benefits: ['Foco'], ai_insight: 'Sofia: Alecrim focado.',
    fullDesc: 'Alecrim para aumentar foco no ambiente.',
    images: ['https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=60&w=800']
  },
  { 
    id: 600, name: 'Menta Piperita Refresh', category: 'Linea Home', price: '65.000 Gs', desc: 'Vitalidade e frescor.', tags: ['Menta', 'Fresco'],
    subCategory: 'Energia', rating: 4.6, inStock: true, science_seal: "Padrão", benefits: ['Refresco'], ai_insight: 'Sofia: Menta vitalizante.',
    fullDesc: 'Óleo essencial de menta refrescante.',
    images: ['https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=60&w=800']
  },
  { 
    id: 610, name: 'Home-Detox Citronela', category: 'Linea Home', price: '55.000 Gs', desc: 'Repelente natural.', tags: ['Proteção', 'Natural'],
    subCategory: 'Protección', rating: 4.5, inStock: true, science_seal: "Padrão", benefits: ['Repelente'], ai_insight: 'Sofia: Citronela magistral.',
    fullDesc: 'Proteja sua casa com aroma de citronela.',
    images: ['https://images.unsplash.com/photo-1556229167-731309f9846b?auto=format&fit=crop&q=60&w=800']
  },
  { 
    id: 620, name: 'Spa-Day Vanila Sweet', category: 'Linea Home', price: '95.000 Gs', desc: 'Conforto e doçura.', tags: ['Doce', 'Relax'],
    subCategory: 'Aroma', rating: 4.9, inStock: true, science_seal: "Padrão", benefits: ['Relax'], ai_insight: 'Sofia: Baunilha premium.',
    fullDesc: 'Essência premium de baunilha.',
    images: ['https://images.unsplash.com/photo-1550573104-4eb8260482d4?auto=format&fit=crop&q=60&w=800']
  },
  { 
    id: 630, name: 'Laranja-Vibrante Energy', category: 'Linea Home', price: '85.000 Gs', desc: 'Cítrico renovador.', tags: ['Cítrico', 'Alegria'],
    subCategory: 'Alegria', rating: 4.8, inStock: true, science_seal: "Padrão", benefits: ['Energia'], ai_insight: 'Sofia: Laranja produtiva.',
    fullDesc: 'Óleo essencial de laranja renovador.',
    images: ['https://images.unsplash.com/photo-1594882645126-14020914d58d?auto=format&fit=crop&q=60&w=800']
  },
  { 
    id: 640, name: 'Zen-Garden Sandalo', category: 'Linea Home', price: '110.000 Gs', desc: 'Sândalo para meditação.', tags: ['Zen', 'Paz'],
    subCategory: 'Meditación', rating: 4.9, inStock: true, science_seal: "Padrão", benefits: ['Zen'], ai_insight: 'Sofia: Sândalo profundo.',
    fullDesc: 'Aroma amadeirado profundo.',
    images: ['https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=60&w=800']
  }
];
