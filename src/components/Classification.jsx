import { AiOutlineHeart, AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import { useState, useEffect } from "react";
import React from "react";
import "../style/Classification.css";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useDispatch } from "react-redux";
import { cartActions } from "../store/cart-slice";

export default function Classification({ title, API_url }) {
  const dispatch = useDispatch();

  // State Variables
  const [visibleCount, setVisibleCount] = useState(6);

  
  const [data, setData] = useState([]);


  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [count, setCount] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const clonedData = [...data, ...data];

  // Adjust slider items based on screen size
  useEffect(() => {
    const calculateVisibleCount = () => {
      if (window.innerWidth <= 767) setVisibleCount(1);
      else if (window.innerWidth <= 991) setVisibleCount(3);
      else setVisibleCount(6);
    };

    calculateVisibleCount();
    window.addEventListener("resize", calculateVisibleCount);
    return () => window.removeEventListener("resize", calculateVisibleCount);
  }, []);

  // Fetch data from API
  useEffect(() => {
    fetch(API_url)
      .then((response) => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
      })
      .then((jsonData) => {
        setData(jsonData.books || []);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [API_url]);

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      shiftNext();
    }, 3000);
    return () => clearInterval(interval);
  }, [count, data]);

  // Handlers
  const shiftNext = () => {
    if (count + visibleCount >= data.length) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCount(0);
      }, 500);
    } else {
      setIsTransitioning(true);
      setCount((prevCount) => prevCount + 1);
    }
  };

  const shiftPrev = () => {
    if (count > 0) setCount(count - 1);
  };

  
  const handleAddToCart = (product) => {
    const cleanPrice = parseFloat(product.price.replace(/[^0-9.]/g, "")) || 0; // Remove non-numeric characters
    dispatch(
      cartActions.addItemToCart({
        id:  product.title.replace(/\s+/g, "-").toLowerCase(), // Generate a unique id,
        img:product.image,
        price: cleanPrice,
        title: product.title,
      })
    );
  };

  // Slider animation
  const sliderStyle = css`
    transform: translateX(calc(-${count * (100 / visibleCount)}%));
    transition: ${isTransitioning ? "transform 0.5s ease-in-out" : "none"};

    @media (max-width: 767px) {
      transform: translateX(-${count * 100}%);
    }

    @media (min-width: 768px) and (max-width: 991px) {
      transform: translateX(calc(-${count * (100 / visibleCount)}%));
    }
  `;

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="classification">
      <h1>{title}</h1>        
      <div className="slider_container">
        <div className="btns_control">
          <button onClick={shiftPrev}><AiFillCaretLeft /></button>
          <button onClick={shiftNext}><AiFillCaretRight /></button>
        </div>
        <div className="wraper">
          <div className="slider" css={sliderStyle}>
            {clonedData.map((b, idx) => (
              <div className="card" key={idx}>
                <img src={b.image} alt={b.title} />
                <span>{b.title}</span>
                <span>{b.price} </span>
                <div className="cart_fav">
                  <div className="addToCart">
                    <button onClick={() => handleAddToCart(b)}>+</button>
                  </div>
                  <div className="favouriteProduct">
                    <AiOutlineHeart className="fav_icon" fill="rgb(24, 190, 212)"/>
                  </div>
                </div>
                <a href={b.url}>Overview this book</a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
