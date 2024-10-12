import axios from "axios";
const API_KEY = "PuuHKel0RduuGBJYJERxtCJe3fEBPcbKypb_-oMyvGg";

axios.defaults.baseURL = "https://api.unsplash.com/";

export const fetchImages = async (query, page) => {
  const options = {
    params: {
      query: query,
      page: page,
      per_page: 12, // Количество изображений на страницу
      orientation: "landscape",
    },
    headers: {
      Authorization: `Client-ID ${API_KEY}`, // Передача API ключа в заголовке
    },
  };

  const response = await axios.get(`/search/photos`, options);
  return response.data.results;
};
