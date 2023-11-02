import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Cart = ({ items }) => {
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const history = useHistory();

  const handlePayment = () => {
    // Здесь вы можете обработать оплату
    // Например, отправить данные на сервер для обработки платежа

    // Перенаправление на страницу выбора способа оплаты и ввода ФИО и номера
    history.push('/payment');
  };

  return (
    <div>
      <h2>Корзина</h2>
      {items.map((item) => (
        <div key={item.id}>
          <p>{item.title}</p>
          <p>{item.price}</p>
        </div>
      ))}
      <input
        type="text"
        placeholder="Введите ФИО"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Введите номер телефона"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <button onClick={handlePayment}>Оплатить</button>
    </div>
  );
};

export default Cart;
