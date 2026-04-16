import React, { useContext, useEffect, useState } from 'react'
import './MyOrders.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const MyOrders = () => {
  const navigate = useNavigate();

  const { url, token } = useContext(StoreContext)
  const [orders, setOrders] = useState([])

  const fetchOrders = async () => {
    try {
      const response = await axios.post(
        url + "/api/order/userorders",
        {},
        { headers: { token } }
      )

      if (response.data.success) {
        setOrders(response.data.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (token) {
      fetchOrders()
    }
  }, [token])

  return (
    <div className='my-orders'>
      <h2>My Orders</h2>

      <div className="container">
        {orders.length === 0 ? (
          <p>No orders found ❌</p>
        ) : (
          orders.map((order, index) => {
            return (
              <div key={index} className='my-orders-order'>

                <img src="https://cdn-icons-png.flaticon.com/512/1046/1046784.png" alt="" />

                <p>
                  {order.items.map((item, i) => {
                    if (i === order.items.length - 1) {
                      return item.name + " x " + item.quantity
                    } else {
                      return item.name + " x " + item.quantity + ", "
                    }
                  })}
                </p>

                <p>${order.amount}</p>

                <p>Items: {order.items.length}</p>

                <p>
                  <span>&#x25cf;</span> <b>{order.status}</b>
                </p>

                <button onClick={() => navigate(`/track/${order._id}`)}>
                  Track Order
                </button>

              </div>
            )
          })
        )}
      </div>
    </div>
  )
}

export default MyOrders