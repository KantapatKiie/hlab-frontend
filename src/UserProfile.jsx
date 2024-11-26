/* eslint-disable */
import React from "react";
import { useCallback, useEffect, useState } from "react";

const calculateDiscountedPrice = (price, discount) => {
  return price - (price * discount) / 100;
};

const UserProfile = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [discount, setDiscount] = useState(0);

  const fetchCartItems = useCallback(async () => {
    try {
      setCart([
        {
          item: "item_1",
          price: 1000,
        },
      ]);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  }, []);

  const calculateTotalPrice = useCallback(() => {
    const total = cart.reduce((acc, item) => {
      const discountedPrice = calculateDiscountedPrice(item.price, discount);
      return acc + discountedPrice;
    }, 0);
    setTotalPrice(total);
  }, [cart, discount]);

  useEffect(() => {
    fetchCartItems();
  }, [fetchCartItems]);

  useEffect(() => {
    calculateTotalPrice();
  }, [cart, discount, calculateTotalPrice]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://api.example.com/users/${userId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const userData = await response.json();
        setUser(userData);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchData();
  }, [userId]);

  return (
    <div>
      <h1>Question useCallback and UnitTest Jest</h1>
      {!error ? (
        <>
          <p>Username: {(user && user.name) || ""}</p>
          <p>Email: {(user && user.email) || ""}</p>
        </>
      ) : (
        <p>
          Error: {error} <br />
        </p>
      )}
      <div>
        <p>Total Price: ${totalPrice}</p>
        <p>Discount: {discount}%</p>
      </div>
      <button
        onClick={() =>
          setDiscount((prevDiscount) =>
            prevDiscount >= 100 ? prevDiscount : prevDiscount + 10
          )
        }
      >
        Increase Discount
      </button>
      <div className="text-left">
        <b>Question 1 ( useCallback ใช้ทำอะไร ? )</b>
        <br />
        <b>Answer : </b>
        The useCallback hook in React is used to memoize a function Answer :
        ลดการสร้างฟังก์ชันใหม่ ในตอนที่ React ทำการ Re-Render
        เหมาะแก่การใช้ในการคำนวณ หรือ memoize data แบบหลายๆครั้ง ทำให้ไม่เปลือง
        load ตอนที่ re-render ใหม่
      </div>
    </div>
  );
};

export default UserProfile;
