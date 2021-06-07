import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import MainPage from '../pages/main';
import PricePage from '../pages/basket';
import HistoryPage from '../pages/history';
import KatalogPage from '../pages/katalog';
import LoginPage from '../pages/login'
import { Navbar } from '../components/navbar';
import { ROUTES } from '../const';

function Navigator() {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route path={ROUTES.LOGIN} component={LoginPage} />
        <Route path={ROUTES.KATALOG} component={KatalogPage} />
        <Route path={ROUTES.HISTORY} component={HistoryPage} />
        <Route path={ROUTES.BASKET} component={PricePage} />
        <Route path={ROUTES.MAIN} component={MainPage} />
      </Switch>
    </BrowserRouter>
  )
};
export default Navigator;

