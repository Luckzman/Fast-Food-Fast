const createElement = element => document.createElement(element);
const appendChild = (Parent, child) => Parent.appendChild(child);

const orderHistory = () => {
  const logoutBtn = document.getElementById('logout');
  logoutBtn.addEventListener('click', () => {
    sessionStorage.clear();
    localStorage.clear();
    window.location = 'index.html';
  });
  const cartCount = document.getElementById('cart-count');
  cartCount.textContent = JSON.parse(sessionStorage.getItem('cart')).length;
  const url = 'api/v1/user/orders';
  const token = JSON.parse(localStorage.getItem('data'));
  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json; charset=utf-8',
    },
  };
  fetch(url, options)
    .then(res => res.json())
    .then((data) => {
      const orderHistoryTable = document.getElementById('order-history-table');
      const tableHeader = createElement('tr');
      tableHeader.innerHTML = `
        <th>order id</th>
        <th>status</th>
        <th>date of order</th>
        <th>cart</th>`;
      appendChild(orderHistoryTable, tableHeader);

      data.order.forEach((userOrder) => {
        const tableBody = createElement('tr');
        tableBody.innerHTML = `
          <td>${userOrder.id}</td>
          <td>${userOrder.order_status}</td>
          <td>${userOrder.created_date}</td>`;
        const btnColumn = createElement('td');
        const cartBtn = createElement('button');
        cartBtn.textContent = 'view cart';
        cartBtn.addEventListener('click', () => {
          window.location = '#view-cart';
          const cartBody = document.getElementById('cart-info');
          cartBody.innerHTML = `
            <div class="cart-title"><h2>Cart (Qty)</h2></div><div class="price-title"><h2>Price</h2></div>`;
          userOrder.cart.forEach((cartItem) => {
            const cartContent = createElement('div');
            cartContent.innerHTML = `
            <div class="cart-title"><p>${cartItem.food} (${cartItem.quantity})</p></div>
            <div class="price-title"><p>${cartItem.price}</p></div>`;
            appendChild(cartBody, cartContent);
          });
        });
        appendChild(btnColumn, cartBtn);
        appendChild(tableBody, btnColumn);
        appendChild(orderHistoryTable, tableBody);
      });
    })
    .catch(error => console.log(error));
};

document.addEventListener('DOMContentLoaded', orderHistory);
