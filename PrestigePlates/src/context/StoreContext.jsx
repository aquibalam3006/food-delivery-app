import { createContext, useEffect, useState } from "react";
import axios from "axios";
export const StoreContext = createContext(null)



const StoreContextProvider = (props) => {

    const [cartItems, setCartItems] = useState({});
    const clearCart = () => {
        setCartItems({});
    };
    const url = "http://localhost:4000 || https://food-delivery-app-lg9f.onrender.com/"
    const [token, setToken] = useState("");
    const [food_list, setFoodList] = useState([])



    // Add item to cart if it doesn't exist, otherwise increment count
    const addToCart = async (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }))
        }
        else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
        }
        if (token) {
            await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } })
        }
    }

    // Remove item from cart 
    const removeFromCart = async (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
        if (token) {
            await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } })
        }
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = food_list.find((product) => product._id === item);
                totalAmount += itemInfo.price * cartItems[item];
            }
        }
        return totalAmount;
    }



    // fetch food list
    const fetchFoodList = async () => {
        const response = await axios.get(url + "/api/food/list");
        setFoodList(response.data.data)
    }


    const loadCartData = async (token) => {
        const response = await axios.post(url + "/api/cart/get", {}, { headers: { token } });
        setCartItems(response.data.cartData);
    }




    useEffect(() => {
        async function loadData() {
            await fetchFoodList();

            if (localStorage.getItem("token")) {
                const savedToken = localStorage.getItem("token");
                setToken(savedToken);
            }
        }
        loadData();
    }, [])







    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken,
        clearCart

    }




    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;