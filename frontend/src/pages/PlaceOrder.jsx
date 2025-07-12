import React, { useContext, useState } from "react";
import Title from "../component/Title";
import CartTotal from "../component/CartTotal";
import razorpay from "../assets/Razorpay.jpg";
import { shopDataContext } from "../context/ShopContext";
import { authDataContext } from "../context/authContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "../component/Loading";

function PlaceOrder() {
  let [method, setMethod] = useState("cod");
  let navigate = useNavigate();
  const { cartItem, setCartItem, getCartAmount, delivery_fee, products } =
    useContext(shopDataContext);
  let { serverUrl } = useContext(authDataContext);
  let [loading, setLoading] = useState(false);

  let [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    pinCode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Order Payment",
      description: "Order Payment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        const { data } = await axios.post(
          serverUrl + "/api/order/verifyrazorpay",
          response,
          { withCredentials: true }
        );
        if (data) {
          navigate("/order");
          setCartItem({});
        }
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let orderItems = [];
      for (const items in cartItem) {
        for (const item in cartItem[items]) {
          if (cartItem[items][item] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === items)
            );
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItem[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }
      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      };

      if (method === "cod") {
        const result = await axios.post(
          serverUrl + "/api/order/placeorder",
          orderData,
          { withCredentials: true }
        );
        if (result.data) {
          setCartItem({});
          toast.success("Order Placed");
          navigate("/order");
        } else {
          toast.error("Order Placed Error");
        }
      } else if (method === "razorpay") {
        const resultRazorpay = await axios.post(
          serverUrl + "/api/order/razorpay",
          orderData,
          { withCredentials: true }
        );
        if (resultRazorpay.data) {
          initPay(resultRazorpay.data);
          toast.success("Order Placed");
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-l from-[#141414] to-[#0c2025] pt-[90px] pb-[40px] flex flex-col lg:flex-row items-center justify-center gap-10 px-4">
      <form
        onSubmit={onSubmitHandler}
        className="w-full lg:w-1/2 flex flex-col gap-4 text-white"
      >
        <Title text1={"DELIVERY"} text2={"INFORMATION"} />

        <div className="flex gap-4">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={onChangeHandler}
            className="w-1/2 h-12 px-4 bg-slate-700 rounded-md placeholder-white"
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={onChangeHandler}
            className="w-1/2 h-12 px-4 bg-slate-700 rounded-md placeholder-white"
            required
          />
        </div>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={onChangeHandler}
          className="w-full h-12 px-4 bg-slate-700 rounded-md placeholder-white"
          required
        />

        <input
          type="text"
          name="street"
          placeholder="Street"
          value={formData.street}
          onChange={onChangeHandler}
          className="w-full h-12 px-4 bg-slate-700 rounded-md placeholder-white"
          required
        />

        <div className="flex gap-4">
          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={onChangeHandler}
            className="w-1/2 h-12 px-4 bg-slate-700 rounded-md placeholder-white"
            required
          />
          <input
            type="text"
            name="state"
            placeholder="State"
            value={formData.state}
            onChange={onChangeHandler}
            className="w-1/2 h-12 px-4 bg-slate-700 rounded-md placeholder-white"
            required
          />
        </div>

        <div className="flex gap-4">
          <input
            type="text"
            name="pinCode"
            placeholder="Pincode"
            value={formData.pinCode}
            onChange={onChangeHandler}
            className="w-1/2 h-12 px-4 bg-slate-700 rounded-md placeholder-white"
            required
          />
          <input
            type="text"
            name="country"
            placeholder="Country"
            value={formData.country}
            onChange={onChangeHandler}
            className="w-1/2 h-12 px-4 bg-slate-700 rounded-md placeholder-white"
            required
          />
        </div>

        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={onChangeHandler}
          className="w-full h-12 px-4 bg-slate-700 rounded-md placeholder-white"
          required
        />
      </form>

      <div className="w-full lg:w-1/2 flex flex-col items-center gap-6 pb-[90px] md:pb-[20px]">
        <CartTotal />
        <Title text1={"PAYMENT"} text2={"METHOD"} />

        <div className="flex flex-col lg:flex-row gap-4 items-center">
          <button
            type="button"
            onClick={() => setMethod("razorpay")}
            className={`w-[160px] h-[50px] rounded-sm ${
              method === "razorpay"
                ? "border-4 border-blue-600"
                : "border border-slate-300"
            }`}
          >
            <img
              src={razorpay}
              alt="Razorpay"
              className="w-full h-full object-contain rounded-sm"
            />
          </button>

          <button
            type="button"
            onClick={() => setMethod("cod")}
            className={`w-[180px] h-[50px] bg-gradient-to-t from-[#95b3f8] to-white text-[#332f6f] font-bold rounded-sm ${
              method === "cod"
                ? "border-4 border-blue-600"
                : "border border-slate-300"
            }`}
          >
            CASH ON DELIVERY
          </button>
        </div>

        <button
          onClick={onSubmitHandler}
          className="text-lg bg-[#3bcee848] hover:bg-[#2abdd9] text-white px-6 py-3 rounded-xl mt-4 border border-[#80808049]"
        >
          {loading ? <Loading /> : "PLACE ORDER"}
        </button>
      </div>
    </div>
  );
}

export default PlaceOrder;
