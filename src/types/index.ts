export type ExerciseType = 
  | 'multiple-choice'
  | 'fill-in-code'
  | 'find-bug'
  | 'order-blocks'
  | 'code-sandbox'
  | 'true-false';

export interface MultipleChoiceData {
  options: string[];
  correctIndex: number;
}

export interface FillInBlank {
  id: string;
  expected: string;
  placeholder?: string;
}

export interface FillInCodeData {
  codeTemplate: string; // contains {{blank_1}}, {{blank_2}}
  blanks: FillInBlank[];
  previewOutput?: string;
}

export interface BugLine {
  lineNumber: number;
  code: string;
  isBug: boolean;
  fixExplanation: string;
}

export interface FindBugData {
  code: string;
  buggyLineIndex: number; // 0-based
  options: { label: string; isCorrect: boolean }[];
  bugExplanation: string;
}

export interface OrderBlockItem {
  id: string;
  text: string;
  correctPosition: number; // 0-based index
}

export interface OrderBlocksData {
  blocks: OrderBlockItem[];
  resultExplanation: string;
}

export interface CodeSandboxData {
  starterCode: string;
  solutionHint?: string;
  expectedOutput: string;
  expectedKeywords?: string[];
  validationFunction?: string; // name or JS evaluation check
}

export interface TrueFalseData {
  statement: string;
  codeSnippet?: string;
  isTrue: boolean;
  explanation: string;
}

export interface Exercise {
  id: string;
  type: ExerciseType;
  prompt: string;
  hints: string[];
  explanationOnSuccess: string;
  explanationOnError: string;
  // Specific data payloads
  multipleChoice?: MultipleChoiceData;
  fillInCode?: FillInCodeData;
  findBug?: FindBugData;
  orderBlocks?: OrderBlocksData;
  codeSandbox?: CodeSandboxData;
  trueFalse?: TrueFalseData;
}

export interface Lesson {
  id: string;
  moduleId: string;
  trackId: string;
  title: string;
  order: number;
  estimatedMinutes: number;
  xpReward: number;
  summary: string;
  conceptIntro: {
    explanation: string[];
    keyPoints: string[];
    syntaxNotes?: string;
  };
  codeExample: {
    title: string;
    code: string;
    language: string;
    explanation: string;
    output?: string;
  };
  exercise: Exercise;
}

export interface Module {
  id: string;
  trackId: string;
  title: string;
  order: number;
  description: string;
  iconName: string;
  xpReward: number;
  lessons: Lesson[];
}

export interface LanguageTrack {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  icon: string;
  badgeColor: string;
  accentColor: string;
  textColor: string;
  bgGradient: string;
  levelLabel: string;
  popularity: number;
  modulesCount: number;
  totalXp: number;
  prerequisites: string;
  topics: string[];
  modules: Module[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'progress' | 'mastery' | 'streak' | 'challenges' | 'special';
  xpBonus: number;
  targetValue: number;
  currentValue: number;
  isUnlocked: boolean;
  unlockedAt?: string;
}

export interface DailyQuest {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  gemsReward: number;
  target: number;
  progress: number;
  isCompleted: boolean;
  isClaimed: boolean;
  type: 'complete_lesson' | 'solve_challenge' | 'earn_xp' | 'streak_day';
}

export interface StandaloneChallenge {
  id: string;
  title: string;
  difficulty: 'Iniciante' | 'Intermediário' | 'Avançado';
  category: 'Lógica' | 'Sintaxe' | 'Bugs' | 'Algoritmos';
  trackId: string;
  xpReward: number;
  timeEstimate: string;
  description: string;
  exercise: Exercise;
  isCompleted?: boolean;
}

export interface UserStats {
  xp: number;
  level: number;
  levelTitle: string;
  gems: number;
  streak: number;
  lastActiveDate: string;
  completedLessonIds: string[];
  completedChallengeIds: string[];
  unlockedAchievementIds: string[];
  claimedQuestIds: string[];
  activeTrackId: string;
  userName: string;
  avatar: string;
  joinedDate: string;
  dailyStreakHistory: { [dateStr: string]: boolean };
  weeklyXp: { day: string; xp: number }[];
  accuracyRate: number;
  totalExercisesAnswered: number;
  correctAnswersCount: number;
}

export type ViewMode = 
  | 'landing'
  | 'dashboard'
  | 'tracks'
  | 'trail'
  | 'lesson'
  | 'challenges'
  | 'achievements'
  | 'progress'
  | 'profile';
