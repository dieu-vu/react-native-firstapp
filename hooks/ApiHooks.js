import {useState, useEffect} from 'react';
import {baseUrl} from '../utils/variables';

const useMedia = () => {
  const [mediaArray, setMediaArray] = useState([]);
  const loadMedia = async (start = 10, limit = 20) => {
    try {
      const res = await fetch(`${baseUrl}media?start=${start}&limit=${limit}`);
      if (!res.ok) {
        throw Error(res.statusText);
      }
      const json = await res.json();
      const media = await Promise.all(
        json.map(async (item) => {
          const response = await fetch(baseUrl + 'media/' + item.file_id);
          const mediaData = await response.json();
          return mediaData;
        })
      );
      setMediaArray(media);
      console.log(mediaArray);
    } catch (error) {
      console.error();
    }
  };

  useEffect(() => {
    loadMedia(10, 20);
  }, []);

  return {mediaArray};
};

export {useMedia};
