import React, { useState, useEffect } from 'react';
import './ProductList.css';
import ProductItem from '../ProductItem/ProductItem';
import { useTelegram } from '../../hooks/useTelegram';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [addedItems, setAddedItems] = useState([]);
  const { tg, queryId } = useTelegram();

  useEffect(() => {
    // Здесь вы можете использовать ваш API для получения товаров из базы данных
    // Например, вызовите функцию fetchData() для получения данных

    // Пример:
    const fetchData = async () => {
      try {
        const response = await fetch('/api/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const getTotalPrice = () => {
    return addedItems.reduce((acc, item) => {
      return acc + item.price;
    }, 0);
  };

  const onSendData = () => {
    const data = {
      products: addedItems,
      totalPrice: getTotalPrice(),
      queryId,
    };
    tg.sendData(JSON.stringify(data));
  };

  useEffect(() => {
    tg.onEvent('mainButtonClicked', onSendData);
    return () => {
      tg.offEvent('mainButtonClicked', onSendData);
    };
  }, [addedItems]);

  const onAdd = (product) => {
    const alreadyAdded = addedItems.find((item) => item.id === product.id);
    let newItems = [];

    if (alreadyAdded) {
      newItems = addedItems.filter((item) => item.id !== product.id);
    } else {
      newItems = [...addedItems, product];
    }

    setAddedItems(newItems);

    if (newItems.length === 0) {
      tg.MainButton.hide();
    } else {
      tg.MainButton.show();
      tg.MainButton.setParams({
        text: `Купить ${getTotalPrice()}₽`,
      });
    }
  };

  return (
    <div className="list">
      {products.map((item) => (
        <ProductItem key={item.id} product={item} onAdd={onAdd} className="item" />
      ))}
    </div>
  );
};

export default ProductList;
