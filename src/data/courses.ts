import { LanguageTrack } from '../types';

export const TRACKS_DATA: LanguageTrack[] = [
  {
    id: 'javascript',
    name: 'JavaScript',
    slug: 'javascript',
    shortDescription: 'A linguagem mais popular do mundo, essencial para desenvolvimento web interativo e apps modernos.',
    fullDescription: 'Domine a espinha dorsal da web moderna. Do primeiro console.log à manipulação de arrays, objetos e lógica funcional.',
    icon: '⚡',
    badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    accentColor: '#eab308',
    textColor: 'text-amber-400',
    bgGradient: 'from-amber-500/20 to-yellow-500/5',
    levelLabel: 'Iniciante ao Avançado',
    popularity: 98,
    modulesCount: 8,
    totalXp: 1450,
    prerequisites: 'Nenhum conhecimento prévio',
    topics: ['Variáveis', 'Tipos', 'Operadores', 'Condicionais', 'Loops', 'Funções', 'Arrays', 'Objetos'],
    modules: [
      {
        id: 'js-m1',
        trackId: 'javascript',
        title: 'Módulo 1: Fundamentos & Primeiro Código',
        order: 1,
        description: 'Dê seus primeiros passos no universo do código com console e sintaxe limpa.',
        iconName: 'Sparkles',
        xpReward: 120,
        lessons: [
          {
            id: 'js-l1',
            moduleId: 'js-m1',
            trackId: 'javascript',
            title: 'Olá, Mundo! & O console',
            order: 1,
            estimatedMinutes: 3,
            xpReward: 30,
            summary: 'Aprenda a exibir mensagens na tela usando o console.log.',
            conceptIntro: {
              explanation: [
                'Todo programador começa com o clássico "Olá, Mundo!".',
                'No JavaScript, usamos a instrução `console.log()` para imprimir informações ou mensagens na tela de saída do programa.',
                'Textos normais devem ser colocados entre aspas simples (`\'\'`) ou aspas duplas (`""`). Isso indica que são strings de texto.'
              ],
              keyPoints: [
                'console.log() envia mensagens para a saída padrão.',
                'Textos precisam de aspas ("Olá Mundo").',
                'Cada instrução costuma terminar com ponto e vírgula (;).'
              ],
              syntaxNotes: 'console.log("Sua mensagem aqui");'
            },
            codeExample: {
              title: 'Exibindo Mensagens',
              code: '// Imprimindo uma mensagem no console\nconsole.log("Olá, Dev!");\nconsole.log(2025);',
              language: 'javascript',
              explanation: 'A primeira linha exibe o texto "Olá, Dev!" e a segunda imprime o número 2025 diretamente.',
              output: 'Olá, Dev!\n2025'
            },
            exercise: {
              id: 'ex-js-l1',
              type: 'fill-in-code',
              prompt: 'Complete o código para exibir a mensagem "CodeQuest" no console:',
              hints: [
                'Use o comando console.log() para imprimir mensagens.',
                'Coloque a palavra com aspas corretas.'
              ],
              explanationOnSuccess: 'Excelente! Você acabou de rodar seu primeiro comando em JavaScript.',
              explanationOnError: 'Verifique se você digitou console.log corretamente e passou "CodeQuest" entre aspas.',
              fillInCode: {
                codeTemplate: 'console.{{blank_1}}("CodeQuest");',
                blanks: [
                  { id: 'blank_1', expected: 'log', placeholder: 'metodo' }
                ],
                previewOutput: 'CodeQuest'
              }
            }
          },
          {
            id: 'js-l2',
            moduleId: 'js-m1',
            trackId: 'javascript',
            title: 'Comentários no Código',
            order: 2,
            estimatedMinutes: 3,
            xpReward: 35,
            summary: 'Entenda como documentar seu código sem interferir na execução.',
            conceptIntro: {
              explanation: [
                'Comentários são anotações que o computador ignora completamente ao rodar o programa.',
                'Eles servem para explicar o que o código faz para você mesmo e para outros desenvolvedores.',
                'Para uma linha, usamos duas barras `//`. Para múltiplas linhas, usamos `/* ... */`.'
              ],
              keyPoints: [
                '// cria comentário de linha única.',
                '/* */ cria comentário de bloco.',
                'O computador pula os comentários sem gerar erros.'
              ]
            },
            codeExample: {
              title: 'Exemplo de Comentários',
              code: '// Este é um comentário explicativo\nconsole.log("Executado normalmente");\n/* Este bloco todo\n   é ignorado pelo JS */',
              language: 'javascript',
              explanation: 'Apenas o console.log é executado. Todo o resto é documentação.',
              output: 'Executado normalmente'
            },
            exercise: {
              id: 'ex-js-l2',
              type: 'multiple-choice',
              prompt: 'Qual dos símbolos abaixo é utilizado para criar um comentário de uma única linha em JavaScript?',
              hints: [
                'Pense nas duas barras inclinadas para a frente.'
              ],
              explanationOnSuccess: 'Perfeito! As duas barras // iniciam um comentário de linha única.',
              explanationOnError: 'Lembre-se: em JavaScript usamos duas barras normais (//) para comentários simples.',
              multipleChoice: {
                options: [
                  '# Comentário',
                  '// Comentário',
                  '<!-- Comentário -->',
                  '-- Comentário'
                ],
                correctIndex: 1
              }
            }
          },
          {
            id: 'js-l3',
            moduleId: 'js-m1',
            trackId: 'javascript',
            title: 'Executando Cálculos Matemáticos',
            order: 3,
            estimatedMinutes: 4,
            xpReward: 45,
            summary: 'Descubra como o JavaScript funciona como uma calculadora superpotente.',
            conceptIntro: {
              explanation: [
                'Números não precisam de aspas no código.',
                'Você pode realizar operações matemáticas diretamente: soma (+), subtração (-), multiplicação (*) e divisão (/).',
                'O JavaScript calcula o resultado automaticamente antes de imprimir.'
              ],
              keyPoints: [
                'Números são declarados sem aspas (ex: 42, 3.14).',
                'Operadores básicos: + - * /',
                'Ordem de precedência: multiplicações e divisões ocorrem antes de somas e subtrações.'
              ]
            },
            codeExample: {
              title: 'Matemática em JavaScript',
              code: 'console.log(10 + 5); // 15\nconsole.log(10 * 2); // 20\nconsole.log((5 + 5) * 2); // 20',
              language: 'javascript',
              explanation: 'O parêntese altera a prioridade do cálculo como na matemática tradicional.',
              output: '15\n20\n20'
            },
            exercise: {
              id: 'ex-js-l3',
              type: 'order-blocks',
              prompt: 'Ordene os blocos para calcular e exibir a média aritmética entre 10 e 20:',
              hints: [
                'Primeiro somamos (10 + 20) com parênteses, depois dividimos por 2 dentro do console.log.'
              ],
              explanationOnSuccess: 'Excelente! A ordem dos blocos formou a expressão matemática correta.',
              explanationOnError: 'Lembre-se da estrutura: console.log no início, parênteses na soma e divisão por 2.',
              orderBlocks: {
                blocks: [
                  { id: 'b1', text: 'console.log(', correctPosition: 0 },
                  { id: 'b2', text: '(10 + 20)', correctPosition: 1 },
                  { id: 'b3', text: '/ 2', correctPosition: 2 },
                  { id: 'b4', text: ');', correctPosition: 3 }
                ],
                resultExplanation: 'console.log((10 + 20) / 2); calcula (30 / 2) e imprime 15.'
              }
            }
          }
        ]
      },
      {
        id: 'js-m2',
        trackId: 'javascript',
        title: 'Módulo 2: Variáveis & Tipos de Dados',
        order: 2,
        description: 'Aprenda a guardar informações na memória com let, const e descubra os tipos fundamentais.',
        iconName: 'Box',
        xpReward: 160,
        lessons: [
          {
            id: 'js-l4',
            moduleId: 'js-m2',
            trackId: 'javascript',
            title: 'Criando Variáveis com let e const',
            order: 1,
            estimatedMinutes: 5,
            xpReward: 50,
            summary: 'Guarde dados em caixas com nomes claros usando let e const.',
            conceptIntro: {
              explanation: [
                'Variáveis são como caixas etiquetadas que guardam informações na memória do computador.',
                'Use `const` quando o valor NUNCA vai mudar (uma constante, ex: PI, data de nascimento).',
                'Use `let` quando o valor pode mudar ao longo do tempo (ex: pontuação no jogo, idade).'
              ],
              keyPoints: [
                'const = valor imutável (não pode ser reatribuído).',
                'let = valor que pode mudar mais tarde.',
                'Evite usar `var` no código moderno.'
              ]
            },
            codeExample: {
              title: 'Declarando Variáveis',
              code: 'const nome = "Ana";\nlet pontuacao = 100;\n\npontuacao = 150; // Válido!\n// nome = "Carlos"; // ERRO: const não pode mudar',
              language: 'javascript',
              explanation: 'A variável `pontuacao` foi atualizada com sucesso porque foi criada com `let`.',
              output: 'Pontuação atual: 150'
            },
            exercise: {
              id: 'ex-js-l4',
              type: 'fill-in-code',
              prompt: 'Declare uma constante chamada "linguagem" com o valor "JavaScript":',
              hints: [
                'Palavra-chave para constante é const.',
                'Atribua usando o sinal de igual =.'
              ],
              explanationOnSuccess: 'Muito bem! Você criou sua primeira constante em JavaScript.',
              explanationOnError: 'Verifique se usou `const` e o valor `"JavaScript"`.',
              fillInCode: {
                codeTemplate: '{{blank_1}} linguagem = "{{blank_2}}";',
                blanks: [
                  { id: 'blank_1', expected: 'const', placeholder: 'palavra-chave' },
                  { id: 'blank_2', expected: 'JavaScript', placeholder: 'valor' }
                ],
                previewOutput: 'const linguagem = "JavaScript";'
              }
            }
          },
          {
            id: 'js-l5',
            moduleId: 'js-m2',
            trackId: 'javascript',
            title: 'Tipos Primitivos: String, Number, Boolean',
            order: 2,
            estimatedMinutes: 4,
            xpReward: 50,
            summary: 'Conheça os 3 tipos mais importantes de dados no dia a dia.',
            conceptIntro: {
              explanation: [
                'O JavaScript categoriza qualquer valor em um Tipo de Dado.',
                '1. **String**: textos delimitados por aspas (`"Olá"`, `\'Dev\'`).',
                '2. **Number**: números inteiros ou decimais (`42`, `99.90`).',
                '3. **Boolean**: verdadeiro (`true`) ou falso (`false`), usado para tomada de decisões.'
              ],
              keyPoints: [
                'typeof variavel revela qual o tipo do dado.',
                'Booleans só possuem dois valores: true ou false.',
                'Textos com aspas são sempre String, mesmo que contenham números ("123").'
              ]
            },
            codeExample: {
              title: 'Identificando Tipos',
              code: 'const usuario = "Lucas"; // String\nconst idade = 24;       // Number\nconst ativo = true;     // Boolean\n\nconsole.log(typeof ativo); // "boolean"',
              language: 'javascript',
              explanation: 'O operador typeof retorna uma string com o nome do tipo primitivo.',
              output: 'boolean'
            },
            exercise: {
              id: 'ex-js-l5',
              type: 'find-bug',
              prompt: 'Identifique a linha que contém um erro de sintaxe na declaração dos tipos:',
              hints: [
                'Booleans devem ser escritos como true ou false sem aspas, mas uma linha tentou inventar outro valor ou errou as aspas.'
              ],
              explanationOnSuccess: 'Mandou bem! O valor "sim" não é um booleano válido nativo, além das aspas não fechadas.',
              explanationOnError: 'Examine com cuidado a linha do `estaLogado`.',
              findBug: {
                code: '1: const nome = "Mariana";\n2: const nivel = 5;\n3: const estaLogado = "verdadeiro;\n4: console.log(nome);',
                buggyLineIndex: 2,
                options: [
                  { label: 'Linha 1: Faltou ponto e vírgula', isCorrect: false },
                  { label: 'Linha 2: O número 5 deveria ter aspas', isCorrect: false },
                  { label: 'Linha 3: Aspas não fechadas na String', isCorrect: true },
                  { label: 'Linha 4: console.log está escrito errado', isCorrect: false }
                ],
                bugExplanation: 'A linha 3 abriu aspas duplas mas não as fechou, causando um erro de sintaxe no compilador.'
              }
            }
          }
        ]
      },
      {
        id: 'js-m3',
        trackId: 'javascript',
        title: 'Módulo 3: Operadores & Comparações',
        order: 3,
        description: 'Descubra como comparar valores com ===, !==, >, < e operadores lógicos && e ||.',
        iconName: 'Scale',
        xpReward: 180,
        lessons: [
          {
            id: 'js-l6',
            moduleId: 'js-m3',
            trackId: 'javascript',
            title: 'Comparações Estritas (=== vs ==)',
            order: 1,
            estimatedMinutes: 4,
            xpReward: 55,
            summary: 'Entenda por que programadores profissionais usam sempre ===.',
            conceptIntro: {
              explanation: [
                'Para verificar se dois valores são iguais, usamos `===` (igualdade estrita).',
                'O operador `===` compara tanto o **valor** quanto o **tipo** do dado.',
                'O operador `!==` verifica se dois valores são estritamente diferentes.'
              ],
              keyPoints: [
                '=== compara valor e tipo (recomendado).',
                '== tenta converter tipos (pode causar bugs difíceis).',
                '5 === "5" é FALSE porque um é Number e o outro é String.'
              ]
            },
            codeExample: {
              title: 'Comparando Valores',
              code: 'console.log(10 === 10);   // true\nconsole.log(10 === "10"); // false (tipos diferentes!)\nconsole.log(5 > 3);       // true',
              language: 'javascript',
              explanation: '10 === "10" é falso pois o primeiro é Number e o segundo é String.',
              output: 'true\nfalse\ntrue'
            },
            exercise: {
              id: 'ex-js-l6',
              type: 'true-false',
              prompt: 'A expressão `42 === "42"` resulta em `true` no JavaScript moderno?',
              hints: [
                'Lembre-se que um lado é Number e o outro é String.'
              ],
              explanationOnSuccess: 'Correto! 42 é número e "42" é texto, portanto o comparador estrito === retorna false.',
              explanationOnError: 'Incorreto. O operador === verifica também o tipo. Number e String são tipos distintos.',
              trueFalse: {
                statement: 'A expressão `42 === "42"` retorna true.',
                codeSnippet: 'const resultado = 42 === "42";\nconsole.log(resultado);',
                isTrue: false,
                explanation: 'Como 42 é um número e "42" é uma string, a comparação estrita resulta em false.'
              }
            }
          }
        ]
      },
      {
        id: 'js-m4',
        trackId: 'javascript',
        title: 'Módulo 4: Estruturas Condicionais (if / else)',
        order: 4,
        description: 'Dê poder de decisão ao seu código para reagir a diferentes situações.',
        iconName: 'GitBranch',
        xpReward: 200,
        lessons: [
          {
            id: 'js-l7',
            moduleId: 'js-m4',
            trackId: 'javascript',
            title: 'Tomando Decisões com if e else',
            order: 1,
            estimatedMinutes: 5,
            xpReward: 60,
            summary: 'Execute blocos de código apenas quando uma condição for verdadeira.',
            conceptIntro: {
              explanation: [
                'Com o `if`, o computador avalia uma condição entre parênteses.',
                'Se a condição for verdadeira (`true`), o bloco entre chaves `{}` é executado.',
                'Caso contrário, o bloco `else` (se existir) é executado.'
              ],
              keyPoints: [
                'if (condição) { ... }',
                'else { ... } é a alternativa se a condição falhar.',
                'Você pode encadear com else if (outraCondicao) { ... }'
              ]
            },
            codeExample: {
              title: 'Verificando Maioridade',
              code: 'const idade = 18;\n\nif (idade >= 18) {\n  console.log("Acesso Liberado!");\n} else {\n  console.log("Acesso Bloqueado.");\n}',
              language: 'javascript',
              explanation: 'Como idade é 18, a condição (idade >= 18) é verdadeira e exibe "Acesso Liberado!".',
              output: 'Acesso Liberado!'
            },
            exercise: {
              id: 'ex-js-l7',
              type: 'code-sandbox',
              prompt: 'Escreva uma estrutura `if / else` para verificar se a variável `pontos` (que vale 120) é maior ou igual a 100. Se for, imprima "Vencedor".',
              hints: [
                'Crie a variável `const pontos = 120;`',
                'Use `if (pontos >= 100) { console.log("Vencedor"); }`'
              ],
              explanationOnSuccess: 'Sensacional! Você escreveu e testou sua primeira condicional com sucesso.',
              explanationOnError: 'Verifique se o seu código imprime exatamente a palavra "Vencedor".',
              codeSandbox: {
                starterCode: 'const pontos = 120;\n\n// Escreva sua condicional aqui:\nif (pontos >= 100) {\n  console.log("Vencedor");\n}',
                expectedOutput: 'Vencedor',
                expectedKeywords: ['if', 'console.log', '100']
              }
            }
          }
        ]
      },
      {
        id: 'js-m5',
        trackId: 'javascript',
        title: 'Módulo 5: Funções & Reutilização',
        order: 5,
        description: 'Crie blocos reutilizáveis de código com parâmetros e retorno de valores.',
        iconName: 'Zap',
        xpReward: 220,
        lessons: [
          {
            id: 'js-l8',
            moduleId: 'js-m5',
            trackId: 'javascript',
            title: 'Criando sua Primeira Função',
            order: 1,
            estimatedMinutes: 6,
            xpReward: 65,
            summary: 'Agrupe comandos em uma função para usá-los quantas vezes quiser.',
            conceptIntro: {
              explanation: [
                'Funções são como fábricas: recebem ingredientes (parâmetros), processam e devolvem um resultado (`return`).',
                'Elas evitam que você repita o mesmo código várias vezes no projeto.',
                'Para executar uma função, você a "chama" escrevendo seu nome seguido de parênteses: `minhaFuncao()`.'
              ],
              keyPoints: [
                'function nome(parametro) { return valor; }',
                'O comando return devolve a resposta e encerra a função.',
                'Parâmetros funcionam como variáveis dentro da função.'
              ]
            },
            codeExample: {
              title: 'Função de Soma',
              code: 'function somar(a, b) {\n  return a + b;\n}\n\nconst resultado = somar(7, 3);\nconsole.log(resultado); // 10',
              language: 'javascript',
              explanation: 'A função `somar` recebe 7 e 3, calcula 7 + 3 e retorna 10.',
              output: '10'
            },
            exercise: {
              id: 'ex-js-l8',
              type: 'fill-in-code',
              prompt: 'Complete a função para dobrar um número recebido como parâmetro:',
              hints: [
                'Para dobrar um número, multiplique por 2.',
                'Use o comando return.'
              ],
              explanationOnSuccess: 'Brilhante! Sua função agora é capaz de dobrar qualquer número.',
              explanationOnError: 'Verifique se colocou `return` e multiplicou `numero * 2`.',
              fillInCode: {
                codeTemplate: 'function dobrar(numero) {\n  {{blank_1}} numero * {{blank_2}};\n}',
                blanks: [
                  { id: 'blank_1', expected: 'return', placeholder: 'comando' },
                  { id: 'blank_2', expected: '2', placeholder: 'fator' }
                ],
                previewOutput: 'function dobrar(numero) { return numero * 2; }'
              }
            }
          }
        ]
      },
      {
        id: 'js-m6',
        trackId: 'javascript',
        title: 'Módulo 6: Arrays (Listas de Dados)',
        order: 6,
        description: 'Armazene e manipule múltiplos itens em uma única lista organizada.',
        iconName: 'List',
        xpReward: 240,
        lessons: [
          {
            id: 'js-l9',
            moduleId: 'js-m6',
            trackId: 'javascript',
            title: 'Trabalhando com Listas de Itens',
            order: 1,
            estimatedMinutes: 5,
            xpReward: 70,
            summary: 'Crie listas ordenadas e acesse seus elementos pelo índice numérico.',
            conceptIntro: {
              explanation: [
                'Um Array é uma lista de valores guardados entre colchetes `[]`.',
                'Os itens são indexados a partir do zero: o primeiro elemento está no índice 0, o segundo no 1, e assim por diante.',
                'Use `.length` para saber a quantidade total de itens na lista.'
              ],
              keyPoints: [
                'Arrays usam colchetes: ["item1", "item2"].',
                'Índices começam em 0: array[0] pega o primeiro item.',
                '.length devolve o tamanho total do array.'
              ]
            },
            codeExample: {
              title: 'Acessando Elementos',
              code: 'const frutas = ["Maçã", "Banana", "Laranja"];\nconsole.log(frutas[0]); // Maçã\nconsole.log(frutas.length); // 3',
              language: 'javascript',
              explanation: 'frutas[0] retorna "Maçã", pois o primeiro elemento sempre tem o índice 0.',
              output: 'Maçã\n3'
            },
            exercise: {
              id: 'ex-js-l9',
              type: 'multiple-choice',
              prompt: 'Dado o array `const linguagens = ["Python", "JavaScript", "TypeScript"];`, qual comando acessa o item "JavaScript"?',
              hints: [
                'Lembre-se que o primeiro item ("Python") está no índice 0.'
              ],
              explanationOnSuccess: 'Isso mesmo! O segundo elemento está localizado no índice [1].',
              explanationOnError: 'Lembre-se da contagem baseada em zero: [0] é Python, [1] é JavaScript.',
              multipleChoice: {
                options: [
                  'linguagens[1]',
                  'linguagens[2]',
                  'linguagens["JavaScript"]',
                  'linguagens.get(1)'
                ],
                correctIndex: 0
              }
            }
          }
        ]
      }
    ]
  },
  {
    id: 'python',
    name: 'Python',
    slug: 'python',
    shortDescription: 'Sintaxe limpa e intuitiva, ideal para iniciantes, automação e inteligência artificial.',
    fullDescription: 'Aprenda a linguagem que conquistou a ciência de dados e automação moderna com sua legibilidade sem igual.',
    icon: '🐍',
    badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    accentColor: '#10b981',
    textColor: 'text-emerald-400',
    bgGradient: 'from-emerald-500/20 to-teal-500/5',
    levelLabel: 'Iniciante ao Intermediário',
    popularity: 96,
    modulesCount: 5,
    totalXp: 980,
    prerequisites: 'Nenhum conhecimento prévio',
    topics: ['print()', 'Indentação', 'Variáveis', 'Listas', 'Condicionais', 'Funções def'],
    modules: [
      {
        id: 'py-m1',
        trackId: 'python',
        title: 'Módulo 1: Primeiros Passos em Python',
        order: 1,
        description: 'Entenda a sintaxe limpa do Python e exiba seus primeiros resultados.',
        iconName: 'Terminal',
        xpReward: 120,
        lessons: [
          {
            id: 'py-l1',
            moduleId: 'py-m1',
            trackId: 'python',
            title: 'A Função print() e Strings',
            order: 1,
            estimatedMinutes: 3,
            xpReward: 30,
            summary: 'Aprenda o comando básico do Python para mostrar textos.',
            conceptIntro: {
              explanation: [
                'Em Python, imprimir algo na tela é tão direto quanto chamar `print("Texto")`.',
                'Não é necessário usar ponto e vírgula no final das linhas.',
                'O Python valoriza a simplicidade e a clareza visual.'
              ],
              keyPoints: [
                'print() é a função de saída em Python.',
                'Não precisa de ponto e vírgula (;).',
                'Textos ficam entre aspas simples ou duplas.'
              ]
            },
            codeExample: {
              title: 'Primeiro Código em Python',
              code: '# Isto é um comentário em Python\nprint("Olá, Explorador!")\nprint(42)',
              language: 'python',
              explanation: 'A função print() imprime qualquer texto ou número passado nos parênteses.',
              output: 'Olá, Explorador!\n42'
            },
            exercise: {
              id: 'ex-py-l1',
              type: 'fill-in-code',
              prompt: 'Complete o código para exibir a mensagem "Bem-vindo ao Python":',
              hints: ['A função de exibição em Python se chama print.'],
              explanationOnSuccess: 'Perfeito! Você começou sua jornada em Python com maestria.',
              explanationOnError: 'Verifique se a função print está escrita em letras minúsculas.',
              fillInCode: {
                codeTemplate: '{{blank_1}}("Bem-vindo ao Python")',
                blanks: [
                  { id: 'blank_1', expected: 'print', placeholder: 'funcao' }
                ],
                previewOutput: 'print("Bem-vindo ao Python")'
              }
            }
          },
          {
            id: 'py-l2',
            moduleId: 'py-m1',
            trackId: 'python',
            title: 'Indentação e Blocos de Código',
            order: 2,
            estimatedMinutes: 4,
            xpReward: 40,
            summary: 'Descubra a regra de ouro do Python: espaços definem blocos.',
            conceptIntro: {
              explanation: [
                'Diferente de outras linguagens que usam chaves `{}`, o Python usa a **indentação** (4 espaços).',
                'Todo código que pertence a uma condição ou função deve estar recuado para a direita.',
                'Uma indentação incorreta gera um erro do tipo `IndentationError`.'
              ],
              keyPoints: [
                'A indentação é obrigatória em Python.',
                'Geralmente usamos 4 espaços por nível de recuo.',
                'Dois pontos (:) indicam o início de um novo bloco.'
              ]
            },
            codeExample: {
              title: 'Indentação em Ação',
              code: 'nivel = 10\nif nivel >= 5:\n    print("Nível avançado atingido!")\n    print("Parabéns!")',
              language: 'python',
              explanation: 'As duas linhas com 4 espaços de recuo só rodam se a condição for verdadeira.',
              output: 'Nível avançado atingido!\nParabéns!'
            },
            exercise: {
              id: 'ex-py-l2',
              type: 'true-false',
              prompt: 'Em Python, o uso de chaves `{}` é obrigatório para definir blocos de código de um `if`?',
              hints: ['Lembre-se que o Python usa espaços (indentação) ao invés de chaves.'],
              explanationOnSuccess: 'Correto! Python utiliza indentação e dois pontos (:), dispensando o uso de chaves.',
              explanationOnError: 'Incorreto. Python não usa chaves para blocos de controle; usa indentação!',
              trueFalse: {
                statement: 'Python exige chaves `{}` em volta de blocos de controle.',
                isTrue: false,
                explanation: 'Python substitui as chaves tradicionais por indentação consistente (4 espaços).'
              }
            }
          }
        ]
      },
      {
        id: 'py-m2',
        trackId: 'python',
        title: 'Módulo 2: Funções em Python com def',
        order: 2,
        description: 'Aprenda a definir funções com a palavra-chave def.',
        iconName: 'Cpu',
        xpReward: 160,
        lessons: [
          {
            id: 'py-l3',
            moduleId: 'py-m2',
            trackId: 'python',
            title: 'Definindo Funções (def)',
            order: 1,
            estimatedMinutes: 5,
            xpReward: 50,
            summary: 'Crie suas próprias funções com a palavra-chave def.',
            conceptIntro: {
              explanation: [
                'Para criar uma função em Python, usamos a palavra `def` seguida pelo nome da função e parênteses.',
                'Terminamos a linha com dois pontos `:` e indentamos o corpo da função.',
                'O comando `return` devolve o resultado final.'
              ],
              keyPoints: [
                'def nome_funcao(parametros):',
                'O corpo da função é indentado com 4 espaços.',
                'return envia o resultado de volta para quem chamou.'
              ]
            },
            codeExample: {
              title: 'Função de Boas-Vindas',
              code: 'def saudar(nome):\n    return f"Olá, {nome}!"\n\nmensagem = saudar("Dev")\nprint(mensagem)',
              language: 'python',
              explanation: 'A função `saudar` formata uma string amigável e a retorna.',
              output: 'Olá, Dev!'
            },
            exercise: {
              id: 'ex-py-l3',
              type: 'fill-in-code',
              prompt: 'Complete a definição da função em Python:',
              hints: ['A palavra-chave para definir função em Python é def.'],
              explanationOnSuccess: 'Muito bem! Você definiu sua função em Python corretamente.',
              explanationOnError: 'Verifique se digitou `def` e colocou os dois pontos `:`.',
              fillInCode: {
                codeTemplate: '{{blank_1}} somar(a, b):\n    return a + b',
                blanks: [
                  { id: 'blank_1', expected: 'def', placeholder: 'palavra-chave' }
                ],
                previewOutput: 'def somar(a, b):\n    return a + b'
              }
            }
          }
        ]
      }
    ]
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    slug: 'typescript',
    shortDescription: 'JavaScript com superpoderes de tipagem estática para criar sistemas robustos e sem bugs.',
    fullDescription: 'Eleve suas habilidades de desenvolvimento web com a ferramenta padrão da indústria para código seguro.',
    icon: '🔷',
    badgeColor: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    accentColor: '#3b82f6',
    textColor: 'text-blue-400',
    bgGradient: 'from-blue-500/20 to-indigo-500/5',
    levelLabel: 'Intermediário',
    popularity: 91,
    modulesCount: 4,
    totalXp: 850,
    prerequisites: 'Conhecimento básico de JavaScript',
    topics: ['Tipos Básicos', 'Interfaces', 'Type Aliases', 'Union Types', 'Generics'],
    modules: [
      {
        id: 'ts-m1',
        trackId: 'typescript',
        title: 'Módulo 1: Tipagem Estática Essencial',
        order: 1,
        description: 'Evite bugs antes mesmo de rodar o código com anotações de tipos.',
        iconName: 'ShieldCheck',
        xpReward: 140,
        lessons: [
          {
            id: 'ts-l1',
            moduleId: 'ts-m1',
            trackId: 'typescript',
            title: 'Anotando Tipos Primitivos',
            order: 1,
            estimatedMinutes: 4,
            xpReward: 40,
            summary: 'Defina explicitamente se uma variável é string, number ou boolean.',
            conceptIntro: {
              explanation: [
                'No TypeScript, adicionamos dois pontos `:` após o nome da variável para especificar seu tipo.',
                'Se tentarmos colocar um valor incompatível (como um texto em um número), o editor nos avisa na hora.',
                'Isso evita 90% dos erros comuns de execução.'
              ],
              keyPoints: [
                'let idade: number = 25;',
                'let nome: string = "Ana";',
                'let ativo: boolean = true;'
              ]
            },
            codeExample: {
              title: 'Tipos Explícitos no TypeScript',
              code: 'let usuario: string = "Carlos";\nlet nivel: number = 3;\n\n// nivel = "ouro"; // ERRO: Type \'string\' is not assignable to type \'number\'.',
              language: 'typescript',
              explanation: 'O compilador impede que `nivel` receba uma string por engano.',
              output: 'Compilação limpa!'
            },
            exercise: {
              id: 'ex-ts-l1',
              type: 'fill-in-code',
              prompt: 'Adicione a anotação de tipo correta para uma variável que armazena a pontuação numérica:',
              hints: ['O tipo para números no TypeScript é number.'],
              explanationOnSuccess: 'Excelente! A variável agora está tipada com precisão.',
              explanationOnError: 'Verifique se usou a palavra `number`.',
              fillInCode: {
                codeTemplate: 'let score: {{blank_1}} = 1500;',
                blanks: [
                  { id: 'blank_1', expected: 'number', placeholder: 'tipo' }
                ],
                previewOutput: 'let score: number = 1500;'
              }
            }
          }
        ]
      }
    ]
  },
  {
    id: 'java',
    name: 'Java',
    slug: 'java',
    shortDescription: 'Linguagem corporativa ultra-confiável, base do desenvolvimento corporativo e Android nativo.',
    fullDescription: 'Aprenda os pilares da Orientação a Objetos com a tecnologia que move grandes bancos e empresas globais.',
    icon: '☕',
    badgeColor: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
    accentColor: '#f43f5e',
    textColor: 'text-rose-400',
    bgGradient: 'from-rose-500/20 to-orange-500/5',
    levelLabel: 'Iniciante ao Avançado',
    popularity: 88,
    modulesCount: 4,
    totalXp: 820,
    prerequisites: 'Nenhum conhecimento prévio',
    topics: ['public static void main', 'Tipos Fortes', 'Classes', 'Objetos', 'Métodos'],
    modules: [
      {
        id: 'java-m1',
        trackId: 'java',
        title: 'Módulo 1: Estrutura Base & Hello World',
        order: 1,
        description: 'Entenda como classes e métodos formam a estrutura do Java.',
        iconName: 'Layers',
        xpReward: 130,
        lessons: [
          {
            id: 'java-l1',
            moduleId: 'java-m1',
            trackId: 'java',
            title: 'A Estrutura de uma Classe Java',
            order: 1,
            estimatedMinutes: 5,
            xpReward: 40,
            summary: 'Conheça o método principal `main` e a impressão com `System.out.println`.',
            conceptIntro: {
              explanation: [
                'Em Java, todo código reside dentro de uma `class`.',
                'O ponto de entrada de todo programa executável é o método `public static void main(String[] args)`.',
                'Para imprimir mensagens no terminal, utilizamos `System.out.println()`.',
                'O ponto e vírgula `;` no final de cada instrução é estritamente obrigatório.'
              ],
              keyPoints: [
                'Tudo em Java está dentro de uma classe.',
                'System.out.println() imprime na tela com quebra de linha.',
                'Ponto e vírgula é obrigatório.'
              ]
            },
            codeExample: {
              title: 'Primeiro Programa em Java',
              code: 'public class Principal {\n    public static void main(String[] args) {\n        System.out.println("Olá, Java!");\n    }\n}',
              language: 'java',
              explanation: 'A classe `Principal` contém o método `main`, que executa o comando `System.out.println`.',
              output: 'Olá, Java!'
            },
            exercise: {
              id: 'ex-java-l1',
              type: 'multiple-choice',
              prompt: 'Qual comando em Java é equivalente ao `console.log()` do JavaScript para imprimir no console?',
              hints: ['Começa com System.out.'],
              explanationOnSuccess: 'Perfeito! `System.out.println` é o método padrão de saída de texto em Java.',
              explanationOnError: 'Lembre-se que em Java usamos a hierarquia System.out.println().',
              multipleChoice: {
                options: [
                  'System.out.println("Texto");',
                  'print("Texto");',
                  'echo("Texto");',
                  'Console.Write("Texto");'
                ],
                correctIndex: 0
              }
            }
          }
        ]
      }
    ]
  }
];
