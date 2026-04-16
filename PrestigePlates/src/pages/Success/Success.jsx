import React, { useEffect, useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Success = () => {

  const { clearCart } = useContext(StoreContext)

  const navigate = useNavigate()
  useEffect(() => {
    clearCart();
    toast.success("Payment Successful 🎉");

    setTimeout(() => {
      navigate("/");
    }, 2000);

  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Payment Successful ✅</h2>
      <p>Redirecting...</p>
    </div>
  )
}

export default Success