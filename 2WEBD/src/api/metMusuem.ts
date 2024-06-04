// src/api/metAPI.ts
const BASE_URL = 'https://collectionapi.metmuseum.org/public/collection/v1';

export const searchObjects = async (query: string) => {
  const response = await fetch(`${BASE_URL}/search?q=${query}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const getObjectDetails = async (objectID: number) => {
  const response = await fetch(`${BASE_URL}/objects/${objectID}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const getHighlightObjects = async (id: number) => {
  const response = await fetch(`${BASE_URL}/search?hasImages=true&q=${id}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};
