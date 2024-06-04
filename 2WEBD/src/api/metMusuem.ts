import axios from 'axios';

const baseURL = 'https://collectionapi.metmuseum.org/public/collection/v1';

export const searchObjects = async (query: string) => {
  const response = await axios.get(`${baseURL}/search`, {
    params: { q: query }
  });
  return response.data;
};

export const getObjectDetails = async (objectId: number) => {
  const response = await axios.get(`${baseURL}/objects/${objectId}`);
  return response.data;
};

export const getHighlightObjects = async () => {
  // Assuming there is a specific endpoint or method to get highlight objects
  const response = await axios.get(`${baseURL}/objects/highlights`);
  return response.data;
};
