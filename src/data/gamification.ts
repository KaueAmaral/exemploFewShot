import { Achievement, DailyQuest, StandaloneChallenge } from '../types';

export const INITIAL_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first_code',
    title: 'Primeiro Código',
    description: 'Complete com sucesso sua primeiríssima lição interativa.',
    icon: '⚡',
    category: 'progress',
    xpBonus: 50,
    targetValue: 1,
    currentValue: 0,
    isUnlocked: false
  },
  {
    id: 'streak_3',
    title: 'Hábito de Ferro (3 Dias)',
    description: 'Mantenha sua sequência diária de estudos ativa por 3 dias.',
    icon: '🔥',
    category: 'streak',
    xpBonus: 100,
    targetValue: 3,
    currentValue: 1,
    isUnlocked: false
  },
  {
    id: 'streak_7',
    title: 'Mestre da Consistência (7 Dias)',
    description: 'Estude durante uma semana completa sem perder o ritmo.',
    icon: '🏆',
    category: 'streak',
    xpBonus: 250,
    targetValue: 7,
    currentValue: 1,
    isUnlocked: false
  },
  {
    id: 'bug_hunter',
    title: 'Caçador de Bugs',
    description: 'Identifique e corrija 3 erros de código em desafios práticos.',
    icon: '🐛',
    category: 'challenges',
    xpBonus: 120,
    targetValue: 3,
    currentValue: 0,
    isUnlocked: false
  },
  {
    id: 'syntax_ninja',
    title: 'Ninja da Sintaxe',
    description: 'Acerte 5 desafios de código seguidos com 100% de precisão.',
    icon: '🎯',
    category: 'mastery',
    xpBonus: 150,
    targetValue: 5,
    currentValue: 0,
    isUnlocked: false
  },
  {
    id: 'module_master',
    title: 'Fundamentos Concluídos',
    description: 'Conclua todos os exercícios do Módulo 1 de qualquer linguagem.',
    icon: '🎓',
    category: 'progress',
    xpBonus: 200,
    targetValue: 3,
    currentValue: 0,
    isUnlocked: false
  },
  {
    id: 'polyglot',
    title: 'Poliglota do Código',
    description: 'Inicie lições em pelo menos 2 linguagens diferentes.',
    icon: '🌐',
    category: 'special',
    xpBonus: 180,
    targetValue: 2,
    currentValue: 1,
    isUnlocked: false
  },
  {
    id: 'xp_500',
    title: 'Centelha de XP',
    description: 'Acumule um total de 500 XP em sua jornada.',
    icon: '💎',
    category: 'progress',
    xpBonus: 100,
    targetValue: 500,
    currentValue: 0,
    isUnlocked: false
  }
];

export const INITIAL_DAILY_QUESTS: DailyQuest[] = [
  {
    id: 'quest_1',
    title: 'Ritmo Diário',
    description: 'Complete 2 lições hoje para manter o foco afiado.',
    xpReward: 60,
    gemsReward: 15,
    target: 2,
    progress: 0,
    isCompleted: false,
    isClaimed: false,
    type: 'complete_lesson'
  },
  {
    id: 'quest_2',
    title: 'Desafio na Arena',
    description: 'Resolva 1 desafio interativo na Arena de Códigos.',
    xpReward: 50,
    gemsReward: 10,
    target: 1,
    progress: 0,
    isCompleted: false,
    isClaimed: false,
    type: 'solve_challenge'
  },
  {
    id: 'quest_3',
    title: 'Coletor de XP',
    description: 'Acumule 100 XP hoje completando atividades.',
    xpReward: 80,
    gemsReward: 20,
    target: 100,
    progress: 0,
    isCompleted: false,
    isClaimed: false,
    type: 'earn_xp'
  }
];

