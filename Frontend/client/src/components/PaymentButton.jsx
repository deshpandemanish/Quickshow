import React from "react";

const PaymentButton = ({ amount }) => {
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const getOrderId = async () => {
    const response = await fetch(`http://localhost:8080/payment/createOrderId/${amount}`);
    const orderId = await response.text();
    return orderId;
  };

  const payNow = async () => {
    const isLoaded = await loadRazorpayScript();
    if (!isLoaded) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const orderId = await getOrderId();

    const options = {
      key: "rzp_test_HuZOl6727Ym83q",
      amount: amount * 100,
      currency: "INR",
      name: "QuickShow",
      description: "Movie Ticket",
      order_id: orderId,
      handler: function (response) {
        alert("Payment successful: " + response.razorpay_payment_id);
      },
      prefill: {
        name: "Prathamesh",
        email: "test@example.com",
        contact: "9999999999"
      },
      theme: {
        color: "#3399cc"
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return <button onClick={payNow}>Pay ₹{amount}</button>;
};

export default PaymentButton;
