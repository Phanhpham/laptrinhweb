import axios from "axios";

export const getFavoriteProduct = async (id) => {
  const response = await axios.get(
    ` http://localhost:8080/favorite?idUser=${id}`
  );
  return response.data;
};
export const postFavoriteProduct = async (data) => {
  const response = await axios.post(`http://localhost:8080/favorite`, data);
  return response.data;
};
export const deleteFavorite = async (id) => {
  await axios.delete(`http://localhost:8080/favorite/${id}`);
  return id;
};
