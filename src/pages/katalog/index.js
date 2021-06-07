import React, { useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import { useEffect, useState } from "react";
import { useSelector } from "react-redux"
import { useDispatch } from 'react-redux'
import { ShowDetails } from '../../components/listItem'
import './style.css'

const KatalogPage = () => {
  const loggedInUser = useSelector(state => state.loggedInUser)
  const [filteredProducts, setFilteredProducts] = useState([])
  const [selectedBrands, setSelectedBrands] = useState({ "Samsung": false, "Lg": false, "Sony": false })
  const [data, setData] = useState([]);
  const itemsPerPage = 6
  const dispatch = useDispatch()
  const [page, setPage] = React.useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };

  // фильтр по бренду в массиве в локал сторадж
  const selectBrand = useCallback((brand, value) => {
    console.log(value);
    console.log(brand);
    setSelectedBrands({ ...selectedBrands, [brand]: value })
  })

  useEffect(async () => {
    const tvs = await localStorage.getItem('products');
    console.log(tvs)
    if (tvs) {
      setData(JSON.parse(tvs))
    }
  }, []);

  useEffect(() => {
    let products = [...data]
    const selectedProductsArray = Object.entries(selectedBrands).filter(([key, value]) => value).map(([key, value]) => key)
    if (selectedProductsArray.length > 0) {
      products = products.filter((dataItem) => selectedProductsArray.includes(dataItem.brand))
    }
    setFilteredProducts(products)
  }, [data, selectedBrands])

  // Pagination
  const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        marginTop: theme.spacing(2),
      },
    },
  }));

  const classes = useStyles();

  const dataPerPage = filteredProducts.filter((val, index) => index >= (page - 1) * itemsPerPage && index < page * itemsPerPage && val)
  const pageCount = Math.ceil(data.length / itemsPerPage)

  const addToBasket = (item) => {
    dispatch({ type: 'ADD_TO_BASKET', payload: item })
  }

  return (
    <div className="page-katalog">
      {!loggedInUser && <h3 className = "warning-authorization">Для работы в системе авторизуйтесь</h3>}
      {loggedInUser &&
        <div>
          <h3>Сортировка: &nbsp;</h3>
          {Object.entries(selectedBrands).map(([key, value]) =>
            <label className="input">
              <input checked={value} type="checkbox" onChange={(e) => selectBrand(key, e.target.checked)} />
              <span className="brand-product">&nbsp;{key}</span>
            </label>
          )}
          <div className="field-product">
            {dataPerPage.map((item, index) => <li className="block-product" key={item.id}>
              <p className="name-product">
                {item.name}
              </p>
              <img className="image-size" src={window.location.origin + `${item.image}`} />
              <input className="field-price" type="text" value={item.price} disabled={!loggedInUser.root} onChange={(event) => {
                const newArr = [...data];
                newArr[index] = {
                  ...newArr[index],
                  price: Number(event.target.value)
                }
                setData(newArr)
              }} />
              <ShowDetails description={item.description} />
              {loggedInUser.root && <input type="button" value="изменить" onClick={localStorage.setItem('products', JSON.stringify(data))} />}
              {!loggedInUser.root && <input type="button" value="добавить в корзину" onClick={() => addToBasket(item)} />}
            </li>
            )}
          </div>
        </div>}
      {loggedInUser && <div className={classes.root}>
        <Pagination count={pageCount} page={page} onChange={handleChange} color="primary" />
      </div>}
    </div>
  );
}

export default KatalogPage;
