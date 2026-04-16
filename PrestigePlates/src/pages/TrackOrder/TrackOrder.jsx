import React, { useContext, useEffect, useState } from 'react'
import './TrackOrder.css'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { StoreContext } from '../../context/StoreContext'

const TrackOrder = () => {

    const { id } = useParams()
    const { url, token } = useContext(StoreContext)

    const [order, setOrder] = useState(null)

    const fetchOrder = async () => {
        try {
            const response = await axios.post(
                url + "/api/order/userorders",
                {},
                { headers: { token } }
            )

            if (response.data.success) {
                const found = response.data.data.find(o => o._id === id)
                setOrder(found)
            }

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            fetchOrder()
        }, 3000)

        return () => clearInterval(interval)
    }, [])

    const steps = ["Food Processing", "Preparing", "Out for Delivery", "Delivered"]

    const currentStep = steps.indexOf(order?.status)

    return (
        <div className="track-order">

            <h2>Track Order</h2>

            {order && (
                <>
                    <p><b>Order ID:</b> {order._id}</p>

                    <div className="progress-container">
                        {steps.map((step, index) => (
                            <div key={index} className="step">

                                <div className={`circle ${index <= currentStep ? "active" : ""}`}>
                                    {index < currentStep ? "✔" : index + 1}
                                </div>

                                <p>{step}</p>

                                {index !== steps.length - 1 && (
                                    <div className={`line ${index < currentStep ? "active" : ""}`}></div>
                                )}

                            </div>
                        ))}
                    </div>
                </>
            )}

        </div>
    )
}

export default TrackOrder