import axios from "axios"

export const getAllProduct =async ()=>{
    const allProduct=await axios.get("http://localhost:8080/products");
    return allProduct.data;
}

export const getDetailProduct =async (id) => {
    const response =await axios.get(` http://localhost:8080/products/${id}`);
    return response.data

}

export const searchProduct = async (name)=>{
    const response = await axios.get(`http://localhost:8080/products?name_like=${name}`);
    return response.data
}
export const sortProduct = async (name) => {
    const response = await axios.get(`http://localhost:8080/products?_sort=name&_order=${name}`)
    return response.data
}
export const sortProductPrice = async (price) => {
    const response = await axios.get(`http://localhost:8080/products?_sort=price&_order=${price}`)
    return response.data
}
export const updateProduct = async (product) => {
    const response = await axios.put(`http://localhost:8080/products/${product.id}`,product)
    return response.data
}
export const deleteProduct = async (id) => {
    const response=await axios.delete(`http://localhost:8080/products/${id}`)
    return id
}
export const addProduct = async (product) => {
    const response=await axios.post(`http://localhost:8080/products`,product)
    return response.data
}