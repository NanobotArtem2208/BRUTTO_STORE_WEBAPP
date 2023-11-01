import React, {useState} from 'react';
import './ProductList.css';
import ProductItem from "../ProductItem/ProductItem";
import {useTelegram} from "../../hooks/useTelegram";
import {useCallback, useEffect} from "react";

const products = [
    {id: '1', img: 'https://ae01.alicdn.com/kf/HTB1lkXUSFXXXXa.XpXXq6xXFXXXw/-.jpg' ,title: 'Джинсы', price: 5000, description: 'Синего цвета, прямые'},
    {id: '2', img: 'https://ae01.alicdn.com/kf/HTB1lkXUSFXXXXa.XpXXq6xXFXXXw/-.jpg' ,title: 'Куртка', price: 12000, description: 'Зеленого цвета, теплая'},
    {id: '3', img: 'https://ae01.alicdn.com/kf/HTB1lkXUSFXXXXa.XpXXq6xXFXXXw/-.jpg' ,title: 'Джинсы 2', price: 5000, description: 'Синего цвета, прямые'},
    {id: '4', img: 'https://ae01.alicdn.com/kf/HTB1lkXUSFXXXXa.XpXXq6xXFXXXw/-.jpg' ,title: 'Куртка 8', price: 122, description: 'Зеленого цвета, теплая'},
    {id: '5', img: 'https://ae01.alicdn.com/kf/HTB1lkXUSFXXXXa.XpXXq6xXFXXXw/-.jpg' ,title: 'Джинсы 3', price: 5000, description: 'Синего цвета, прямые'},
    {id: '6', img: 'https://ae01.alicdn.com/kf/HTB1lkXUSFXXXXa.XpXXq6xXFXXXw/-.jpg' ,title: 'Куртка 7', price: 600, description: 'Зеленого цвета, теплая'},
    {id: '7', img: 'https://ae01.alicdn.com/kf/HTB1lkXUSFXXXXa.XpXXq6xXFXXXw/-.jpg' ,title: 'Джинсы 4', price: 5500, description: 'Синего цвета, прямые'},
    {id: '8', img: 'https://ae01.alicdn.com/kf/HTB1lkXUSFXXXXa.XpXXq6xXFXXXw/-.jpg' ,title: 'Куртка 5', price: 12000, description: 'Зеленого цвета, теплая'},
    {id: '9', img: 'https://ae01.alicdn.com/kf/HTB1lkXUSFXXXXa.XpXXq6xXFXXXw/-.jpg' ,title: 'Джинсы', price: 5000, description: 'Синего цвета, прямые'},
    {id: '10', img: 'https://ae01.alicdn.com/kf/HTB1lkXUSFXXXXa.XpXXq6xXFXXXw/-.jpg' ,title: 'Куртка', price: 12000, description: 'Зеленого цвета, теплая'},
    {id: '11', img: 'https://ae01.alicdn.com/kf/HTB1lkXUSFXXXXa.XpXXq6xXFXXXw/-.jpg' ,title: 'Джинсы 2', price: 5000, description: 'Синего цвета, прямые'},
    {id: '12', img: 'https://ae01.alicdn.com/kf/HTB1lkXUSFXXXXa.XpXXq6xXFXXXw/-.jpg' ,title: 'Куртка 8', price: 122, description: 'Зеленого цвета, теплая'},
    {id: '13', img: 'https://ae01.alicdn.com/kf/HTB1lkXUSFXXXXa.XpXXq6xXFXXXw/-.jpg' ,title: 'Джинсы 3', price: 5000, description: 'Синего цвета, прямые'},
    {id: '14', img: 'https://ae01.alicdn.com/kf/HTB1lkXUSFXXXXa.XpXXq6xXFXXXw/-.jpg' ,title: 'Куртка 7', price: 600, description: 'Зеленого цвета, теплая'},
    {id: '15', img: 'https://ae01.alicdn.com/kf/HTB1lkXUSFXXXXa.XpXXq6xXFXXXw/-.jpg' ,title: 'Джинсы 4', price: 5500, description: 'Синего цвета, прямые'},
    {id: '16', img: 'https://ae01.alicdn.com/kf/HTB1lkXUSFXXXXa.XpXXq6xXFXXXw/-.jpg' ,title: 'Куртка 5', price: 12000, description: 'Зеленого цвета, теплая'},
]

const getTotalPrice = (items = []) => {
    return items.reduce((acc, item) => {
        return acc += item.price
    }, 0)
}

const ProductList = () => {
    const [addedItems, setAddedItems] = useState([]);
    const {tg, queryId} = useTelegram();

    const onSendData = useCallback(() => {
        const data = {
            products: addedItems,
            totalPrice: getTotalPrice(addedItems),
            queryId,
        }
        // const onSendData = useCallback(() => {
        //     const data = {
        //         products: addedItems,
        //         totalPrice: getTotalPrice(addedItems),
        //         queryId,
        //     }
        //     tg.sendData(JSON.stringify(data))
        // }, [addedItems])
        fetch('http://26.85.197.191:DESKTOP-7CENSV11', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
    }, [addedItems])

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData)
        return () => {
            tg.offEvent('mainButtonClicked', onSendData)
        }
    }, [onSendData])

    const onAdd = (product) => {
        const alreadyAdded = addedItems.find(item => item.id === product.id);
        let newItems = [];

        if(alreadyAdded) {
            newItems = addedItems.filter(item => item.id !== product.id);
        } else {
            newItems = [...addedItems, product];
        }

        setAddedItems(newItems)

        if(newItems.length === 0) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
            tg.MainButton.setParams({
                text: `Купить ${getTotalPrice(newItems)}₽`
            })
        }
    }

    return (
        <div className={'list'}>
            {products.map(item => (
                <ProductItem
                    product={item}
                    onAdd={onAdd}
                    className={'item'}
                />
            ))}
        </div>
    );
};

export default ProductList;
