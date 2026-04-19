import React, { useEffect, useState } from 'react'
import './Orders.css'
import axios from 'axios'
import { toast } from 'react-toastify'
import BASE_URL from '../../config'

const Orders = () => {

  const [orders, setOrders] = useState([])

  const fetchOrders = async () => {
    const response = await axios.get(`${BASE_URL}/api/order/list`)
    if(response.data.success){
      setOrders(response.data.data)
    }else{
      toast.error("Error fetching orders")
    }
  }

  const statusHandler = async (event, orderId) => {
    const response = await axios.post(`${BASE_URL}/api/order/status`, {
      id: orderId,
      status: event.target.value
    })

    if(response.data.success){
      await fetchOrders()
    }
  }

  useEffect(()=>{
    fetchOrders()
  },[])

  return (
    <div className='orders add'>
      <h2>All Orders</h2>

      <div className="orders-container">

        {orders.map((order,index)=>(
          <div key={index} className='order-card'>

            <div className="order-left">
              <p><b>Order ID:</b> {order._id}</p>

              <p>
                {order.items.map((item,i)=>(
                  <span key={i}>
                    {item.name} x {item.quantity}{i !== order.items.length-1 && ", "}
                  </span>
                ))}
              </p>

              <p><b>Amount:</b> ₹{order.amount}</p>
              <p><b>Status:</b> {order.status}</p>
            </div>

            <div className="order-right">
              <select onChange={(e)=>statusHandler(e,order._id)} value={order.status}>
                <option value="Food Processing">Food Processing</option>
                <option value="Preparing">Preparing</option>
                <option value="Out for Delivery">Out for Delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>

          </div>
        ))}

      </div>
    </div>
  )
}

export default Orders