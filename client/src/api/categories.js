import axios from "axios"

export const getCategory = async () => {
    const response = await axios.get(`http://localhost:8080/categories`);
    return response.data
}

export const addCategory = async (category) => {
    const response=await axios.post(`http://localhost:8080/categories`,category)
    return response.data
}

export const updateCategory = async (category) => {
    const response = await axios.put(`http://localhost:8080/categories/${category.id}`,category)
    return response.data
}

export const deleteCategory = async (id) => {
    await axios.delete(`http://localhost:8080/categories/${id}`)
    return id
}

export const searchCategory = async (search) => {
    const response = await axios.get(`http://localhost:8080/categories?name_like=${search}`);
    return response.data
}