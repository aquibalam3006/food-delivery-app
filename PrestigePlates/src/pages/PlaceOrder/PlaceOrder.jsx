import React, { useContext, useState, useEffect } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext';
import axios from "axios";
import { toast } from "react-toastify";

const PlaceOrder = () => {

  const { getTotalCartAmount, cartItems, food_list, token } = useContext(StoreContext);

  // ✅ Form state
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: ""
  });

  // ✅ Reset form on page load (BACK FIX)
  useEffect(() => {
    setData({
      firstName: "",
      lastName: "",
      email: "",
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
      phone: ""
    });
  }, []);

  // ✅ Input handler
  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData(prev => ({ ...prev, [name]: value }));
  };

  // ✅ Strong validation
  const isFormValid = () => {
    return Object.values(data).every(field => field && field.trim() !== "");
  };

  // ✅ Payment handler
  const handlePayment = async (e) => {
    e.preventDefault();

    if (!isFormValid()) {
      toast.error("Please fill all details ❌");
      return;
    }

    if (getTotalCartAmount() === 0) {
      toast.error("Cart is empty ❌");
      return;
    }

    const items = food_list
      .filter(item => cartItems[item._id] > 0)
      .map(item => ({
        name: item.name,
        price: item.price,
        quantity: cartItems[item._id]
      }));

    const BASE_URL =
      window.location.hostname === "localhost"
        ? "http://localhost:4000"
        : "https://food-delivery-app-lg9f.onrender.com";

    try {
      const response = await axios.post(
        `${BASE_URL}/api/order/place`,
        { items, userId: "tempUser" },
        {
          headers: { token }
        }
      );

      console.log("Stripe Response:", response.data); // DEBUG

      if (response.data.success) {
        window.location.href = response.data.url;
      } else {
        toast.error("Payment failed ❌");
      }

    } catch (error) {
      console.log(error);
      toast.error("Server error ❌");
    }
  };
  return (
    <form className='place-order'>

      {/* LEFT SIDE FORM */}
      <div className="place-order-left">
        <p className="title">Delivery Information</p>

        <div className="multi-field">
          <input name="firstName" value={data.firstName} onChange={onChangeHandler} type="text" placeholder='First Name' />
          <input name="lastName" value={data.lastName} onChange={onChangeHandler} type="text" placeholder='Last Name' />
        </div>

        <input name="email" value={data.email} onChange={onChangeHandler} type="email" placeholder='Email Address' />
        <input name="street" value={data.street} onChange={onChangeHandler} type="text" placeholder='Street' />

        <div className="multi-field">
          <input name="city" value={data.city} onChange={onChangeHandler} type="text" placeholder='City' />
          <input name="state" value={data.state} onChange={onChangeHandler} type="text" placeholder='State' />
        </div>

        <div className="multi-field">
          <input name="zipCode" value={data.zipCode} onChange={onChangeHandler} type="text" placeholder='Zip Code' />
          <input name="country" value={data.country} onChange={onChangeHandler} type="text" placeholder='Country' />
        </div>

        <input name="phone" value={data.phone} onChange={onChangeHandler} type="text" placeholder='Phone Number' />
      </div>

      {/* RIGHT SIDE CART */}
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>

          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>

            <hr />

            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>

            <hr />

            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
            </div>
          </div>

          {/* ✅ BUTTON */}
          <button
            onClick={handlePayment}
            disabled={!isFormValid()}
            style={{
              opacity: !isFormValid() ? 0.5 : 1,
              cursor: !isFormValid() ? "not-allowed" : "pointer"
            }}
          >
            PROCEED TO PAYMENT
          </button>

        </div>
      </div>

    </form>
  )
}

export default PlaceOrder