import { useState } from 'react';
import { Upload, CheckCircle2 } from 'lucide-react';
import { waLink, CONTACT } from '../constants';
import { getSupabaseClient } from '../lib/supabase';
import { useLanguage } from '../context/LanguageContext';

export default function PrescriptionUpload() {
  const { language } = useLanguage();
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<'idle' | 'uploading' | 'error'>('idle');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSend = async () => {
    if (!file || status === 'uploading') return;
    setStatus('uploading');
    try {
      const supabase = getSupabaseClient();
      const id = crypto.randomUUID();
      const storagePath = `${id}/${file.name.replace(/[^a-zA-Z0-9._-]/g, '_')}`;
      const { error: uploadError } = await supabase.storage.from('prescriptions').upload(storagePath, file, {
        contentType: file.type,
        cacheControl: '3600',
        upsert: false,
      });
      if (uploadError) throw uploadError;

      const { error: recordError } = await supabase.from('prescription_submissions').insert({
        storage_path: storagePath,
        original_filename: file.name,
        mime_type: file.type,
        file_size: file.size,
        status: 'received',
      });
      if (recordError) throw recordError;

      const message = language === 'pt'
        ? `Olá! Enviei minha receita para orçamento. Arquivo: ${file.name}`
        : `Hola! Envié mi receta para cotización. Archivo: ${file.name}`;
      window.open(waLink(message), '_blank', 'noopener,noreferrer');
      setStatus('idle');
    } catch (error) {
      console.error('Prescription upload failed', error);
      setStatus('error');
    }
  };

  return (
    <div className="bg-white rounded-[3rem] p-10 border border-[#152C60]/5 shadow-2xl relative overflow-hidden">
      <div className="flex flex-col md:flex-row gap-12 items-center">
        <div className="flex-1 space-y-6">
          <h2 className="text-4xl font-serif font-black uppercase tracking-tighter leading-tight">
            {language === 'pt' ? <>ENVIE SUA <span className="text-[#2B5DB6]">RECEITA</span></> : <>ENVÍE SU <span className="text-[#2B5DB6]">RECETA</span></>}
          </h2>
          <p className="text-[#152C60]/60 leading-relaxed">
            {language === 'pt'
              ? 'Tire uma foto ou selecione o PDF da sua prescrição. Salvamos o arquivo com segurança e abrimos o WhatsApp para continuar o atendimento.'
              : 'Tome una foto o seleccione el PDF de su receta. Guardamos el archivo de forma segura y abrimos WhatsApp para continuar la atención.'}
          </p>
          <ul className="space-y-4">
            {(language === 'pt'
              ? ['Atendimento direto pelo WhatsApp', 'Orçamento sem compromisso', 'Arquivo privado e sigiloso']
              : ['Atención directa por WhatsApp', 'Cotización sin compromiso', 'Archivo privado y confidencial']).map((item, i) => (
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
              aria-label={language === 'pt' ? 'Escolher arquivo' : 'Seleccionar archivo'}
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
                  <button onClick={() => setFile(null)} className="text-[10px] font-bold uppercase text-[#2B5DB6] hover:underline">{language === 'pt' ? 'Remover' : 'Quitar'}</button>
                </div>
              </>
            ) : (
              <>
                <div className="w-16 h-16 bg-[#152C60] text-white rounded-2xl flex items-center justify-center">
                  <Upload size={32} />
                </div>
                <div>
                  <p className="text-sm font-black uppercase">{language === 'pt' ? 'Clique ou arraste' : 'Haga clic o arrastre'}</p>
                  <p className="text-[10px] uppercase text-[#152C60]/40 font-bold">{language === 'pt' ? 'JPG, PNG ou PDF (máx. 10 MB)' : 'JPG, PNG o PDF (máx. 10 MB)'}</p>
                </div>
              </>
            )}
          </div>

          <button
            disabled={!file || status === 'uploading'}
            onClick={handleSend}
            className="w-full mt-6 py-4 bg-[#152C60] text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-black transition-all disabled:opacity-20 shadow-xl shadow-[#152C60]/20 active:scale-95"
          >
            {status === 'uploading' ? (language === 'pt' ? 'Salvando receita...' : 'Guardando receta...') : language === 'pt' ? 'Salvar e abrir WhatsApp' : 'Guardar y abrir WhatsApp'}
          </button>
          <p className="mt-3 text-center text-[10px] text-[#152C60]/40 font-bold uppercase tracking-widest">
            {status === 'error'
              ? (language === 'pt' ? 'Não foi possível salvar. Tente novamente.' : 'No se pudo guardar. Inténtelo de nuevo.')
              : CONTACT.whatsappDisplay}
          </p>
        </div>
      </div>
    </div>
  );
}
