# Home Lean: revisão de claims

Data: 2026-10-13 (America/Asuncion)
Branch exclusiva: `lean-launch-fulldark`
Base: `29e10216640cb42b5c1149da208be5c5cd184114`
Escopo: copy de `src/pages/Home.tsx`, ES/PT, e este registro. Nenhuma alteração de estilo, estrutura, imagem, rota, catálogo, backend ou configuração de deploy.

## Alterações realizadas

| Local | Removido/substituído | Resultado |
| --- | --- | --- |
| Card flutuante | “Fórmulas Certificadas” | “Atendimento Botica” / “Atención Botica” |
| Hero catálogo | Certificação farmacêutica internacional, exclusividade, coleção completa personalizada para biologia única; controle farmacêutico no ES | Fórmulas magistrais, opções de cápsulas/sachês/cosméticos e consulta à equipe |
| Hero preparação | Biotecnologia, alta precisão, laboratório próprio, pureza/importação/ambiente esterilizado, laudos analíticos e rastreabilidade por lote | Preparação segundo indicação profissional e conversa sobre a receita |
| Hero atendimento | Mais de 25 anos, 15.000 fórmulas entregues, referência máxima, tradição indígena como autoridade, atendimento VIP | Atendimento próximo, consulta sobre receita/pedido e dúvidas |
| Hero logística | Entrega em todo o país, envio garantido/seguro, rastreamento expresso, embalagem térmica, proteção contra luz/temperatura e cobertura Brasil | Consulta de disponibilidade, destino e prazo; combinação de retirada/envio |
| Banner receita | Serviço expresso / servicio exprés | Envio de receita / envío de receta |
| Especialidades PT | Todas as áreas da saúde | Distintas áreas da saúde, equivalente ao ES |
| Quatro passos PT/ES | Cotação em minutos, laboratório certificado/próprio, envio expresso | Cotação e prazo sem SLA, preparação conforme receita, retirada/envio |
| Selo do prescritor | Padrão ouro / estándar de calidad, precisão em cada preparação | Apoio ao prescritor e conversa sobre a receita |
| Área técnica PT | Ajuste de ativos | Dúvidas sobre a preparação, equivalente ao ES |
| Área técnica ES/PT | Segurança de dados, confidencialidade/sigilo universal das prescrições | Envio da receita para continuar atendimento |
| Filosofia ES/PT | Pureza Guaraní, extração do conhecimento ancestral, última geração/dosagem exata garantida, mapeamento biológico individual e equivalentes | Cuidado/respeito, preparação conforme indicação profissional e conversa individual |
| Card experiência | 25+ / anos de experiência | Botica / atendimento próximo, localizado ES/PT |
| CTA final ES/PT | Transforme sua saúde hoje | Converse com a Botica hoje |

O diff literal abaixo registra cada substituição, incluindo variantes ES/PT. Mantidos: 4 slides, imagens e ícones atuais, animações, classes CSS, links, seleção `featured3 = [1, 6, 10]`, preço e dados dos produtos, ES como idioma inicial e PT persistente.

## Evidências e claims restantes

As fontes examinadas foram o código na base acima, `docs/PRODUCT_01_REVIEW.md`, `docs/LEAN_LAUNCH5_MATRIX.md`, imagens originais dos 3 destaques e a governança local da identidade visual. O catálogo é provisório segundo a governança; presença no código não comprova fatos nem aprovação farmacêutica.

