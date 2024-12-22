import { addProduct, deleteProduct, getAllProduct, getDetailProduct, searchProduct, sortProduct, sortProductPrice, updateProduct } from "@/api/product"


export const products={
    state:{
        products:[],
        productById:{}

    },
    mutations:{
        setProduct:(state,payload)=>{
            state.products=payload;
            console.log(payload);
        },
        addProduct: (state, payload) => {
            state.products.push(payload)
        },
        setDetailProduct:(state,payload)=>{
            state.productById=payload;
            console.log(124,payload);
            
        },
        setSearch:(state,payload)=>{
            state.products=payload;
            console.log(34567,payload);
            
        },
        sortItem:(state,payload)=>{
            state.products = payload;
        },
        sortPriceItem:(state,payload)=>{
            state.products = payload;
        },
        changeItem:(state,payload)=>{
            const findIndex=state.products.findIndex((items)=>
                items.id=payload.id
            )
            if(findIndex!==-1){
                state.products[findIndex]=payload;
            }
        },
        deleteItem:(state,payload)=>{
            state.products=state.products.filter((items)=>
                items.id!== payload
            )
        },
        addItem:(state,payload)=>{
            state.products.push(payload)
        }
    },
    actions:{
        getProduct: async({commit})=>{
            const response=await getAllProduct();
            commit("setProduct",response)
        },
        addProduct: async ({commit}, product) => {
            const response = await addProduct(product);
            commit("addProduct", response)
        },
        getDetail:async({commit},id)=>{
            const response=await getDetailProduct(id);
            commit("setDetailProduct",response)
        },
        searchProduct:async({commit},name)=>{
            const response = await searchProduct(name);
            commit("setSearch",response)
        },
        sortProduct:async ({commit},name) => {
            const response=await sortProduct(name);
            commit("sortItem",response)
        },
        sortPrice:async ({commit},price) => {
            const response = await sortProductPrice(price);
            commit("sortPriceItem",response)
        },
        updateItem:async ({commit},product) => {
            const response =await updateProduct(product);
            commit("changeItem",response)
        },
        deleteProducts:async ({commit},id) => {
            const response=await deleteProduct(id);
            commit("deleteItem",response)
        },
        addProduct:async ({commit},product) => {
            const response=await addProduct(product);
            commit ("addItem",response)
        }

    }
}