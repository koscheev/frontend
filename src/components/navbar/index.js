import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../const';
import './style.css';

export const Navbar = () => {

  const count = useSelector(state => state.basket)
  const loggedInUser = useSelector(state => state.loggedInUser)

  return (
    <nav className = "navigator">
      <Link to={ROUTES.MAIN} className = "navigator-link">Главная</Link>
      <Link to={ROUTES.LOGIN} className = "navigator-link">Регистрация</Link>
      <Link to={ROUTES.KATALOG} className = "navigator-link">Каталог</Link>
      {loggedInUser && <Link to={ROUTES.HISTORY} className = "navigator-link">История заказов</Link>}
      <Link to={ROUTES.BASKET} className = "navigator-link navigator-link_basket" data = {count.length}>Корзина</Link>
    </nav>
  );
};