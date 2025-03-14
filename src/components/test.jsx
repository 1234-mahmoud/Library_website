import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import { useState, useEffect } from "react";
import React from "react";
import "../style/tst.css";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";


export default function Test({API_url}) {

  const [visibleCount, setVisibleCount] = useState(6);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [count, setCount] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(true);
    const clonedData = [...data, ...data];
    useEffect(() => {
      const calculateVisibleCount = () => {
        if (window.innerWidth <= 767) {
          setVisibleCount(1);
        } else if (window.innerWidth <= 991) {
          setVisibleCount(3);
        } else {
          setVisibleCount(6);
        }
      };
  
      calculateVisibleCount();
      window.addEventListener("resize", calculateVisibleCount);
      return () => window.removeEventListener("resize", calculateVisibleCount);
    }, []);
  
    useEffect(() => {
      fetch(API_url)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
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
  
    const shiftNext = () => {
      if (count + visibleCount >= data.length) {
        // When count reaches the point where there is no more data to show, reset to 0
        setTimeout(() => {
          setIsTransitioning(false);
          setCount(0);
        }, 500); // Optional delay before reset to make it smooth
      } else {
        setIsTransitioning(true);
        setCount((prevCount) => prevCount + 1);
      }
    
    };
  
    useEffect(() => {
      const interval = setInterval(() => {
        shiftNext();
      }, 3000);
      return () => clearInterval(interval);
    }, [count, data]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    const shiftPrev = () => {
      if (count > 0) {
        setCount(count - 1);
      }
    };
  

  const sliderStyle =css`
      transform: translateX(calc(-${count * (100 / visibleCount)}%));
      transition: ${isTransitioning ? "transform 0.5s ease-in-out" : "none"};
  
      @media (max-width: 767px) {
        transform: translateX(-${count * 100}%);
      }
  
      @media (min-width: 768px) and (max-width: 991px) {
        transform: translateX(calc(-${count * (100 / visibleCount)}%));
      }
    `;

  return (
  <div className="TEST">
      <div className="slider_container">
      <div className="btns_control">
        <button onClick={shiftPrev}>
          <AiFillCaretLeft />
        </button>
        <button onClick={shiftNext}>
          <AiFillCaretRight />
        </button>
      </div>
      <div className="wraper">
        <div className="slider" css={sliderStyle}>
          {clonedData.map((b, idx) => (
            <div className="card" key={idx}>
               <img src={b.image} alt={b.title} />
                <span>{b.title}</span>
                <p>{b.subtitle}</p>
                <span>{b.price}</span>
                <a href={b.url}>Overview this book</a>
            </div>
          ))}
        </div>
      </div>
     
    </div>
  </div>
  );
}
