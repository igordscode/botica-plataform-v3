import { AGENTS } from "../constants";

export async function getAgentResponse(history: { role: string; content: string }[], currentAgent: keyof typeof AGENTS) {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ history, agent: currentAgent }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('API error:', errorData);
      throw new Error(errorData.error || 'Failed to get response');
    }

    const data = await response.json();
    return data.text || "Desculpe, tive um problema ao processar sua mensagem.";
  } catch (error) {
    console.error('Chat service error:', error);
    return "Desculpe, tive um problema ao processar sua mensagem. Tente novamente.";
  }
}