export const STANDALONE_CHALLENGES: StandaloneChallenge[] = [
  {
    id: 'ch-1',
    title: 'Encontre o Bug na Concatenação',
    difficulty: 'Iniciante',
    category: 'Bugs',
    trackId: 'javascript',
    xpReward: 50,
    timeEstimate: '2 min',
    description: 'Descubra por que a mensagem de boas-vindas está saindo quebrada.',
    exercise: {
      id: 'ex-ch-1',
      type: 'find-bug',
      prompt: 'Qual linha contém o erro que impede a exibição correta do nome?',
      hints: ['Preste atenção no fechamento de aspas e no operador +.'],
      explanationOnSuccess: 'Excelente! A linha 2 esqueceu de fechar a aspa antes do operador de concatenação.',
      explanationOnError: 'Analise a forma como a variável `nome` foi combinada com a mensagem.',
      findBug: {
        code: '1: const nome = "Dev";\n2: const msg = "Olá, " + nome;\n3: console.log(msg);',
        buggyLineIndex: 1,
        options: [
          { label: 'Linha 1: Faltou declarar let em vez de const', isCorrect: false },
          { label: 'Linha 2: Sintaxe válida de concatenação', isCorrect: true },
          { label: 'Linha 3: console.log não aceita variáveis', isCorrect: false }
        ],
        bugExplanation: 'Na verdade a concatenação com `+` é o modo clássico, e esta linha está correta.'
      }
    }
  },
  {
    id: 'ch-2',
    title: 'Calculadora de Frete Rápido',
    difficulty: 'Iniciante',
    category: 'Lógica',
    trackId: 'javascript',
    xpReward: 60,
    timeEstimate: '3 min',
    description: 'Complete o código que decide se o frete é grátis para compras acima de R$ 100.',
    exercise: {
      id: 'ex-ch-2',
      type: 'fill-in-code',
      prompt: 'Preencha a condição para frete grátis se o valor for maior ou igual a 100:',
      hints: ['Use o operador >=.'],
      explanationOnSuccess: 'Perfeito! Se compra >= 100, o frete é 0.',
      explanationOnError: 'Verifique se usou o operador `>=`.',
      fillInCode: {
        codeTemplate: 'const total = 150;\nlet frete = 20;\n\nif (total {{blank_1}} 100) {\n  frete = {{blank_2}};\n}',
        blanks: [
          { id: 'blank_1', expected: '>=', placeholder: 'operador' },
          { id: 'blank_2', expected: '0', placeholder: 'valor' }
        ],
        previewOutput: 'if (total >= 100) { frete = 0; }'
      }
    }
  },
  {
    id: 'ch-3',
    title: 'Desafio do Par ou Ímpar',
    difficulty: 'Intermediário',
    category: 'Algoritmos',
    trackId: 'javascript',
    xpReward: 75,
    timeEstimate: '4 min',
    description: 'Utilize o operador módulo `%` para descobrir se um número é divisível por 2.',
    exercise: {
      id: 'ex-ch-3',
      type: 'multiple-choice',
      prompt: 'Qual expressão em JavaScript testa se a variável `num` é estritamente um número par?',
      hints: ['O resto da divisão por 2 deve ser igual a 0.'],
      explanationOnSuccess: 'Brilhante! `num % 2 === 0` verifica se o resto da divisão por 2 é zero.',
      explanationOnError: 'Lembre-se: o operador de resto é `%`, e o resultado para pares é `0`.',
      multipleChoice: {
        options: [
          'num % 2 === 0',
          'num / 2 === 0',
          'num.isEven()',
          'num == 2.0'
        ],
        correctIndex: 0
      }
    }
  },
  {
    id: 'ch-4',
    title: 'Ordenação de Algoritmo de Busca',
    difficulty: 'Intermediário',
    category: 'Algoritmos',
    trackId: 'javascript',
    xpReward: 80,
    timeEstimate: '3 min',
    description: 'Ordene a sequência lógica correta de uma verificação em loop.',
    exercise: {
      id: 'ex-ch-4',
      type: 'order-blocks',
      prompt: 'Organize os blocos para criar um loop `for` que conta de 0 a 4:',
      hints: ['A inicialização vem primeiro, depois a condição < 5, depois o incremento ++.'],
      explanationOnSuccess: 'Excelente! A estrutura clássica do loop `for` foi montada com sucesso.',
      explanationOnError: 'A ordem correta é: for (let i = 0; -> i < 5; -> i++) { -> console.log(i); }',
      orderBlocks: {
        blocks: [
          { id: 'ob-1', text: 'for (let i = 0;', correctPosition: 0 },
          { id: 'ob-2', text: 'i < 5;', correctPosition: 1 },
          { id: 'ob-3', text: 'i++) {', correctPosition: 2 },
          { id: 'ob-4', text: 'console.log(i); }', correctPosition: 3 }
        ],
        resultExplanation: 'Este loop conta de 0 até 4 e exibe cada número.'
      }
    }
  },
  {
    id: 'ch-5',
    title: 'Sandbox: Saudação Personalizada',
    difficulty: 'Iniciante',
    category: 'Sintaxe',
    trackId: 'javascript',
    xpReward: 70,
    timeEstimate: '3 min',
    description: 'Escreva um código que cria a constante `nome` e imprime `Olá Dev`.',
    exercise: {
      id: 'ex-ch-5',
      type: 'code-sandbox',
      prompt: 'Crie uma variável `nome = "Dev"` e imprima no console `Olá Dev`:',
      hints: ['Use `const nome = "Dev";` e `console.log("Olá " + nome);`'],
      explanationOnSuccess: 'Incrível! Seu código rodou perfeitamente e produziu o output esperado.',
      explanationOnError: 'Verifique se a saída do console exibe exatamente "Olá Dev".',
      codeSandbox: {
        starterCode: 'const nome = "Dev";\n\n// Escreva o console.log abaixo:\nconsole.log("Olá " + nome);',
        expectedOutput: 'Olá Dev',
        expectedKeywords: ['nome', 'console.log']
      }
    }
  }
];

export const LEVEL_TITLES = [
  { level: 1, title: 'Aprendiz do Código', minXp: 0, maxXp: 150 },
  { level: 2, title: 'Explorador da Sintaxe', minXp: 150, maxXp: 350 },
  { level: 3, title: 'Construtor de Lógica', minXp: 350, maxXp: 650 },
  { level: 4, title: 'Desenvolvedor Ágil', minXp: 650, maxXp: 1050 },
  { level: 5, title: 'Engenheiro Mestre', minXp: 1050, maxXp: 1600 },
  { level: 6, title: 'Arquiteto de Software', minXp: 1600, maxXp: 2300 },
  { level: 7, title: 'Lenda do Código', minXp: 2300, maxXp: 99999 }
];
