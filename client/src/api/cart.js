import axios from "axios";

export const getCartById = async (id) => {
  const response = await axios.get(`http://localhost:8080/cart?idUser=${id}`);
  return response.data;
};

export const addToCart = async (data) => {
  const response = await axios.post(`http://localhost:8080/cart`, data);
  return response.data;
};

export const updateCartQuantity = async (data) => {
  const response = await axios.patch(
    `http://localhost:8080/cart/${data.id}`,
    data
  );
  return response.data;
};
export const changeQuantity = async ({ itemId, quantity }) => {
  const response = await axios.get(`http://localhost:8080/cart/${itemId}`);
  console.log(response.data);

  const existingCart = response.data;

  const updateProduct = {
    ...existingCart.product,
    quantity: quantity,
  };

  const updateCartItem = {
    ...existingCart,
    product: updateProduct,
  };

  await axios.patch(`http://localhost:8080/cart/${itemId}`, updateCartItem);
  return updateCartItem;
};
export const deleteCart = async (id) => {
  await axios.delete(`http://localhost:8080/cart/${id}`);
  return id;
};

