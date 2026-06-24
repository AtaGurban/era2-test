import type { GenType } from "@/entities/generation-task";

export const getTypeName = (type: GenType) => {
  switch (type) {
    case 'image': return 'Генерация изображения';
    case 'video': return 'Генерация видео';
    case 'text': return 'Генерация текста';
    case 'audio': return 'Генерация аудио';
    default: return 'Генерация';
  }
};

export const getPlural = (count: number, words: string[]) => {
  const cases = [2, 0, 1, 1, 1, 2];
  return words[(count % 100 > 4 && count % 100 < 20) ? 2 : cases[(count % 10 < 5) ? count % 10 : 5]];
};
