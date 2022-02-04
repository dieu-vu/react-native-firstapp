import {useState, useEffect, useContext} from 'react';
import {MainContext} from '../contexts/MainContext';
import {appID, baseUrl} from '../utils/variables';

const doFetch = async (url, options) => {
  try {
    const response = await fetch(url, options);
    const json = await response.json();
    if (response.ok) {
      return json;
    } else {
      throw new Error(
        json.error
          ? `${json.message} : ${json.error}`
          : json.message || response.statusText
      );
    }
  } catch (e) {
    throw new Error(e.message);
  }
};

const useMedia = () => {
  const [mediaArray, setMediaArray] = useState([]);
  const [loading, setLoading] = useState(false);
  const {update} = useContext(MainContext);
  const loadMedia = async (start = 10, limit = 20) => {
    setLoading(true);
    try {
      // const res = await fetch(`${baseUrl}tags/${appID}`);
      // if (!res.ok) {
      //   throw Error(res.statusText);
      // }
      const json = await useTag().getFilesByTag(appID);
      const media = await Promise.all(
        json.map(async (item) => {
          const response = await fetch(baseUrl + 'media/' + item.file_id);
          const mediaData = await response.json();
          return mediaData;
        })
      );
      setMediaArray(media);
      // media && setLoading(false);
    } catch (error) {
      console.error();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMedia(0, 5);
  }, [update]);

  const postMedia = async (formData, token) => {
    setLoading(true);
    const options = {
      method: 'POST',
      headers: {
        'x-access-token': token,
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    };
    const result = await doFetch(baseUrl + 'media', options);
    result && setLoading(false);
    return result;
  };
  return {mediaArray, postMedia, loading};
};

const useLogin = () => {
  const postLogin = async (userCredentials) => {
    // user credentials format: {username: 'someUsername', password: 'somePassword'}
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userCredentials),
    };
    return await doFetch(baseUrl + 'login', options);
  };

  return {postLogin};
};

const useUser = () => {
  const getUserByToken = async (token) => {
    const options = {
      method: 'GET',
      headers: {'x-access-token': token},
    };
    return await doFetch(baseUrl + 'users/user', options);
  };
  const postUser = async (data) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    return await doFetch(baseUrl + 'users', options);
  };

  const checkUserName = async (username) => {
    const result = await doFetch(`${baseUrl}users/username/${username}`);
    return result.available;
  };

  const putUser = async (data, token) => {
    const options = {
      method: 'PUT',
      headers: {'Content-Type': 'application/json', 'x-access-token': token},
      body: JSON.stringify(data),
    };
    return await doFetch(`${baseUrl}users`, options);
  };

  return {getUserByToken, postUser, checkUserName, putUser};
};

const useTag = () => {
  const postTag = async (tagData, token) => {
    const options = {
      method: 'POST',
      headers: {'Content-Type': 'application/json', 'x-access-token': token},
      body: JSON.stringify(tagData),
    };
    return await doFetch(`${baseUrl}tags/`, options);
  };

  const getFilesByTag = async (tag) => {
    return await doFetch(`${baseUrl}tags/${tag}`);
  };
  return {postTag, getFilesByTag};
};
export {useMedia, useLogin, useUser, useTag};
