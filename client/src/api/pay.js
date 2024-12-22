import axios from "axios"

export const addOrder =async (data) => {
    const response=await axios.post("http://localhost:8080/orders",data);
    return response.data;
}
export const getOrder = async(id)=>{
    const response = await axios.get(`http://localhost:8080/orders?idUser=${id}`);
    return response.data;

}