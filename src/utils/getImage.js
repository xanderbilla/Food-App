import { Storage } from 'aws-amplify';

export const getImage = async (imageKey) => {
  try {
    const image = await Storage.get(imageKey, { level: 'public' });
    return image;
  } catch (error) {
    console.log('Error retrieving image:', error);
    return null;
  }
};