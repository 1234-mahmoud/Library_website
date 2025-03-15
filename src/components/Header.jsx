import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../store/ui-slice";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { BsList } from "react-icons/bs";
import { BiHeart } from "react-icons/bi";
import { BiSearchAlt2 } from "react-icons/bi";
import { BiUserCircle } from "react-icons/bi";
import { CiShoppingCart } from "react-icons/ci";
import "../style/Header.css";
import logo from "../imgs/cropped_logo.webp";
export default function Header() {
  const dispatch = useDispatch();
  const handleToggleCart = () => {
    dispatch(uiActions.toggle());
  };

  const [showLinks, setShowLinks] = useState(false);
  const show_links = () => {
    setShowLinks(true);
  };
  const hide_links = () => {
    setShowLinks(false);
  };
  return (
    <div className="header">
      <div className="container">
        <div className="wedgit">
          <div className="wed_block cart">
            <span>
            {
                useSelector(state=>state.cart.totalQuantity)
              }
            </span>
            <CiShoppingCart className="icon" onClick={handleToggleCart} />
            السلة
          </div>
          <div className="wed_block user">
            <BiUserCircle className="icon" />
            حسابي
          </div>
          <div className="wed_block search">
            <BiSearchAlt2 className="icon" />
            البحث
          </div>
          <div className="wed_block fav">
            <span>
            0
            </span>
            <BiHeart className="icon" />
            المفضلة
          </div>
        </div>
        <div className={`links ${showLinks ? "show" : "hide"}`}>
          <AiOutlineCloseCircle className="close" onClick={hide_links} />
          <a href="#">اتصل بنا</a>
          <a href="#">عن المكتبة</a>
          <a href="#">عروض</a>
          <select name="" id="">
            <option value="">الكتب</option>
          </select>
          <a href="#">الرئيسية</a>
        </div>
        <div className="logo">
          <img src={logo} alt="" />
        </div>
        <BsList className="list" onClick={show_links} />
      </div>
    </div>
  );
}
