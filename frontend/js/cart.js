const createElement = element => document.createElement(element);
const appendChild = (parent, child) => parent.appendChild(child);

const displayCart = () => {
  const logoutBtn = document.getElementById('logout');
  logoutBtn.addEventListener('click', () => {
    sessionStorage.clear();
    localStorage.clear();
    window.location = 'index.html';
  });
  const cartTable = document.getElementById('cart-table');
  const tableHeader = createElement('tr');
  tableHeader.innerHTML = `
    <th></th>
    <th>food</th>
    <th>Price</th>
    <th>Quantity</th>
    <th>Category</th>
    <th>Sub-Total</th>
    <th></th>`;
  appendChild(cartTable, tableHeader);
  const cart = JSON.parse(sessionStorage.getItem('cart'));
  let Total = 0;
  cart.forEach((cartItem, index) => {
    const subTotal = parseInt(cartItem.quantity, 10) * parseInt(cartItem.menu.price, 10);
    Total += subTotal;
    const tableBody = createElement('tr');
    tableBody.innerHTML = `
        <td><img src=${cartItem.menu.image} alt=""></td>
        <td>${cartItem.menu.food_name}</td>
        <td>${cartItem.menu.price}</td>
        <td>${cartItem.quantity}</td>
        <td>${cartItem.menu.category}</td>
        <td>${subTotal}</td>`;
    const deleteColumn = createElement('td');

    const deleteBtn = createElement('span');
    deleteBtn.innerHTML = '<i class="fas fa-times-circle red"></i>';
    deleteBtn.addEventListener('click', () => {
      const deleteBtnParent = deleteBtn.parentElement.parentElement;
      deleteBtnParent.parentNode.removeChild(deleteBtnParent);
      cart.splice(index, 1);
      sessionStorage.setItem('cart', JSON.stringify(cart));
    });
    appendChild(deleteColumn, deleteBtn);
    appendChild(tableBody, deleteColumn);
    appendChild(cartTable, tableBody);
  });
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
    if (cart.length < 1) {
      alert('Cart is empty');
    } else {
      window.location.assign('checkout.html'); /* redirect to cart page */
    }
  });
};

document.addEventListener('DOMContentLoaded', displayCart);
