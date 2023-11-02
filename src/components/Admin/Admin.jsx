const mysql = require('mysql');

// Создание подключения к базе данных
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'u2319752_default',
  password: 'S2jFZJ7vo12fO7ga',
  database: 'u2319752_default',
});

// Установка соединения
connection.connect((error) => {
  if (error) {
    console.error('Ошибка подключения к базе данных:', error);
    throw error;
  }
  console.log('Подключение к базе данных успешно установлено');
});

// Чтение всех товаров из базы данных
const fetchProducts = () => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM products', (error, results) => {
      if (error) {
        console.error('Ошибка выполнения операции чтения:', error);
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

// Запись заказа в базу данных
const saveOrder = (order) => {
  return new Promise((resolve, reject) => {
    connection.query('INSERT INTO orders SET ?', order, (error, result) => {
      if (error) {
        console.error('Ошибка выполнения операции записи:', error);
        reject(error);
      } else {
        resolve(result.insertId);
      }
    });
  });
};

// Пример использования
const exampleUsage = async () => {
  try {
    // Получаем все товары из базы данных
    const allProducts = await fetchProducts();
    console.log('Все товары:', allProducts);

    // Записываем заказ в базу данных
    const order = {
      products: JSON.stringify(allProducts),
      totalPrice: 22122,
    };
    const orderId = await saveOrder(order);
    console.log('Заказ успешно сохранен. ID заказа:', orderId);
  } catch (error) {
    console.error('Произошла ошибка:', error);
  } finally {
    // Закрытие соединения
    connection.end((error) => {
      if (error) {
        console.error('Ошибка закрытия соединения:', error);
        throw error;
      }
      console.log('Соединение закрыто');
    });
  }
};

exampleUsage();
