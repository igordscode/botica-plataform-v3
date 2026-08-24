# Prompts e handoffs para outros agentes

## Contrato universal

Todo prompt deve incluir o suficiente para o agente executar e o suficiente para impedir que ele invente o que precisa ser aprovado.

```text
PAPEL
Você é [especialidade] trabalhando para Botica Guaraní.

OBJETIVO
[resultado e ação esperada]

CONTEXTO
Laboratório de receitas magistrais de Ciudad del Este; precisão farmacêutica,
cuidado humano, ofício magistral e raiz Guaraní respeitosa.

PÚBLICO E CANAL
[público, etapa, canal, contexto de visualização]

ENTREGA
[tipo, quantidade, dimensões, proporções, idioma, duração/páginas]

FONTES
[assets, links, IDs, texto aprovado, dados verificáveis]

PRESERVAR
[2–4 anchors de marca/referência]

EVOLUIR
[fraqueza específica a melhorar]

DIREÇÃO VISUAL
[composição, fotografia, tipo, cor, ritmo, CTA]

CONTEÚDO
[copy exata, placeholders marcados e status dos claims]

RESTRIÇÕES
Não redesenhar o logo; não inventar claims, pessoas, datas, contatos ou selos;
não usar estereótipos indígenas; não rasterizar texto essencial.

SAÍDA
[arquivo, camadas, prompts, specs, exports e relatório de QA]

CRITÉRIOS DE APROVAÇÃO
[marca, legibilidade, objetivo, acessibilidade, produção, revisão clínica]
```

## Agente de imagem

Use geração para fotografia, textura e ambientes de apoio; não para o logo, rótulo ou texto final.

```text
Gere [quantidade] opções de imagem de apoio para [peça], sem texto e sem marcas.
Cena: [ambiente, ação, sujeitos, objetos reais].
Direção: autoridade calma, ciência artesanal, luz [descrição], composição com
espaço negativo em [área] para título/CTA, paleta compatível com azul profundo
e creme da Botica.
Precisão: EPI e equipamentos coerentes; frascos e instrumentos plausíveis;
ingredientes somente se confirmados.
Evitar: cruz médica genérica, laboratório futurista, neon, moléculas luminosas,
comprimidos flutuantes, banco de imagem sorridente, estereótipos indígenas,
logo imitado, texto ilegível, rótulo inventado, médico/paciente como endosso.
Entregar: composição em [proporção/resolução], com variação de enquadramento e
nota do que deve ser composto manualmente depois.
```

## Agente Canva

```text
Use o design Canva [título/ID] como referência editável, páginas [N].
Não altere o master oficial nem faça commit sem aprovação explícita.
Crie uma cópia/draft para [campanha]. Preserve [anchors] e melhore [problemas].
Substitua somente [campos], com copy aprovada abaixo.
Mantenha as áreas seguras, valide ES/PT-BR, contraste e leitura no celular.
Antes de salvar, apresente páginas alteradas, resumo do delta e pendências.
```

## Photoshop

```text
Crie uma composição Photoshop não destrutiva para [peça].
Canvas/perfil: [tamanho, resolução, RGB/CMYK].
Use Smart Objects para [produto/logo], máscaras para recorte, ajustes separados
para cor e textura, e camadas nomeadas por função. Preserve rótulo e proporção.
Direção: [luz, sombra, fundo, profundidade, espaço de texto].
Não use IA generativa sobre logo, texto, rótulo ou rosto consentido.
Entregue PSD em camadas, preview e exports [lista], com fontes/assets relatados.
```

## Illustrator/InDesign

```text
Produza [peça física/manual] em [AI/INDD] a partir do master oficial [asset].
Especificação do fornecedor: [tamanho, sangria, cores, faca, acabamentos, PDF].
Mantenha texto vivo no editável, swatches e estilos nomeados, links empacotados,
faca/acabamentos em layers/spot colors separados. Não invente texto regulatório.
Entregue fonte editável, package, prova e PDF de produção após preflight.
```

## Web/UI code

```text
Implemente [tela/fluxo] no repositório [path/stack].
Leia os componentes e tokens existentes antes de editar. Use os logos SVG oficiais,
HTML semântico, texto real, responsividade, teclado, foco, contraste WCAG AA e
prefers-reduced-motion. Preserve [anchors da Plataforma V3] e melhore [problema].
Não replique o PNG social como página web. Defina estados loading/empty/error/
disabled e comportamento ES/PT-BR. Entregue código, screenshots, testes/build e
diferenças intencionais em relação à referência.
```

## Motion/vídeo

```text
Crie [roteiro/storyboard/animação/edição] para [canal, proporção, duração].
Mensagem: [uma frase]. CTA: [ação]. Copy/claims aprovados: [texto].
Use movimento preciso e calmo: máscaras, linha, fade/translate e macro de processo.
Evite bounce, neon, partículas genéricas e vinheta longa. Legendas são obrigatórias.
Assets de logo/texto serão compostos a partir dos masters; não os gere.
Entregue roteiro com timecode, shot list, prompts por shot quando houver IA,
negative prompts, continuidade, thumbnail, SRT e specs de export.
```

## Agente crítico

Para testar uma proposta sem induzir a resposta:

```text
Avalie esta peça da Botica Guaraní para [público/canal/objetivo].
Use os masters e fundamentos fornecidos, mas não presuma que a peça está correta.
Faça leitura de 5 segundos e no tamanho final; pontue marca, hierarquia, CTA,
canal, distintividade, acessibilidade, produção e segurança. Separe preservar,
evoluir e remover. Recomende a menor intervenção capaz de resolver os problemas.
Não reescreva claims nem invente fatos.
```

## Revisão do prompt

Antes de entregar um prompt, verificar:

- a ferramenta/agent consegue produzir o formato pedido;
- dimensões e idioma estão claros;
- assets e copy têm fonte/status;
- o prompt separa marca real de conteúdo gerado;
- há negative constraints específicas, não apenas “faça bonito”;
- saída e critérios de aprovação são observáveis;
- qualquer mutação externa exige aprovação no momento correto.
