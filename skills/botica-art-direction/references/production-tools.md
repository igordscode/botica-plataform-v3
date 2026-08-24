# Ferramentas, arquivos e produção

## Escolha da ferramenta

| Necessidade | Ferramenta principal | Observação |
|---|---|---|
| Social templated e colaboração | Canva | Trabalhar a partir de design/brand template selecionado; preservar editabilidade. |
| Vetor, logo, ícone, faca, flyer | Illustrator | Nunca rasterizar ou redesenhar o logo no Photoshop. |
| Fotografia, composição e mockup | Photoshop | Usar Smart Objects, máscaras e ajustes não destrutivos. |
| Manual, catálogo e multipágina | InDesign | Estilos, masters, links e pacote de produção. |
| UI e protótipo | Figma ou código | Usar sistema/tokens; garantir handoff e estados. |
| Web responsiva | HTML/CSS/React conforme repositório | Validar comportamento real, não somente frame estático. |
| Motion | After Effects | Templates, precomps, controllers e projeto empacotado. |
| Edição e áudio | Premiere/DAW apropriada | Legendas, mix e versões por canal. |

Se a ferramenta solicitada não estiver disponível, gerar uma especificação ou prompt executável e declarar a limitação. Não fingir que um arquivo nativo foi criado.

## Canva

1. Buscar os designs existentes pelo título e inspecionar somente páginas relevantes.
2. Preferir copiar uma peça ouro ou usar brand template aprovado a reconstruir do zero.
3. Mapear campos variáveis: título, apoio, CTA, imagem, idioma, data, produto e contato.
4. Para edição, iniciar transação e manter as mudanças em draft.
5. Mostrar a proposta e obter aprovação explícita antes do commit.
6. Entregar link do design, páginas alteradas, exports e observações de QA.

Não transformar toda peça existente em template. Primeiro valide que grid, copy, contraste e versão estão aprovados.

## Photoshop

- trabalhar em resolução e perfil adequados ao destino;
- usar Smart Objects para produto e logo;
- manter recorte e sombra plausíveis;
- separar tratamento de imagem de elementos gráficos;
- preservar arquivo em camadas e uma versão flattened somente para export;
- não usar Content-Aware/IA sobre texto, rótulo, rosto consentido ou marca sem revisão.

## Illustrator e InDesign

- importar o logo master por link ou cópia controlada;
- usar swatches nomeados e estilos;
- separar faca/acabamentos em layers e spot colors;
- manter texto vivo na versão editável;
- empacotar links/fontes quando a licença permitir;
- gerar PDF de prova e PDF de produção distintos.

## Web e UI

- partir dos tokens da Plataforma V3 ou do asset CSS desta skill;
- preservar componentes e convenções do repositório;
- usar SVG oficial e texto real;
- fornecer estados, responsividade, acessibilidade e verificação de build;
- não exportar um layout responsivo como imagem única.

## Nomenclatura e versão

Usar:

```text
BG_[campanha-ou-pilar]_[entrega]_[canal]_[proporcao-ou-tamanho]_[idioma]_vNN_[status].ext
```

Exemplos:

```text
BG_25anos_story_capa_9x16_ES_v03_review.png
BG_receta_carrossel_instagram_4x5_PTBR_v02_approved.pdf
BG_institucional_logo-horizontal_azul_master.svg
```

Status permitidos: `draft`, `review`, `approved`, `published`, `archive`, `master`. Não usar `final-final`.

## Pacote de handoff

Organizar por projeto:

```text
00_brief/
01_sources/
02_working/
03_review/
04_approved/
05_exports/
06_archive/
```

Incluir uma nota de provenance com assets, fontes/licenças, copy/claims, aprovações, dimensões, perfis e pendências. Não copiar a biblioteca completa para cada job; linkar masters e duplicar somente o necessário para preservar portabilidade.
