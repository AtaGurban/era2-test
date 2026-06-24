import type { GenerationTask } from './types';

/**
 * Стартовый набор из 50 задач в разных статусах,
 * чтобы при загрузке экран был «живым».
 */
const initialTasks: GenerationTask[] = [
  // ── running (2 шт — ровно MAX_CONCURRENT) ──
  {
    id: 'task-1',
    genType: 'image',
    prompt: 'Космический кот в скафандре на фоне Сатурна, digital art',
    model: 'Midjourney v6',
    status: 'running',
    progress: 42,
    credits: 5,
    createdAt: Date.now() - 120_000,
    startedAt: Date.now() - 60_000,
    estimatedDuration: 8_000,
  },
  {
    id: 'task-2',
    genType: 'text',
    prompt: 'Напиши пошаговый рецепт тирамису на русском языке с подробным описанием каждого этапа',
    model: 'GPT-4o',
    status: 'running',
    progress: 78,
    credits: 2,
    createdAt: Date.now() - 150_000,
    startedAt: Date.now() - 45_000,
    estimatedDuration: 4_000,
  },

  // ── queued (3 шт) ──
  {
    id: 'task-3',
    genType: 'video',
    prompt: 'Таймлапс заката над горами, кинематографичное освещение, 4K',
    model: 'Sora',
    status: 'queued',
    progress: 0,
    credits: 15,
    createdAt: Date.now() - 90_000,
    estimatedDuration: 25_000,
  },
  {
    id: 'task-4',
    genType: 'audio',
    prompt: 'Lo-fi хип-хоп бит для учёбы, мягкие клавиши и виниловый шум',
    model: 'Suno v3',
    status: 'queued',
    progress: 0,
    credits: 8,
    createdAt: Date.now() - 80_000,
    estimatedDuration: 18_000,
  },
  {
    id: 'task-5',
    genType: 'image',
    prompt: 'Минималистичный логотип кофейни, вектор, тёплые тона',
    model: 'DALL·E 3',
    status: 'queued',
    progress: 0,
    credits: 4,
    createdAt: Date.now() - 70_000,
    estimatedDuration: 7_000,
  },

  // ── done (3 шт) ──
  {
    id: 'task-6',
    genType: 'text',
    prompt: 'Объясни квантовую запутанность простыми словами',
    model: 'Claude 3.5',
    status: 'done',
    progress: 100,
    credits: 1,
    createdAt: Date.now() - 300_000,
    startedAt: Date.now() - 290_000,
    completedAt: Date.now() - 285_000,
    estimatedDuration: 3_000,
  },
  {
    id: 'task-7',
    genType: 'image',
    prompt: 'Акварельный портрет рыжего кота, белый фон',
    model: 'Stable Diffusion XL',
    status: 'done',
    progress: 100,
    credits: 3,
    createdAt: Date.now() - 350_000,
    startedAt: Date.now() - 340_000,
    completedAt: Date.now() - 332_000,
    estimatedDuration: 8_000,
  },
  {
    id: 'task-8',
    genType: 'text',
    prompt: 'Переведи на английский: «Утро вечера мудренее»',
    model: 'GPT-4o',
    status: 'done',
    progress: 100,
    credits: 1,
    createdAt: Date.now() - 400_000,
    startedAt: Date.now() - 395_000,
    completedAt: Date.now() - 393_000,
    estimatedDuration: 2_000,
  },

  // ── failed (1 шт) ──
  {
    id: 'task-9',
    genType: 'video',
    prompt: 'Анимация логотипа: буквы собираются из частиц',
    model: 'Runway Gen-2',
    status: 'failed',
    progress: 34,
    error: 'Модель временно недоступна',
    credits: 12,
    createdAt: Date.now() - 250_000,
    startedAt: Date.now() - 240_000,
    completedAt: Date.now() - 230_000,
    estimatedDuration: 20_000,
  },

  // ── canceled (1 шт) ──
  {
    id: 'task-10',
    genType: 'audio',
    prompt: 'Озвучка текста мужским голосом, русский, нейтральная интонация',
    model: 'ElevenLabs',
    status: 'canceled',
    progress: 12,
    credits: 6,
    createdAt: Date.now() - 200_000,
    startedAt: Date.now() - 190_000,
    completedAt: Date.now() - 185_000,
    estimatedDuration: 15_000,
  },
];

const types: GenerationTask['genType'][] = ['image', 'text', 'video', 'audio'];
const models = ['Midjourney v6', 'GPT-4o', 'Sora', 'Suno v3', 'DALL·E 3', 'Claude 3.5', 'Stable Diffusion XL', 'Runway Gen-2', 'ElevenLabs'];
const prompts = [
  'Киберпанк город будущего, дождь, неоновые вывески',
  'Напиши стихотворение про осень',
  'Создай бит в стиле синтвейв',
  'Видео полета над каньоном',
  'Генерация 3D модели автомобиля',
  'Рецепт веганского бургера',
  'Перевод статьи на испанский',
  'Озвучка рекламного ролика',
  'Создание логотипа для IT компании',
  'Анимация загрузки'
];

const generatedTasks: GenerationTask[] = Array.from({ length: 40 }).map((_, i) => {
  const genType = types[i % types.length];
  const model = models[i % models.length];
  const prompt = prompts[i % prompts.length] + ` (Вариация ${i + 1})`;
  const statusBase = i % 10;
  
  let status: GenerationTask['status'];
  let progress: number | undefined;
  let error: string | undefined;

  if (statusBase < 5) {
    status = 'done';
    progress = 100;
  } else if (statusBase < 8) {
    status = 'queued';
    progress = 0;
  } else if (statusBase === 8) {
    status = 'failed';
    progress = Math.floor(Math.random() * 80) + 10;
    error = 'Слишком долгий ответ от сервера';
  } else {
    status = 'canceled';
    progress = Math.floor(Math.random() * 50) + 5;
  }

  const createdAt = Date.now() - Math.floor(Math.random() * 1000000) - 600_000;
  let startedAt: number | undefined;
  let completedAt: number | undefined;

  if (status !== 'queued') {
    startedAt = createdAt + 10_000 + Math.floor(Math.random() * 20_000);
  }
  if (status === 'done' || status === 'failed' || status === 'canceled') {
    completedAt = (startedAt || createdAt) + 20_000 + Math.floor(Math.random() * 50_000);
  }

  return {
    id: `task-${11 + i}`,
    genType,
    prompt,
    model,
    status,
    progress,
    credits: Math.floor(Math.random() * 15) + 1,
    createdAt,
    ...(startedAt && { startedAt }),
    ...(completedAt && { completedAt }),
    ...(error && { error }),
    estimatedDuration: Math.floor(Math.random() * 20000) + 5000,
  };
});

export const seedTasks: GenerationTask[] = [...initialTasks, ...generatedTasks];
