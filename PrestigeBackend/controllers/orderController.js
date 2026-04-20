import orderModel from "../models/orderModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

if (!items || items.length === 0) {
  return res.json({ success: false, message: "Cart empty ❌" });
}
console.log("Items:", items);
console.log("Stripe Key:", process.env.STRIPE_SECRET_KEY);

// PLACE ORDER (Stripe)
const placeOrder = async (req, res) => {
  try {
    const { items } = req.body;
    const userId = req.body.userId;

    const amount = items.reduce((total, item) => total + item.price * item.quantity, 0);

    const newOrder = new orderModel({
      userId: "tempUser",
      items,
      amount,
      address: {},
    });

    const savedOrder = await newOrder.save();

    const line_items = items.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name,
        },
        unit_amount: Number(item.price) * 100,
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `https://food-delivery-app-murex-one.vercel.app/success?orderId=${savedOrder._id}`,
      cancel_url: `https://food-delivery-app-murex-one.vercel.app/cart`,
    });

    res.json({ success: true, url: session.url });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// USER ORDERS
const userOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.body.userId });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false });
  }
};



// GET ALL ORDERS (ADMIN)
const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false });
  }
};

// UPDATE ORDER STATUS
const updateStatus = async (req, res) => {
  try {
    await orderModel.findByIdAndUpdate(req.body.id, {
      status: req.body.status
    });
    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.json({ success: false });
  }
};

export { placeOrder, userOrders, allOrders, updateStatus };

