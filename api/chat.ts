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

export default async function handler(req: VercelRequest, res: VercelResponse) {
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
      
      Current Customer Journey State: ${currentAgent}
      
      Instructions:
      - Respond concisely (max 3 lines).
      - Be human and warm.
      - If you are Sofia, triage the user's need.
      - If you are Lucas, focus on explaining benefits and closing the order.
      - If you are Elena, be technical and safe.
      - If you are Post-Sale, be grateful and ask for feedback.
      - Never use numbered lists (unless strictly technical/Elena).
      - You can switch agents if needed by saying "[SWITCH_TO:AGENT_ID]". Choices: SOFIA, LUCAS, ELENA, POSVENDA.
    `;

    const ai = new GoogleGenAI({ apiKey });

    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
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
