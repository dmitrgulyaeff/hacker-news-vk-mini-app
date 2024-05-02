import type {  TStory } from './types';
// Загрузить данные о конкретной новости по её ID
export const fetchNewsPost = async (id: number) => {
  try {
    const response = await fetch(
      `https://hacker-news.firebaseio.com/v0/item/${id}.json`
    );
    if (!response.ok) {
      throw new Error(`An error occurred: ${response.statusText}`);
    }
    const data = await response.json();
    return data as TStory;
  } catch (error) {
    console.error('Ошибка при получении новости:', error);
    throw error; 
  }
};

// Загрузить данные о пакете новостей, начиная с конкретного ID
export const fetchNewsPosts = async (ids: number[]) => {
  try {
    const posts = await Promise.all(ids.map(fetchNewsPost));
    return posts;
  } catch (error) {
    console.error('Ошибка при получении списка новостей:', error);
    throw error; 
  }
};