| Claim/dado ainda presente | Evidência disponível | Confirmação necessária |
| --- | --- | --- |
| Nomes “Quemador de grasa”, “Funciones cognitivas”, “Renovación celular nocturna”; categorias e navegação por foco/sono/energia/pele | `src/data/products.ts`, `catalogTiers.ts`; matriz de lançamento | Farmacêutico/regulatório: adequação de nomes e associação entre fórmula e objetivo. Nome comercial também pode comunicar benefício |
| Imagem ID 1: “Termogénico Natural”, “Acelera Metabolismo”, “Quema Grasa” | `public/products/quemador-de-grasa.png`, inspecionada em tamanho original | Farmacêutico/regulatório: benefícios e apresentação pública; “natural” não prova segurança |
| Imagem ID 6: “Mejora la Concentración”, “Memoria y Claridad Mental”, “Reduce Estrés Mental” | `public/products/funciones-cognitivas.png`, inspecionada em tamanho original | Farmacêutico/regulatório: benefícios e limites de comunicação |
| Imagem ID 10: “Exfoliación Química Suave”, “Manchas y Melasma”, “Renovación Celular” | `public/products/renovacion-celular-nocturna.png`, inspecionada em tamanho original | Farmacêutico/regulatório: benefícios cosméticos e indicação para melasma |
| Composição, concentrações, apresentação, validade/conservação, público por idade/sexo e preço por unidade dentro das 3 imagens | Assets citados; sem fonte primária de aprovação neste corte | Farmacêutico + operações: ficha aprovada, catálogo e licença/aprovação dos assets |
| Preços Home: 165.000 / 145.000 / 155.000 Gs; conversão PT em reais | Dados atuais e `LanguageContext.tsx` (conversão estimada de 1 BRL = 1350 Gs) | Operações: tabela vigente e adequação da conversão estimada para exposição comercial |
| Preparação magistral personalizada e formas disponíveis por especialidade | Copy operacional existente e contexto da Botica; sem comprovação específica por forma | Farmacêutico + operações: capacidade real, formas disponíveis e processo conforme receita |
| Suporte técnico, consultoria/canal direto com farmacêuticos, guia de ativos; PT: biblioteca de insumos e sinergias | Copy preexistente, sem registro específico de serviço/biblioteca validada | Farmacêutico + operações: disponibilidade, limites do suporte e conteúdo técnico aprovado |
| Cotação por WhatsApp, aviso de pedido pronto, retirada/envio | Fluxo descrito no contexto operacional; disponibilidade individual agora encaminhada para consulta | Operações: confirmar fluxo atual, canais e condições |
| Rodapé compartilhado: “Elevamos el estándar…” / “Elevando o padrão…”, precisão técnica, informação do laboratório, endereço e contatos | `Footer.tsx` / `constants.ts`, preservados por serem componentes compartilhados | Proprietário + farmacêutico para posicionamento/qualidade; operações para dados de contato |

As fichas completas em outras páginas ainda contêm claims clínicos/certificações. Não foram alteradas neste corte restrito à Home. Não houve consulta a fonte clínica externa: nenhuma nova alegação clínica foi criada nem validada por inferência.

## Validações e revisão do diff

- `npm ci`: concluído, lockfile inalterado; auditoria reporta 34 vulnerabilidades preexistentes (2 baixas, 4 moderadas, 26 altas, 2 críticas). Atualizações de dependências fora do escopo.
- `npm run build`: passou; aviso de bundle maior que 500 kB (JS ~638 kB).
- `npm run lint` (`tsc --noEmit`): falhou em `src/pages/Store.tsx:543:18`, TS2304, `Cannot find name 'language'`. A mesma checagem executada com a Home original de `29e1021` reproduziu o mesmo erro; nenhuma correção fora da Home foi incluída.
- `git diff --check`: passou.
- Comparação de fonte: classes CSS e atributos de imagens/links idênticos à base; lógica e curadoria inalteradas.
- Navegador local: ES/PT em 1440x900 e 390x900; carrossel, texto renderizado e 3 links `/produto/1`, `/produto/6`, `/produto/10` verificados. Nenhum `pageerror` e nenhuma rolagem horizontal. Slide 4 ES/desktop reconfirmado separadamente após uma transição automática interferir na primeira leitura.
- Busca no texto da Home: não permanecem certificações, garantias, pureza, 25+, 15.000, biotecnologia, laudos ou SLA expresso removidos. Esta busca não cobre texto embutido em PNG; os claims desses assets estão inventariados acima.
- Revisão visual das capturas desktop/mobile e dos assets originais: direção escura, logos, componentes e seleção mantidos. O registro não é uma auditoria geral de acessibilidade/estética nem validação de compra, envio real de receita ou backend.
- Pendências existentes observadas: título do hero descarta a última palavra de `slide.title`; CTA final ainda possui rótulos PT no ES. Preservadas por não integrarem este corte de claims.

