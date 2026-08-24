# Web, UI e HTML/CSS

## Fonte digital

A Plataforma V3 em `C:\Users\TestP\Projetos\botica-platform` é a referência de produto e experiência atual. Inspecione o código e a tela real antes de alterar:

- `src/index.css` para tokens e fontes;
- `src/components/` para componentes globais;
- `src/pages/` para padrões de página;
- `public/` para logos e imagens de produção;
- branch visual corrente para decisões ainda não mescladas.

Não copie automaticamente uma regra de social para UI. O social pode tolerar composição editorial e marca d'água; a interface precisa priorizar leitura, navegação, estados e performance.

## Arquitetura visual

Use [../assets/botica-brand-tokens.css](../assets/botica-brand-tokens.css) como baseline para um novo artifact. Em código existente, mapear tokens para o sistema do projeto e evitar uma segunda camada concorrente.

Padrões recomendados:

- superfícies profundas para hero, navegação e momentos institucionais;
- creme/branco para leitura longa, formulários, catálogo e fluxos transacionais;
- Playfair Display para um título editorial focal;
- Inter para corpo e UI; Montserrat para labels/ações quando já fizer parte do sistema;
- logo SVG oficial e símbolo em baixa opacidade como elemento ambiental;
- grid responsivo com largura máxima coerente, gutters móveis e ritmo de seção;
- bordas e sombras discretas azuladas, sem glassmorphism generalizado;
- radius contido; evitar cards excessivamente arredondados e “dashboard genérico”.

## Componentes

Definir e reutilizar pelo menos:

- cabeçalho/navegação;
- botão primário, secundário, ghost e estado desabilitado;
- link textual e foco;
- campo, seleção, ajuda, erro e sucesso;
- card de produto, conteúdo e prescritor;
- badge/status sem transformar cor semântica em branding;
- aviso clínico/privacidade;
- upload de receita com orientação e consentimento;
- footer, contato e CTA de WhatsApp;
- loader, empty state e erro humano.

Todos precisam de hover, focus, active, loading, disabled e error quando aplicável.

## Implementação HTML/CSS

- usar HTML semântico, landmarks, heading order e labels reais;
- manter o texto como texto; não rasterizar títulos ou botões;
- usar CSS responsivo, variáveis e componentes; evitar posicionamento absoluto para conteúdo estrutural;
- reservar pseudo-elementos para textura/linhas e `pointer-events: none`;
- carregar SVGs como arquivos reais quando o logo precisar ser atualizado ou auditado;
- otimizar imagens, declarar dimensões, usar `srcset`/formatos modernos quando útil e evitar layout shift;
- respeitar `prefers-reduced-motion` e foco visível;
- garantir teclado, contraste WCAG AA e alvos de toque confortáveis;
- não expor dados de paciente em mocks, analytics, screenshots ou estados de exemplo.

Um fundo inspirado no social deve usar uma textura leve ou camada vetorial controlada, com contraste testado. Não repetir um PNG de 1080×1920 como wallpaper de toda página.

## Responsividade

Defina comportamento, não apenas breakpoints:

- ordem de conteúdo no mobile;
- escala tipográfica fluida com limites;
- recorte de hero e posição do símbolo;
- navegação e CTA persistente sem cobrir conteúdo;
- cards de produto e tabelas em telas estreitas;
- expansão de ES para PT-BR;
- estados vazios, erro e loading em cada largura.

## Fluxos sensíveis

Upload de receita, portal do paciente, chat e checkout devem explicar propósito, consentimento, privacidade e próximo passo. Não usar gamificação, urgência, dark pattern ou promessa de resposta clínica para forçar envio de dados.

## Entrega e verificação

Para design-to-code, entregar:

- decisão visual e tokens usados;
- código no padrão do repositório;
- estados e comportamento responsivo;
- assets otimizados e provenance;
- screenshots das larguras críticas quando possível;
- verificação de build/testes, teclado, contraste e reduced motion;
- lista de diferenças intencionais em relação à referência.

Se for somente conceito, fornecer wireframe, especificação, componentes, copy e handoff suficiente para implementação. Não chamar um mock estático de “UI concluída” sem estados e responsividade.
