// STYLES
import "./component-styles/OrderSummary.css"

// HOOKS
import { useState } from "react"

// COMPONENTS
import OrderConfirmation from "./OrderConfirmation"
import { useCart } from "../hooks/useCart"

const OrderSummary = ({ cart }) => {
  const { setShowOrderConf } = useCart()

  const checkFormData = (formDate) => {
    console.log('form data function goes here')
  }

  const handleClick = () => {
    checkFormData()
    window.scrollTo(0, 0)
    setShowOrderConf(true)
  }

  const cartTotal = () => {
    if(!cart) return false
    const initialValue = 0;
    const total = cart.reduce((prevItem, currentItem) => {
      return prevItem + (currentItem.price * currentItem.quantity)
    }, initialValue)
    return total
  }

  const total = cartTotal()

  return (
    <div className="order-summary">
      <h3 className="cart-title">SUMMARY</h3>
      <div className="cart-contents">
        {cart && cart.map(item => (
          <div className="cart-item" key={item.slug}>
            <div className="img-container">
              <img src={require(`../assets/cart/image-${item.slug}.jpg`)} alt={`{product.slug} preview`}  />
            </div>
            <div className="item-info">
              <h5 className="item-name">{item.shortHand}</h5>
              <p className="item-price">${item.price}</p>
            </div>
            <span className="item-quantity">x{item.quantity}</span>
          </div>
        ))}
      </div>
      <div className="total-display">
        <h4 className="total-title">TOTAL:</h4>
        <span className="total-amount">$ {total}</span>
      </div>
      <button className="pay-btn" onClick={handleClick}>
        PAY {total && <span className="grand-total"> $ {total}</span>}
      </button>
    </div>
  )
}

export default OrderSummary