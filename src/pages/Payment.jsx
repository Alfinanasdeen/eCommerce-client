import { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;
  margin: 150px 400px 60px 0px;
  font-family: "Arial", sans-serif;
`;

const Title = styled.h2`
  color: #333;
  font-size: 1.8rem;
  margin-bottom: 20px;
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  color: #555;
  margin-bottom: 10px;
  font-size: 1rem;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 20px;
  font-size: 1rem;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  border: none;
  background: linear-gradient(90deg, lightseagreen, teal);
  color: white;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const StatusMessage = styled.p`
  color: ${(props) => (props.success ? "#28a745" : "#dc3545")};
  margin-top: 20px;
  font-size: 0.9rem;
  text-align: center;
`;

const Payment = ({ totalAmount, resetTotalAmount }) => {
  const [loading, setLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState("");

  // Create Razorpay Order
  const createOrder = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3003/api/payment/create-order",
        { amount: totalAmount }
      );
      return response.data;
    } catch (error) {
      console.error("Error creating order:", error);
      return null;
    }
  };

  // Handle Payment via Razorpay
  const handlePayment = async (event) => {
    event.preventDefault();

    if (!totalAmount || isNaN(totalAmount) || totalAmount <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    setLoading(true);
    const order = await createOrder();

    if (!order) {
      setLoading(false);
      setPaymentStatus("Failed to create order");
      return;
    }

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID, // Your Razorpay key ID
      amount: order.amount,
      currency: "INR",
      name: "Electric and Tech World",
      description: "Payment for invoice",
      order_id: order.id,
      handler: async function (response) {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
          response;
        try {
          const verifyResponse = await axios.post(
            "http://localhost:3003/api/payment/verify-payment",
            {
              razorpay_order_id,
              razorpay_payment_id,
              razorpay_signature,
            }
          );

          // Ensure the response data has the correct status
          if (verifyResponse.data.message === "Payment verified successfully") {
            setPaymentStatus("Payment verified successfully");
            resetTotalAmount(0); // Reset the totalAmount to 0 after successful payment
          } else {
            setPaymentStatus("Payment verification failed");
          }
        } catch (error) {
          console.error("Payment verification error:", error);
        }
      },
      prefill: {
        name: "Alfina",
        email: "alfina@gmail.com",
        contact: "9876543212",
      },
      theme: {
        color: "#007bff",
      },
    };

    // Use Razorpay as a function, not a constructor
    const razorpay = new window.Razorpay(options);
    razorpay.open();

    setLoading(false);
  };

  return (
    <Container>
      <Title>Payment for Invoice</Title>
      <Form onSubmit={handlePayment}>
        <Label>Amount (INR):</Label>
        <Input
          type="number"
          value={totalAmount} // Use the totalAmount prop directly
          onChange={(e) => {}}
          disabled
        />
        <Button type="submit" disabled={loading}>
          {loading ? "Processing Payment..." : "Pay Now"}
        </Button>
      </Form>
      {paymentStatus && (
        <StatusMessage success={paymentStatus.includes("successfully")}>
          {paymentStatus}
        </StatusMessage>
      )}
    </Container>
  );
};

Payment.propTypes = {
  totalAmount: PropTypes.number.isRequired, // Ensure the totalAmount is a required prop
  resetTotalAmount: PropTypes.func.isRequired, // Make sure resetTotalAmount is passed from the parent
};

export default Payment;
