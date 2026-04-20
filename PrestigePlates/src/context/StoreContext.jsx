import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

    const [cartItems, setCartItems] = useState({});
    const [token, setToken] = useState("");
    const [food_list, setFoodList] = useState([]);

    const url =
        window.location.hostname === "localhost"
            ? "http://localhost:4000"
            : "https://food-delivery-app-lg9f.onrender.com";


    // ✅ SAFE CART LOAD (FIXED)
    useEffect(() => {
        const savedCart = localStorage.getItem("cart");

        if (savedCart && savedCart !== "undefined") {
            try {
                setCartItems(JSON.parse(savedCart));
            } catch (error) {
                console.log("Cart parse error:", error);
                setCartItems({});
            }
        }
    }, []);


    const clearCart = () => {
        setCartItems({});
    };


    // ✅ ADD TO CART
    const addToCart = async (itemId) => {

        if (!token) {
            alert("Please login first 🔐");
            return;
        }

        setCartItems((prev) => ({
            ...prev,
            [itemId]: prev[itemId] ? prev[itemId] + 1 : 1
        }));

        await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } });
    };


    // ✅ REMOVE FROM CART
    const removeFromCart = async (itemId) => {

        if (!token) {
            alert("Please login first 🔐");
            return;
        }

        setCartItems((prev) => ({
            ...prev,
            [itemId]: prev[itemId] - 1
        }));

        await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } });
    };


    // ✅ TOTAL AMOUNT SAFE
    const getTotalCartAmount = () => {
        let totalAmount = 0;

        for (const item in cartItems || {}) {
            if (cartItems[item] > 0) {
                let itemInfo = food_list.find((product) => product._id === item);
                if (itemInfo) {
                    totalAmount += itemInfo.price * cartItems[item];
                }
            }
        }

        return totalAmount;
    };


    // ✅ FETCH FOOD
    const fetchFoodList = async () => {
        try {
            const response = await axios.get(url + "/api/food/list");
            setFoodList(response.data.data);
        } catch (error) {
            console.log("Food API Error:", error);
        }
    };


    // ✅ LOAD CART FROM BACKEND
    const loadCartData = async (token) => {
        try {
            const response = await axios.post(
                url + "/api/cart/get",
                {},
                { headers: { token } }
            );

            // ✅ IMPORTANT FIX
            if (response.data.cartData && Object.keys(response.data.cartData).length > 0) {
                setCartItems(response.data.cartData);
            }

        } catch (error) {
            console.log("Cart load error:", error);
        }
    };


    // ✅ MAIN LOAD
    useEffect(() => {
        async function loadData() {

            await fetchFoodList();

            // ✅ FIRST LOAD LOCAL STORAGE
            const savedCart = localStorage.getItem("cart");
            if (savedCart && savedCart !== "undefined") {
                try {
                    setCartItems(JSON.parse(savedCart));
                } catch {
                    setCartItems({});
                }
            }

            // ✅ THEN TOKEN
            const savedToken = localStorage.getItem("token");

            if (savedToken) {
                setToken(savedToken);

                // 🔥 ONLY UPDATE IF BACKEND HAS DATA
                await loadCartData(savedToken);
            }
        }

        loadData();
    }, []);


    // ✅ SAVE CART (SAFE)
    useEffect(() => {
        if (cartItems) {
            localStorage.setItem("cart", JSON.stringify(cartItems));
        }
    }, [cartItems]);


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
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;