import React from "react";
import "../style/Cart.css";
import { useSelector, useDispatch } from "react-redux";
import { cartActions } from "../store/cart-slice";

export default function Cart() {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  const handleRemoveFromCart = (id) => {
    dispatch(cartActions.removeItemFromCart(id));
  };
  const handleAddToCart = (product) => {
    dispatch(
      cartActions.addItemToCart({
        id: product.id,
        price: Number(product.price),
      })
    );
  };
  return (
    <div className="shopping_cart">
      {cartItems.length === 0 ? (
        <p>سلة المشتريات فارغة</p>
      ) : (
        cartItems.map((b, idx) => (
          <div key={idx} className="cart-item">
            <img src={b.img} alt={b.title} />
            <span>{b.name}</span>
            <p>Quantity: {b.quantity}</p>
            <p>Total: {b.totalPrice}$</p>
           
              <div className="cart_btns">
                <button onClick={() => handleAddToCart(b)}>+</button>
            <button onClick={() => handleRemoveFromCart(b.id)}>-</button>
          
            </div>

          </div>
        ))
      )}
    </div>
  );
}
