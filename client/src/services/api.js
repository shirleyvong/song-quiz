import axios from 'axios';

const search = async (query) => {
  const { data } = await axios.get(`/api/search/${query}`);
  return data;
};

const getTracks = async (id) => {
  const { data } = await axios.get(`/api/tracks/${id}`);
  return data;
};

export default {
  search,
  getTracks,
};
