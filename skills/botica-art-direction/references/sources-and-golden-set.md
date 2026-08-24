# Fontes e seleção ouro

## Hierarquia local

Quando o workspace estiver em `C:\Users\TestP\Projetos`, as fontes principais são:

| Classe | Fonte | Uso |
|---|---|---|
| Master oficial | `botica-brand\BOTICA GUARANI LOGOS\` | Logos AI, EPS, PDF, PNG, SVG e WebP. Não alterar os masters. |
| Sistema e acervo | `botica-brand\` | Design systems, exports, destaques, HTMLs e kit do Instagram. |
| Social atual | `botica-brand\kit-instagram\new_brand_assets\` | Exportações recentes organizadas por função. |
| Digital atual | `botica-platform\` | Plataforma V3, tokens, componentes, produtos e experiência digital. |
| Operação/contexto | `AgentesGuarani\` e skill `botica` | Fluxos, públicos e contexto operacional; não são fonte visual primária. |

Se esses caminhos não existirem, a skill continua funcional com os fundamentos e assets empacotados. Para reproduzir ou auditar uma peça específica, peça o arquivo ou link correspondente.

## Acervo já organizado

Não reextrair todos os ZIPs de Downloads. Em 2026-08-24, `botica-brand` já continha 301 PNGs e as coleções recentes abaixo:

- `plantilla_ig\`: 41 telas;
- `destaques_v7\`: 37 imagens;
- `destaques_v6\`: 37 imagens, tratadas como versão anterior;
- `cta_storys\`: 13 imagens;
- `capa_storys\`: 7 imagens;
- `perfil_whatsapp\`: 6 imagens;
- `covers\portada-hero.png`: imagem utilizada pela Plataforma V3.

Os ZIPs de Downloads são arquivo de origem e histórico. Liste entradas, conte, calcule hashes e compare com o acervo antes de extrair. Nunca despeje centenas de imagens dentro da skill.

## Seleção ouro recomendada

Use no máximo uma referência principal por função e poucas secundárias. A seleção inicial é:

| Função | Referência | O que observar |
|---|---|---|
| DNA escuro / destaque | `new_brand_assets\destaques_v7\Botica.png` | Fundo profundo, recorte do símbolo e ícone central. |
| Story editorial | `new_brand_assets\plantilla_ig\1.png` | Hierarquia de número, símbolo, título serifado, linha e assinatura. |
| Story de conversão | `new_brand_assets\plantilla_ig\20.png` | CTA e contato; melhorar contraste, concisão e aparência do painel. |
| Abertura de sequência | `new_brand_assets\capa_storys\1.png` | Ritmo, respiro e entrada de narrativa. |
| Fechamento/CTA | `new_brand_assets\cta_storys\1.png` | Estrutura de encerramento; não copiar todos os textos e camadas. |
| Hero digital | `botica-brand\covers\portada-hero.png` e Platform V3 | Integração do símbolo com a experiência web. |
| Logo | master SVG correspondente em `BOTICA GUARANI LOGOS\SVG\` | Geometria e cores oficiais. |

`perfil_whatsapp` inclui símbolos de função interna, como um ícone de caixa. Trate-os como sinalização operacional, não como extensão automática do logo público.

## Canva

Buscar pelo título no Canva antes de usar, pois os designs podem receber novas páginas. A auditoria inicial encontrou, entre outros:

- `Plantilla IG` (`DAHPpAD2yLE`, 41 páginas);
- `Destaques Botica Guarani` (`DAHK3Qpa9tA`, 37 páginas);
- `Capa dos Storys - Destaques Iniciais - BG` (`DAHO5pxywjU`, 7 páginas);
- `CTA dos Storys - Destaques Iniciais - BG` (`DAHO5t0xecc`, 13 páginas);
- `Portada de FB - Botica Guarani` (`DAHM28gIx58`, 6 páginas);
- `1- Botica` (`DAHMSbMtT5w`, 8 páginas);
- `2- Guarani` (`DAHMSQSNfgI`, 7 páginas);
- `Portal Guarani` (`DAHMqoxu5XI`, 6 páginas).

Esses IDs são ponte de descoberta, não licença para editar. Para auditoria, leia thumbnails/páginas selecionadas. Para editar, inicie uma transação, apresente a mudança e só faça commit após aprovação explícita do usuário.

## Classificação dos ativos

Classifique cada fonte antes de usá-la:

- **MASTER:** logo ou ativo oficial imutável;
- **OURO:** peça aprovada, atual, representativa e tecnicamente adequada;
- **APOIO:** boa solução parcial, útil para um aspecto específico;
- **LEGADO:** mantém valor histórico, mas conflita com a direção atual;
- **INCERTO:** sem aprovação, data, origem ou qualidade suficiente;
- **NÃO USAR:** erro factual, marca distorcida, claim inseguro, baixa legibilidade ou arquivo defeituoso.

Não transformar volume em autoridade. Cinquenta peças inconsistentes não vencem um master oficial ou uma decisão atual aprovada.

## Critérios para escolher referências

Pontue cada candidata em: aprovação/uso real, recência, aderência ao objetivo, fidelidade ao master, qualidade de composição, legibilidade no tamanho final, qualidade técnica e possibilidade de adaptação. Escolha de cinco a oito referências no máximo para um projeto grande e de uma a três para uma peça simples.

Para cada referência escolhida, registre:

```text
Fonte:
Classe: MASTER | OURO | APOIO | LEGADO | INCERTO
Função nesta entrega:
Elementos a preservar:
Elementos a não repetir:
Data/versão:
Status de aprovação:
```

## Reconciliação conhecida

- Masters oficiais usam `#133385` e `#ABBAD7`.
- O social recente usa um campo mais escuro e texturizado.
- A Plataforma V3 combina `#133385`, superfícies `#0B192C`/`#08101E` e SVGs preparados em `#152C60`.
- Um design system inferido usa `#103080`; outro manual antigo aceita gradientes leves. Esses pontos são legado/proposta, não regra superior.

Preserve a cor embutida em uma peça existente quando a tarefa for manutenção pontual. Para um sistema novo, partir dos masters e dos tokens adotados nesta skill.
