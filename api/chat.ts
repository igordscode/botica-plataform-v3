import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenAI } from '@google/genai';

const AGENTS: Record<string, { name: string; role: string; personality: string; goal: string }> = {
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
  },
};

const PRODUCT_CATALOG = `
- Acelerador Lipo-Max (Adelgazamiento): 195.000 Gs | Carnitina 1000mg + Picolinato de Cromo
- Night Burn Capsules (Adelgazamiento): 155.000 Gs | HCA 1500mg + Forskolin
- Cortador de Apetito Elite (Adelgazamiento): 175.000 Gs | Spirulina + Glucomanano
- Cetona Guaraní Pro (Adelgazamiento): 165.000 Gs | Cetonas de Framboesa + Chá Verde
- Neuro-Boost Pro (Rendimiento Fisico): 225.000 Gs | Nootropico Premium
- Testo-Max Natural (Rendimiento Fisico): 285.000 Gs | Ácido D-Aspártico + Feno Grego
- Endurance Ultra Caps (Rendimiento Fisico): 195.000 Gs | Creatina 3g + Beta-Alanina
- Recovery Matrix Pro (Rendimiento Fisico): 245.000 Gs | BCAA + Glutamina + HMB
- Colageno Verisol 3D (Dermocosmeticos): 195.000 Gs | Verisol 5g + Ácido Hialurônico
- Sérum Vitamina C 20% (Dermocosmeticos): 145.000 Gs | Vitamina C estabilizada
- Protetor Solar Nano Fps50 (Dermocosmeticos): 125.000 Gs | Filtro mineral + Niacinamida
- Ácido Hialurónico Sérum (Dermocosmeticos): 165.000 Gs | AH puro reticulado
- Serenidad Sleep (Salud): 125.000 Gs | Melatonina + Passiflora + Magnésio
- Bio-Glow Beauty Caps (Beleza): 210.000 Gs | Oli Ola + Picnogenol
- And more categories: Mujer, Hombre, Linea Home
`;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'GEMINI_API_KEY not configured' });
  }

  try {
    const { history, agent: currentAgent } = req.body as {
      history: { role: string; content: string }[];
      agent: string;
    };

    const agent = AGENTS[currentAgent] || AGENTS.SOFIA;

    const systemInstruction = `
      You are ${agent.name}, the ${agent.role} at Botica Guaraní.
      Your personality: ${agent.personality}
      Your goal: ${agent.goal}
      
      Context: Botica Guaraní is a high-end pharmacy specializing in personalized formulas and performance supplements.
      We have categories like Health, Beauty, Weight Loss, Physical Performance, and Dermocosmetics.

      Available Products:
      ${PRODUCT_CATALOG}
      
      Current Customer Journey State: ${currentAgent}
      
      Instructions:
      - Respond concisely (max 3 lines).
      - Be human and warm.
      - If you are Sofia, triage the user's need.
      - If you are Lucas, focus on explaining benefits and closing the order, suggesting specific products from the list.
      - If you are Elena, be technical and safe.
      - If you are Post-Sale, be grateful and ask for feedback.
      - Format output using standard markdown. Use bolding and line breaks nicely.
      - Never use numbered lists (unless strictly technical/Elena).
      - You can switch agents if needed by saying "[SWITCH_TO:AGENT_ID]". Choices: SOFIA, LUCAS, ELENA, POSVENDA.
    `;

    const ai = new GoogleGenAI({ apiKey });

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: history.map((h) => ({
        role: h.role as 'user' | 'model',
        parts: [{ text: h.content }],
      })),
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    return res.status(200).json({ text: response.text || 'Desculpe, tive um problema ao processar sua mensagem.' });
  } catch (error) {
    console.error('Gemini API error:', error);
    return res.status(500).json({ error: 'Failed to get AI response' });
  }
}
