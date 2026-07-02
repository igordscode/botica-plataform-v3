import { useState } from 'react';
import { Upload, CheckCircle2 } from 'lucide-react';
import { waLink, CONTACT } from '../constants';

export default function PrescriptionUpload() {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSend = () => {
    window.open(
      waLink('Hola! Quiero enviar mi receta médica para presupuesto.'),
      '_blank',
      'referrer'
    );
  };

  return (
    <div className="bg-white rounded-[3rem] p-10 border border-[#152C60]/5 shadow-2xl relative overflow-hidden">
      <div className="flex flex-col md:flex-row gap-12 items-center">
        <div className="flex-1 space-y-6">
          <h2 className="text-4xl font-serif font-black uppercase tracking-tighter leading-tight">
            ENVIE SUA <span className="text-[#2B5DB6]">RECEITA</span>
          </h2>
          <p className="text-[#152C60]/60 leading-relaxed">
            Tire uma foto ou selecione o PDF da sua prescrição. Vamos abrir o WhatsApp com sua mensagem
            pronta — é só anexar o arquivo lá e nossa equipe técnica analisa e te manda o orçamento.
          </p>
          <ul className="space-y-4">
            {['Atendimento direto pelo WhatsApp', 'Orçamento sem compromisso', 'Sigilo total dos seus dados'].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-sm font-bold text-[#152C60]/80 uppercase tracking-wide">
                <CheckCircle2 size={18} className="text-[#5C88DA]" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="w-full md:w-80 shrink-0">
          <div className={`relative border-2 border-dashed rounded-[2.5rem] p-8 transition-all flex flex-col items-center justify-center text-center gap-4 ${
            file ? 'border-[#2B5DB6] bg-[#2B5DB6]/5' : 'border-[#152C60]/10 bg-[#F3F6FA]/30'
          }`}>
            <input
              type="file"
              accept="image/*,.pdf"
              onChange={handleFileChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
            {file ? (
              <>
                <div className="w-16 h-16 bg-[#2B5DB6] text-white rounded-2xl flex items-center justify-center shadow-lg">
                  <CheckCircle2 size={32} />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-black truncate max-w-[200px]">{file.name}</p>
                  <button onClick={() => setFile(null)} className="text-[10px] font-bold uppercase text-[#2B5DB6] hover:underline">Remover</button>
                </div>
              </>
            ) : (
              <>
                <div className="w-16 h-16 bg-[#152C60] text-white rounded-2xl flex items-center justify-center">
                  <Upload size={32} />
                </div>
                <div>
                  <p className="text-sm font-black uppercase">Clique ou Arraste</p>
                  <p className="text-[10px] uppercase text-[#152C60]/40 font-bold">JPG, PNG ou PDF (Max 10MB)</p>
                </div>
              </>
            )}
          </div>

          <button
            disabled={!file}
            onClick={handleSend}
            className="w-full mt-6 py-4 bg-[#152C60] text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-black transition-all disabled:opacity-20 shadow-xl shadow-[#152C60]/20 active:scale-95"
          >
            Enviar via WhatsApp
          </button>
          <p className="mt-3 text-center text-[10px] text-[#152C60]/40 font-bold uppercase tracking-widest">
            {CONTACT.whatsappDisplay}
          </p>
        </div>
      </div>
    </div>
  );
}
