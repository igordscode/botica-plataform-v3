# Segurança de conteúdo em saúde

Esta skill dirige comunicação visual; não substitui farmacêutico, médico, jurídico, regulatório ou aprovação do proprietário. Comunicação de saúde exige rastreabilidade maior que uma campanha comum.

## Bloqueios

Não publicar nem apresentar como fato sem fonte e aprovação:

- indicação, eficácia, tempo de resultado ou promessa de cura;
- dose, concentração, modo de uso, contraindicação ou interação;
- superioridade, “mais seguro”, “sem risco”, “100% natural” ou garantia;
- antes/depois, estatística, estudo, laudo ou resultado clínico;
- recomendação/endorsement de médico ou associação;
- certificação, registro, selo ou autorização;
- prazo de produção/entrega, preço, estoque ou cobertura não confirmados;
- depoimento, nome, foto ou história de paciente;
- comparação com concorrente ou medicamento.

Um placeholder deve parecer placeholder: `[CLAIM APROVADO AQUI]`. Não escrever uma frase convincente e esperar que alguém perceba que era rascunho.

## Receita magistral

- não sugerir diagnóstico ou prescrição pela peça;
- distinguir fórmula prescrita, produto de catálogo e conteúdo educacional;
- upload de receita deve explicar finalidade, consentimento, privacidade e próximo passo;
- não mostrar receita real, nome, telefone, documento, diagnóstico ou prescrição em mock/screenshot;
- dúvida médica e orientação individual devem apontar para farmacêutico/profissional humano.

## Pessoas, prova e imagem

- usar depoimento, rosto e voz somente com autorização documentada;
- não gerar médico fictício como autoridade ou paciente fictício como história real;
- não retocar corpo/pele para fabricar resultado;
- antes/depois requer consentimento, condições equivalentes, contexto e revisão regulatória;
- crianças, idosos e grupos vulneráveis exigem cuidado e consentimento reforçados;
- imagem de laboratório gerada não deve ser apresentada como fotografia da unidade real.

## Cultura Guaraní

O símbolo oficial pode ser usado conforme o manual. Não gerar novas pessoas indígenas, trajes, rituais, língua ou grafismos como decoração de campanha sem pesquisa, participação e aprovação adequadas. Evitar associar “Guaraní” a primitivo, místico, exótico ou “cura ancestral”.

## Privacidade

- remover PII e dados de saúde de brief, prompt, screenshot e arquivo de exemplo;
- usar dados sintéticos claramente fictícios em protótipos;
- não enviar receita, laudo ou contato pessoal a ferramenta externa sem autorização e necessidade;
- limitar acesso e retenção dos assets sensíveis;
- não reutilizar arquivo de paciente como stock visual.

## ES e PT-BR

As versões devem ter equivalência de significado, restrição e CTA. Não suavizar contraindicação, aviso ou condição na tradução. Termos técnicos e regulatórios precisam de revisão de falante qualificado/profissional.

## Gate de aprovação

Antes de liberar peça de saúde, registrar:

```text
Claim/copy:
Fonte fornecida:
Escopo permitido:
Revisor farmacêutico/regulatório:
Versões aprovadas:
Data da aprovação:
Validade/condições:
Assets de pessoa/produto autorizados:
Pendências:
```

Se faltarem fonte ou aprovador, continuar com direção visual e placeholders, mas classificar a publicação como bloqueada. Nunca resolver o bloqueio inventando um disclaimer.
