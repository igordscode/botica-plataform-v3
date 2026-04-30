# PRD (Product Requirements Document) & Roadmap: Botica Guaraní

Este documento visa organizar o caos, mapear o escopo completo da plataforma e dividir o desenvolvimento em fases (Sprints) acionáveis. Ele funciona como o índice central (*Master Document*) para toda a nossa documentação de engenharia e produto.

📚 **Documentação Auxiliar da Base:**
- [🎨 Design System & UI Patterns](./docs/DESIGN_SYSTEM.md)
- [🔌 Mapeamento de Integrações & APIs (Wearables/Pagamentos/IA)](./docs/INTEGRATIONS_APIS.md)
- [📦 Arquitetura & Banco de Dados (Firestore) Schema](./docs/DATABASE_SCHEMA.md)
- [💼 Regras de Negócio, Árvores de Decisão e Funis](./docs/BUSINESS_RULES.md)
- [🛠️ Manual de Operações (Admin, Cadastro, Aprovações)](./docs/OPERATIONS_MANUAL.md)
- [💻 Diretrizes Técnicas de Código](./docs/TECHNICAL_GUIDELINES.md)

---

## 🏗️ Estrutura no ClickUp (Sugestão)
- **Space:** Botica Guaraní OS (Sistema Operacional)
- **Folders (Épicos):**
  1. 🛍️ E-commerce & Core
  2. 👤 Portal do Paciente
  3. 🩺 Portal do Prescritor
  4. 🧠 GuaranIA & Comunidade
  5. ⚙️ Admin & Operações
- **Lists (Sprints):** Sprint 1, Sprint 2, etc.

---

## 🎯 Sprint 1: Fundação & E-commerce Core (O Básico que Vende)
**Objetivo:** Permitir que o usuário acesse, veja produtos, adicione ao carrinho e compre SEM fricção.

- [x] UI/UX Base da Loja (Home, Produtos, Categorias).
- [x] Carrinho de Compras (Gaveta/Sidebar).
- [ ] Integrar Auth Real (Firebase Auth) -> Login/Cadastro.
- [ ] Checkout Transparente (Integração Stripe/MercadoPago/Pagar.me).
- [ ] Modelagem de Dados Base no Firestore (Users, Products, Orders).
- [ ] **Definição de Roles (RBAC):** Separar `admin`, `patient` e `doctor` durante o registro.

## 🧬 Sprint 2: Portal do Paciente & Gamificação
**Objetivo:** Reter o usuário e coletar dados de saúde para personalização.

- [x] UI do Dashboard do Paciente.
- [ ] Formulário de Anamnese Básica (Onboarding pós-compra/registro).
- [ ] Upload de Exames (Armazenamento no Firebase Storage com OCR/Parseamento).
- [ ] Conexão HealthKit / Google Fit (Integração de APIs de saúde/Mock via permissão).
- [x] Gamificação (UI XP, Níveis, Ranking).
- [ ] Motor de Gamificação (Firestore Triggers para adicionar XP na conclusão de rotinas e compras).
- [ ] Lembretes de Rotina (Notificações Web/Push).

## 🩺 Sprint 3: Portal do Prescritor (A Ferramenta Médica)
**Objetivo:** Dar aos médicos uma ferramenta "Pro" para gerir pacientes, prescrições e seu marketing (perfil/pesquisas).

- [x] UI do Dashboard do Prescritor.
- [ ] **Onboarding Médico:** Fluxo de validação de CRM, especialidade e bio.
- [ ] **Gestão de Perfil:** Onde o médico edita foto, biografia, e links de artigos. *(Isso vai alimentar a página "Nosso Corpo Científico")*.
- [ ] Criador de Prescrições (RXBuilder): Ferramenta para montar fórmulas magistrais, gerar PDF e enviar via link ao paciente.
- [ ] **Agenda/Gestão de Calendário:** UI de calendário com slots de horários (Integração Google Calendar API ou schema no Firestore).
- [ ] Lista de Pacientes (CRM): Ver histórico, exames e chat direto com o paciente.

## 🧠 Sprint 4: GuaranIA, Comunidade & "Gems"
**Objetivo:** Engajamento profundo e IA como assistente pessoal de longevidade.

- [x] UI do Assistente Base (GuaranIA).
- [x] UI de Criação de Agentes/Gems.
- [ ] **Backend do Gem:** Salvar o *System Prompt* e documentos do usuário no Firestore, engatando no LangChain / Gemini API usando RAG (Retrieval-Augmented Generation).
- [ ] **Comunidade (Fórum/Feed):** Sistema real de posts, likes (upvotes) e comentários interligados ao Firebase.
- [ ] **Mensageria (Chat 1x1):** Chat em tempo real (WebSockets ou OnSnapshot Firestore) entre Paciente <-> Prescritor.

## ⚙️ Sprint 5: Admin, CMS e Operações (Painel de Controle)
**Objetivo:** Dar controle total aos donos (ids) sobre a operação.

- [x] UI Admin Básica.
- [ ] **Aprovação de Médicos:** Lista de cadastros pendentes de validação de CRM (Aprovar/Rejeitar).
- [ ] Geração de Conteúdo (CMS): Onde se publica artigos, vídeos do portal de conhecimento e novas formulações de prateleira.
- [ ] Board de Roadmap Real: Conectar a página "Mural de Evolução" à base real do ClickUp ou Firestore, validando logs de votos únicos.
- [ ] Relatórios e BI (Vendas, Uso de IA, KPIs).

---

## 🛠️ Dívida Técnica Imadiata (Tech Debt & Refactor)
- [ ] Criar a estrutura correta de Guards nas Rotas (ex: `<ProtectedRoute role="doctor">`).
- [ ] Otimizar chamadas ao Firebase para não estourar a cota gratuita.
- [ ] Tratar envio de e-mails transacionais (Firebase Extensions + SendGrid).
