const createElement = element => document.createElement(element);
const appendChild = (parent, child) => parent.appendChild(child);

const displayCart = () => {
  const cartTable = document.getElementById('cart-table');
  const tableHeader = createElement('tr');
  tableHeader.innerHTML = `
    <th></th>
    <th></th>
    <th>food</th>
    <th>Price</th>
    <th>Quantity</th>
    <th>Category</th>
    <th>Sub-Total</th>`;
  appendChild(cartTable, tableHeader);
  const cart = JSON.parse(localStorage.getItem('cart'));
  console.log(cart);
  let Total = 0;
  cart.forEach((cartItem) => {
    const subTotal = parseInt(cartItem.quantity, 10) * parseInt(cartItem.menu.price, 10);
    Total += subTotal;
    const tableBody = createElement('tr');
    tableBody.innerHTML = `
        <td><i class="fas fa-times-circle red"></i></td>
        <td><img src=${cartItem.menu.image} alt=""></td>
        <td>${cartItem.menu.food_name}</td>
        <td>${cartItem.menu.price}</td>
        <td>${cartItem.quantity}</td>
        <td>${cartItem.menu.category}</td>
        <td>${subTotal}</td>`;
    appendChild(cartTable, tableBody);
  });
  console.log(Total);
  const calcTotal = document.querySelector('.order-content-left');
  calcTotal.innerHTML = `
    <table>
        <tr>
            <th>sub total</th>
            <th>${Total}</th>
        </tr>
        <tr>
            <td>total</td>
            <td>${Total}</td>
        </tr>
    </table>`;
  const checkout = document.getElementById('checkout-btn');
  checkout.addEventListener('click', () => {
    window.location.assign('checkout.html');
  });
};

document.addEventListener('DOMContentLoaded', displayCart);
