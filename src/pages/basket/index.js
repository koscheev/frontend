import React from 'react'
import { useSelector } from "react-redux"
import { useDispatch } from 'react-redux'
import './style.css'

const BasketPage = () => {
  const loggedInUser = useSelector(state => state.loggedInUser)
  const basket = useSelector(state => state.basket)
  const reducer = (accumulator, { price }) => accumulator + price;
  const summaryPrice = basket.reduce(reducer, 0)
  const dispatch = useDispatch()

  const removeFromBasket = (item) => {
    dispatch({ type: 'REMOVE_FROM_BASKET', payload: item })
  }

  const saveOrder = () => {
    const data = {
      user_id: loggedInUser.id,
      name: basket,
      price: summaryPrice
    }
    const history = JSON.parse(localStorage.getItem('order'));
    history.push(data)
    localStorage.setItem('order', JSON.stringify(history));
    clearBasket();
    alert("Ваш заказ принят в обработку")
  }

  const clearBasket = () => dispatch({ type: 'CLEAR_BASKET' });

  return (
    <div className="list-product">
      {basket && basket.map((item, index) => (
        <li className="block-product-basket" key={item.id}>
          <p className="name-product">{item.name}</p>
          <p className="price-product">Цена: {item.price}</p>
          <input type="button" value="удалить из корзины" onClick={() => removeFromBasket(item)} />
        </li>
      )
      )}
      <h3>Итого по заказу: {summaryPrice} руб</h3>
      {summaryPrice === 0 && <h2 className="basket-empty">Ваша корзина пуста</h2>}
      {basket.length !== 0 && <button onClick={saveOrder}>Оформить заказ</button>}
    </div>
  );
}

export default BasketPage;