## Parecer limitado à versão

Revisão em passe posterior à edição: `APROVADO_COM_CORRECOES` para a redução textual de claims; publicação da Home completa: `BLOCKED`, pois as imagens e nomes comerciais ainda veiculam benefícios sem aprovação registrada. Não há autorização farmacêutica/regulatória inferida. Responsáveis necessários: proprietário da Botica, farmacêutico responsável, operações e revisão linguística ES-PY/PT-BR. Pessoas não foram identificadas nas fontes examinadas.

Não houve merge nem alteração de `main`, domínio ou `botica-coming-soon`. A branch `botica-coming-soon` não apareceu como ref neste repositório; nenhum recurso com esse nome foi modificado. Este corte não declara a Lean Public Surface inteira pronta para publicação.

## Diff literal da Home

```diff
diff --git a/src/pages/Home.tsx b/src/pages/Home.tsx
index 163bd1a..17eb44d 100644
--- a/src/pages/Home.tsx
+++ b/src/pages/Home.tsx
@@ -23,54 +23,54 @@ export default function Home() {
       tag: 'Kit Completo & Linha Magistral',
       badgeIcon: Award,
       title: 'A CIÊNCIA DO SEU BEM-ESTAR',
-      highlight: 'Fórmulas Exclusivas',
-      quote: '"Coleção completa de cápsulas, sachês e cosméticos magistrais personalizados para sua biologia única."',
+      highlight: 'Fórmulas Magistrais',
+      quote: '"Conheça as opções de cápsulas, sachês e cosméticos do catálogo."',
       image: '/images/portada-hero.png',
       floatBadge: 'Kit Botica Guaraní',
-      floatDesc: 'Linha completa com certificação farmacêutica internacional.',
+      floatDesc: 'Consulte as opções com a equipe da Botica.',
       floatIcon: 'G'
     },
     {
       id: 'lab',
-      tag: 'Biotecnologia & Alta Precisão',
+      tag: 'Preparação Magistral',
       badgeIcon: FlaskConical,
-      title: 'PRECISÃO E BIOTECNOLOGIA',
-      highlight: 'Laboratório Próprio',
-      quote: '"Controle rigoroso de dosagem e pureza de matérias-primas importadas em ambiente esterilizado."',
+      title: 'PREPARAÇÃO DE FÓRMULAS MAGISTRAIS',
+      highlight: 'Sua Receita',
+      quote: '"Preparação de fórmulas conforme a indicação do profissional de saúde."',
       image: '/mortero-branco.svg',
-      floatBadge: 'CQ Farmacêutico',
-      floatDesc: 'Controle de qualidade e laudos analíticos por lote.',
+      floatBadge: 'Preparação magistral',
+      floatDesc: 'Converse com a equipe sobre sua receita.',
       floatIcon: '🔬'
     },
     {
       id: 'fachada',
-      tag: 'Tradição & Atendimento VIP',
+      tag: 'Atendimento Próximo',
       badgeIcon: Building2,
-      title: 'MAIS DE 25 ANOS DE HISTÓRIA',
+      title: 'CONHEÇA NOSSO ATENDIMENTO',
       highlight: 'Sede & Atendimento',
-      quote: '"Referência máxima em manipulação de fórmulas no Paraguai, unindo tradição indígena e ciência moderna."',
+      quote: '"Converse com a Botica sobre sua receita e seu pedido."',
       image: '/mortero-branco.svg',
       floatBadge: 'Botica Guaraní',
-      floatDesc: 'Mais de 15.000 fórmulas entregues com precisão.',
+      floatDesc: 'Entre em contato para tirar suas dúvidas.',
       floatIcon: '🏛️'
     },
     {
       id: 'entrega',
-      tag: 'Logística Especializada',
+      tag: 'Retirada e Envio',
       badgeIcon: Truck,
-      title: 'ENTREGA EM TODO PAÍS',
-      highlight: 'Envio Garantido',
-      quote: '"Embalagem térmica de segurança e rastreamento expresso para todo o Paraguai e envio para o Brasil."',
+      title: 'CONSULTE AS OPÇÕES DE ENTREGA',
+      highlight: 'Retirada e Envio',
+      quote: '"Consulte disponibilidade, destino e prazo de envio com a equipe."',
       image: '/mortero-branco.svg',
       floatBadge: 'Logística Botica',
-      floatDesc: 'Proteção contra temperatura e luz para a sua fórmula.',
+      floatDesc: 'Combine a retirada ou o envio do seu pedido.',
       floatIcon: '📦'
     }
   ] : [
-    { id: 'kit', tag: 'Kit completo y línea magistral', badgeIcon: Award, title: 'LA CIENCIA DE SU BIENESTAR', highlight: 'Fórmulas exclusivas', quote: '"Colección de cápsulas, sobres y cosméticos magistrales pensados para su rutina."', image: '/images/portada-hero.png', floatBadge: 'Kit Botica Guaraní', floatDesc: 'Línea magistral con control farmacéutico.', floatIcon: 'G' },
-    { id: 'lab', tag: 'Biotecnología y alta precisión', badgeIcon: FlaskConical, title: 'PRECISIÓN Y BIOTECNOLOGÍA', highlight: 'Laboratorio propio', quote: '"Control riguroso de dosificación y calidad en cada preparación."', image: '/mortero-branco.svg', floatBadge: 'Control farmacéutico', floatDesc: 'Revisión de calidad y trazabilidad por lote.', floatIcon: '🔬' },
-    { id: 'fachada', tag: 'Tradición y atención cercana', badgeIcon: Building2, title: 'MÁS DE 25 AÑOS DE HISTORIA', highlight: 'Atención personalizada', quote: '"Tradición magistral y ciencia moderna al servicio de cada persona."', image: '/mortero-branco.svg', floatBadge: 'Botica Guaraní', floatDesc: 'Experiencia y acompañamiento en cada pedido.', floatIcon: '🏛️' },
-    { id: 'entrega', tag: 'Logística especializada', badgeIcon: Truck, title: 'ENTREGA EN TODO EL PAÍS', highlight: 'Envío seguro', quote: '"Protección y seguimiento para que su fórmula llegue correctamente."', image: '/mortero-branco.svg', floatBadge: 'Logística Botica', floatDesc: 'Preparación y envío con cuidado.', floatIcon: '📦' },
+    { id: 'kit', tag: 'Kit completo y línea magistral', badgeIcon: Award, title: 'LA CIENCIA DE SU BIENESTAR', highlight: 'Fórmulas magistrales', quote: '"Conozca las opciones de cápsulas, sobres y cosméticos del catálogo."', image: '/images/portada-hero.png', floatBadge: 'Kit Botica Guaraní', floatDesc: 'Consulte las opciones con el equipo de Botica.', floatIcon: 'G' },
+    { id: 'lab', tag: 'Preparación magistral', badgeIcon: FlaskConical, title: 'PREPARACIÓN DE FÓRMULAS MAGISTRALES', highlight: 'Su receta', quote: '"Preparación de fórmulas según la indicación del profesional de salud."', image: '/mortero-branco.svg', floatBadge: 'Preparación magistral', floatDesc: 'Converse con el equipo sobre su receta.', floatIcon: '🔬' },
+    { id: 'fachada', tag: 'Atención cercana', badgeIcon: Building2, title: 'CONOZCA NUESTRA ATENCIÓN', highlight: 'Atención personalizada', quote: '"Converse con Botica sobre su receta y su pedido."', image: '/mortero-branco.svg', floatBadge: 'Botica Guaraní', floatDesc: 'Comuníquese para resolver sus dudas.', floatIcon: '🏛️' },
+    { id: 'entrega', tag: 'Retiro y envío', badgeIcon: Truck, title: 'CONSULTE LAS OPCIONES DE ENTREGA', highlight: 'Retiro y envío', quote: '"Consulte disponibilidad, destino y plazo de envío con el equipo."', image: '/mortero-branco.svg', floatBadge: 'Logística Botica', floatDesc: 'Coordine el retiro o el envío de su pedido.', floatIcon: '📦' },
   ];
 
   useEffect(() => {
@@ -217,7 +217,7 @@ export default function Home() {
                   </div>
                   <div>
                     <h4 className="font-black uppercase text-[11px] tracking-widest text-white">{slide.floatBadge}</h4>
-                    <p className="text-[10px] font-bold text-[#ABBAD7] italic">Fórmulas Certificadas</p>
+                    <p className="text-[10px] font-bold text-[#ABBAD7] italic">{language === 'pt' ? 'Atendimento Botica' : 'Atención Botica'}</p>
                   </div>
                 </div>
                 <p className="text-[11px] font-medium text-slate-300 max-w-[170px] leading-snug">
@@ -238,7 +238,7 @@ export default function Home() {
             <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
               <div className="space-y-6 max-w-2xl text-center md:text-left">
                 <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 text-white rounded-full text-[10px] font-black uppercase tracking-widest border border-white/10">
-                  <FileText size={14} className="text-[#38BDF8]" /> {language === 'pt' ? 'Serviço expresso' : 'Servicio exprés'}
+                  <FileText size={14} className="text-[#38BDF8]" /> {language === 'pt' ? 'Envio de receita' : 'Envío de receta'}
                 </span>
                 <h2 className="text-4xl md:text-6xl font-serif font-black leading-tight uppercase text-white">
                   {language === 'pt' ? <>Já possui uma <span className="text-[#38BDF8]">receita médica?</span></> : <>¿Ya tiene una <span className="text-[#38BDF8]">receta médica?</span></>}
@@ -265,7 +265,7 @@ export default function Home() {
             <div className="w-14 h-1 bg-[#2B5DB6] rounded-full mb-4" />
             <span className="text-[11px] font-black uppercase tracking-[0.2em] text-[#38BDF8] font-display">Especialidades</span>
             <h2 className="font-serif font-black text-white uppercase tracking-tight mt-3 mb-4 text-4xl leading-none">
-              {language === 'pt' ? 'Atendemos todas as áreas da saúde' : 'Atendemos distintas áreas de la salud'}
+              {language === 'pt' ? 'Atendemos distintas áreas da saúde' : 'Atendemos distintas áreas de la salud'}
             </h2>
             <p className="text-sm text-slate-300 leading-relaxed">
               {language === 'pt' ? 'Preparamos fórmulas magistrais personalizadas conforme a indicação do seu profissional de saúde.' : 'Preparamos fórmulas magistrales personalizadas según la indicación de su profesional de salud.'}
@@ -313,13 +313,13 @@ export default function Home() {
           <ol className="grid grid-cols-1 md:grid-cols-4 gap-8 list-none p-0">
             {(language === 'pt' ? [
               { n: "01", h: "Sua Receita",   p: "Envie sua receita médica diretamente pelo nosso WhatsApp." },
-              { n: "02", h: "Orçamento",    p: "Enviamos a cotação detalhada e prazo de preparação em minutos." },
-              { n: "03", h: "Manipulação",  p: "Formulamos seu pedido em nosso laboratório certificado." },
-              { n: "04", h: "Entrega",      p: "Avisamos quando estiver pronto para retirada ou envio expresso." },
+              { n: "02", h: "Orçamento",    p: "Enviamos a cotação detalhada e o prazo de preparação." },
+              { n: "03", h: "Manipulação",  p: "Preparamos seu pedido conforme a receita." },
+              { n: "04", h: "Entrega",      p: "Avisamos quando estiver pronto para retirada ou envio." },
             ] : [
               { n: '01', h: 'Su receta', p: 'Envíe su receta médica directamente por WhatsApp.' },
               { n: '02', h: 'Cotización', p: 'Enviamos el detalle y el plazo de preparación.' },
-              { n: '03', h: 'Preparación', p: 'Preparamos su pedido en nuestro laboratorio.' },
+              { n: '03', h: 'Preparación', p: 'Preparamos su pedido según la receta.' },
               { n: '04', h: 'Entrega', p: 'Avisamos cuando esté listo para retirar o enviar.' },
             ]).map(({ n, h, p }) => (
               <li key={n} className="bg-[#0B192C]/60 border border-white/10 rounded-2xl p-6 border-t-4 border-t-[#2B5DB6]">
@@ -455,10 +455,10 @@ export default function Home() {
               >
                 <div className="flex items-center gap-3">
                   <Microscope className="text-[#38BDF8]" size={24} />
-                  <span className="text-[10px] font-black uppercase tracking-[0.2em]">{language === 'pt' ? 'Padrão ouro' : 'Estándar de calidad'}</span>
+                  <span className="text-[10px] font-black uppercase tracking-[0.2em]">{language === 'pt' ? 'Apoio ao prescritor' : 'Apoyo al prescriptor'}</span>
                 </div>
                 <p className="text-xs font-serif font-black italic max-w-[150px] text-slate-200">
-                  {language === 'pt' ? 'Precisão em cada preparação magistral.' : 'Precisión en cada preparación magistral.'}
+                  {language === 'pt' ? 'Converse sobre a preparação de sua receita.' : 'Converse sobre la preparación de su receta.'}
                 </p>
               </motion.div>
             </div>
@@ -477,13 +477,13 @@ export default function Home() {
 
               <div className="grid gap-4">
                 {(language === 'pt' ? [
-                  { title: "Consultoria Farmacêutica", icon: <Stethoscope size={20} />, desc: "Canal direto com nossos farmacêuticos para ajuste de ativos." },
+                  { title: "Consultoria Farmacêutica", icon: <Stethoscope size={20} />, desc: "Canal direto com nossos farmacêuticos para dúvidas sobre a preparação." },
                   { title: "Guia de Ativos", icon: <Award size={20} />, desc: "Acesso à nossa biblioteca técnica de insumos e sinergias." },
-                  { title: "Segurança de Dados", icon: <ShieldCheck size={20} />, desc: "Gestão sigilosa e ética de todas as prescrições enviadas." },
+                  { title: "Envio de Receita", icon: <ShieldCheck size={20} />, desc: "Envie sua receita para continuar o atendimento com a equipe." },
                 ] : [
                   { title: 'Consultoría farmacéutica', icon: <Stethoscope size={20} />, desc: 'Canal directo con nuestros farmacéuticos para dudas sobre la preparación.' },
                   { title: 'Guía de activos', icon: <Award size={20} />, desc: 'Información técnica para apoyar la conversación con su profesional de salud.' },
-                  { title: 'Seguridad de datos', icon: <ShieldCheck size={20} />, desc: 'Tratamiento confidencial y responsable de las recetas enviadas.' },
+                  { title: 'Envío de receta', icon: <ShieldCheck size={20} />, desc: 'Envíe su receta para continuar la atención con el equipo.' },
                 ]).map((item, i) => (
                   <div key={i} className="flex gap-6 p-6 bg-[#0B192C]/80 rounded-[2rem] border border-white/10">
                     <div className="w-12 h-12 bg-[#2B5DB6]/20 text-[#38BDF8] rounded-2xl flex items-center justify-center shrink-0 border border-[#2B5DB6]/30">
@@ -519,13 +519,13 @@ export default function Home() {
               
               <div className="grid gap-6">
                 {(language === 'pt' ? [
-                  { title: "Pureza Guaraní", desc: "Aproveitamos o conhecimento ancestral para extrair o melhor da natureza.", icon: <Leaf /> },
-                  { title: "Precisão Moderna", desc: "Laboratórios de última geração garantem a dosagem exata para seu corpo.", icon: <ShieldCheck /> },
-                  { title: "Bio-Identidade", desc: "Cada tratamento é mapeado conforme seu perfil biológico individual.", icon: <Zap /> },
+                  { title: "Cuidado e Respeito", desc: "Valorizamos uma conversa atenta às dúvidas de cada pessoa.", icon: <Leaf /> },
+                  { title: "Preparação Magistral", desc: "Preparamos fórmulas conforme a indicação do profissional de saúde.", icon: <ShieldCheck /> },
+                  { title: "Cuidado Individual", desc: "Converse com a equipe sobre sua receita e sua rotina.", icon: <Zap /> },
                 ] : [
-                  { title: 'Pureza guaraní', desc: 'Valoramos el conocimiento tradicional con responsabilidad y respeto.' , icon: <Leaf /> },
-                  { title: 'Precisión moderna', desc: 'Procesos cuidadosos acompañan la calidad de cada preparación.', icon: <ShieldCheck /> },
-                  { title: 'Cuidado individual', desc: 'Cada persona merece una orientación adecuada a su rutina y necesidad.', icon: <Zap /> },
+                  { title: 'Cuidado y respeto', desc: 'Valoramos una conversación atenta a las dudas de cada persona.', icon: <Leaf /> },
+                  { title: 'Preparación magistral', desc: 'Preparamos fórmulas según la indicación del profesional de salud.', icon: <ShieldCheck /> },
+                  { title: 'Cuidado individual', desc: 'Converse con el equipo sobre su receta y su rutina.', icon: <Zap /> },
                 ]).map((item, i) => (
                   <motion.div 
                     key={i}
@@ -557,8 +557,8 @@ export default function Home() {
                 </div>
               </div>
               <div className="absolute -top-8 -right-8 p-8 bg-[#2B5DB6] text-white rounded-[2.5rem] shadow-2xl text-center space-y-1 transform rotate-6 hidden md:block border border-white/20">
-                <span className="text-4xl font-serif font-black italic tracking-tighter">25+</span>
-                <p className="text-[10px] font-black uppercase tracking-widest whitespace-nowrap">Anos de Experiência</p>
+                <span className="text-4xl font-serif font-black italic tracking-tighter">Botica</span>
+                <p className="text-[10px] font-black uppercase tracking-widest whitespace-nowrap">{language === 'pt' ? 'Atendimento próximo' : 'Atención cercana'}</p>
               </div>
             </div>
           </div>
@@ -572,7 +572,7 @@ export default function Home() {
              <div className="relative z-10 space-y-10">
                 <Heart className="mx-auto text-[#38BDF8] animate-bounce" size={56} />
                 <h2 className="text-5xl md:text-7xl font-serif font-black leading-none uppercase tracking-tighter text-white">
-                  {language === 'pt' ? <>TRANSFORME SUA <br/>SAÚDE <span className="italic text-[#38BDF8]">HOJE.</span></> : <>TRANSFORME SU <br/>SALUD <span className="italic text-[#38BDF8]">HOY.</span></>}
+                  {language === 'pt' ? <>CONVERSE COM <br/>A BOTICA <span className="italic text-[#38BDF8]">HOJE.</span></> : <>CONVERSE CON <br/>BOTICA <span className="italic text-[#38BDF8]">HOY.</span></>}
                 </h2>
                 <div className="flex flex-wrap justify-center gap-6">
                   <a
```
