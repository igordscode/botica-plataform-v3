# Impresso, embalagem e peças físicas

## Começar pelo fornecedor

Antes de fechar arte, confirmar tamanho final, sangria, área segura, substrato, processo de impressão, número de cores, faca, acabamento, perfil de cor, padrão de PDF, marcas e requisitos do fornecedor. Se ainda não houver fornecedor, usar hipóteses explicitamente marcadas e não chamar o arquivo de press-ready.

Baseline somente quando o fornecedor não informar:

- sangria de `3 mm`;
- imagens a `300 ppi` no tamanho final;
- cores em CMYK ou spot definidas com prova;
- texto e elementos críticos dentro de uma área segura maior que a sangria;
- PDF/X-4, com fontes incorporadas e transparências preservadas, salvo exigência diferente.

## Aplicações

### Flyers, cartazes e sinalização

- hierarquia legível à distância real;
- uma ação dominante e contato verificado;
- versão curta do conteúdo, com QR code testado;
- contraste que sobreviva à impressão e à iluminação do local;
- escala do logo e margem consistentes;
- mockup serve para apresentação, não substitui arquivo final.

### Papelaria e documentos

- usar modo claro apotecário para leitura;
- reservar o azul escuro para cabeçalho, regras e assinatura;
- campos editáveis não devem depender de fontes não instaladas;
- versões digitais precisam de acessibilidade e tamanho de arquivo razoável;
- dados jurídicos/fiscais devem ser fornecidos e aprovados, nunca inferidos.

### Embalagens, rótulos e etiquetas

- trabalhar sobre faca/dieline do fornecedor;
- manter camadas separadas para arte, corte, dobra, verniz, branco e hot stamping;
- não alterar código de barras, QR, lote ou informação variável como imagem decorativa;
- reservar áreas variáveis para fórmula, concentração, paciente, prescritor, lote, validade e instruções conforme o processo real;
- validar legibilidade no tamanho físico e no material escolhido;
- não inventar conteúdo obrigatório, símbolos, advertências ou selo regulatório;
- revisão final exige farmacêutico/responsável regulatório.

### Manual de marca

Preferir InDesign ou ferramenta multipágina adequada. Incluir assets vetoriais, exemplos reais, status das regras e arquivos de exportação. O manual não deve tornar hipóteses de agente em normas oficiais; usar as etiquetas de origem descritas em `brand-foundation.md`.

## Cor e o azul escuro

O azul profundo pode variar muito entre tela, impressão digital, offset, tecido e embalagem. Não converter um hex em CMYK e declarar equivalência perfeita. Solicitar prova física, definir Pantone/spot somente após teste e observar:

- ganho de ponto e perda de detalhe em texturas escuras;
- limite de tinta total do substrato;
- contraste do azul-claro/cinza sobre azul profundo;
- overprint de texto preto e objetos brancos;
- diferença entre papel revestido, não revestido, vinil e tecido.

Manter o logo master intacto. Uma conversão de cor para produção deve ser uma variante documentada, não uma edição sobre o arquivo original.

## Arquivos Adobe

- Illustrator: vetores, logos, ícones, faca e peças de uma página;
- InDesign: manual, catálogo, editorial e documentos multipágina;
- Photoshop: fotografia, mockups e composição raster; não para redesenhar o logo;
- Acrobat/Preflight: inspeção final do PDF.

Empacotar links e fontes permitidas, limpar elementos ocultos, nomear spots e facas, manter versões editáveis e exportar prova de baixa resolução separada do arquivo de produção.

## Checklist de pré-impressão

- tamanho, orientação, páginas e imposição confirmados;
- sangria, área segura e marcas conforme fornecedor;
- imagens na resolução efetiva;
- cores e perfil corretos; RGB residual revisado;
- preto pequeno, rich black e overprint revisados;
- fontes incorporadas/licenciadas ou outlines em cópia de produção;
- transparências, efeitos, linhas finas e white objects verificados;
- códigos testados e informação variável fora da arte fixa;
- textos, datas, contatos, claims e conteúdo regulatório aprovados;
- prova visual assinada e arquivo final com checksum/versão.

Não afirmar que uma peça está pronta para impressão sem executar ou receber confirmação desses controles.
