import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import './style.css'

const HistoryPage = () => {

  const loggedInUser = useSelector(state => state.loggedInUser)
  const [orderHistory, setOrderHistory] = useState([]);


  useEffect(() => {
    const history = JSON.parse(localStorage.getItem('order'))
    const data = history.reduce( (finishData, item) => {
      console.log(item);
      return item.user_id === loggedInUser.id ? finishData = [...finishData, item] : finishData
    }, [] );
    setOrderHistory(data)
  }, [])

  return (
    <div className = "history">
        {orderHistory.length !== 0 ? orderHistory.map( item => <div className = "block-history">
          <p>Заказ № б/н</p>
          {item.name.map(name => <div>
            <span>{name.name}</span>
            <span className = "price-field">{`${name.price} руб`}</span>
            </div>)}
          <p>{`Общая сумма заказа: ${item.price} руб`}</p>
        </div>) : <p>Заказы</p>}
    </div>
  );
}

export default HistoryPage;