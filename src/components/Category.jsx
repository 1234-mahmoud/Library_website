import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import { useState, useEffect } from "react";
import React from "react";
import "../style/Category.css";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import p1 from "../imgs/bilingual.webp";
import p2 from "../imgs/book_2.webp";
import p3 from "../imgs/book_3.webp";
import p4 from "../imgs/book.webp";
import p6 from "../imgs/diwali-gift.webp";
import p7 from "../imgs/flash-sale.webp";
import p8 from "../imgs/learning.webp";
import p9 from "../imgs/personal-growth.webp";
import p11 from "../imgs/quran.webp";
import p12 from "../imgs/student-girl.webp";
import p13 from "../imgs/teaching-english.webp";
import p14 from "../imgs/translate_1.webp";

export default function Category() {
  const initialImgs = [p1, p2, p3, p4, p6, p7, p8, p9, p11, p12, p13, p14];

  const [dataSlider, setDataSlider] = useState(initialImgs);
  const [count, setCount] = useState(0);
       const [isTransitioning, setIsTransitioning] = useState(true);
  
  const visibleCount = 6;

  const shiftNext = () => {
    if (count + visibleCount >= initialImgs.length) {
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

  const shiftPrev = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev < dataSlider.length - visibleCount) {
          return prev + 1;
        } else {
          setDataSlider([...dataSlider, ...dataSlider]);
          return prev; // count = 0
        }
      });
    }, 3000);
    return () => clearInterval(interval);
  }, [dataSlider]);

  const sliderStyle = css`
      transform: translateX(calc(-${count * (100 / visibleCount)}%));
       transition: ${isTransitioning ? "transform 0.5s ease-in-out" : "none"};
   
       @media (max-width: 767px) {
         transform: translateX(-${count * 100}%);
       }
   
       @media (min-width: 768px) and (max-width: 991px) {
         transform: translateX(calc(-${count * (100 / visibleCount)}%));
       }
  
      
    }
  `;

  return (
  <div className="category">
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
          {dataSlider.map((i, idx) => (
            <div className="card" key={idx}>
              <img src={i} alt="" />
              <p>الفئة</p>
            </div>
          ))}
        </div>
      </div>
      <div className="pagination">
        {[...Array(initialImgs.length)].map((_, i) => (
          <span
            key={i}
            className={i === count % initialImgs.length ? "active" : ""}
            onClick={() => setCount(i)}
          ></span>
        ))}
      </div>
    </div>
  </div>
  );
}
