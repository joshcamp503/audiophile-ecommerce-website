// STYLES
import './component-styles/CartMenu.css'

// HOOKS
import { useCart } from '../hooks/useCart'
import Quantity from './Quantity'
import { useState } from 'react'

const CartMenu = () => {
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")))
  const { showCart, setShowCart } = useCart()

  const handleClose = () => {
    showCart ? setShowCart(false) : setShowCart(true)
  }

  const clearCart = () => {
    localStorage.removeItem("cart")
    setCart([])
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
    <div className="cart-menu-backdrop">
      <div className="cart-menu">
        <button className="close-btn" onClick={handleClose}>x</button>
        <div className="cart-header">
          <h3 className="cart-title">CART
            {cart && <span> ({cart.length})</span>}
          </h3>
          <button className="remove-all" onClick={clearCart}>Remove all</button>
        </div>
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
              <Quantity quantity={item.quantity}/>
            </div>
          ))}
        </div>
        <div className="total-display">
          <h4 className="total-title">TOTAL:</h4>
          <span className="total-amount">$ {total}</span>
        </div>
        <button className="checkout-btn">CHECKOUT</button>
      </div>
    </div>
  )
}

export default CartMenu