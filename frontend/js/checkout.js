const fullNameInput = document.getElementById('fullname');
const addressInput = document.getElementById('address');
const cityInput = document.getElementById('city');
const stateInput = document.getElementById('state');
const phoneInput = document.getElementById('phone');
const token = JSON.parse(localStorage.getItem('data'));

const cartitem = [];

const logoutBtn = document.getElementById('logout');
logoutBtn.addEventListener('click', () => {
  sessionStorage.clear();
  localStorage.clear();
  window.location = 'index.html';
});

const cartInfo = () => {
  const cartSummary = document.getElementById('order-details'); // display cart summary
  let total = 0;

  const carts = JSON.parse(sessionStorage.getItem('cart'));
  carts.forEach((cart) => {
    const cartinput = {
      food: cart.menu.food_name,
      quantity: cart.quantity,
      price: cart.menu.price,
    };
    const cost = cart.quantity * cart.menu.price;
    total += cost;
    const div = document.createElement('div');
    div.innerHTML = `
          <p>${cart.menu.food_name} (${cart.quantity}) <span>N${cost}</span></p>`;
    cartSummary.appendChild(div);
    cartitem.push(cartinput);
  });
  const cartCount = document.getElementById('cart-count');
  cartCount.textContent = `(${carts.length})`;
  const cartTotal = document.getElementById('cart-total');
  cartTotal.textContent = `N${total}`;
};

const getDeliveryInfo = () => {
  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const url = 'api/v1/user/delivery_info/';

  fetch(url, options)
    .then(res => res.json())
    .then((data) => {
      const {
        firstname, lastname, address, city, state, phone,
      } = data.data;
      fullNameInput.value = `${firstname} ${lastname}`;
      addressInput.value = `${address}`;
      cityInput.value = `${city}`;
      stateInput.value = `${state}`;
      phoneInput.value = `${phone}`;
    })
    .catch(error => console.log(error));
};

const createNewOrder = (e) => {
  e.preventDefault();
  const additional_info = document.getElementById('info').value;
  const url = 'api/v1/orders';
  const data = {
    cart: cartitem,
    additional_info,
  };
  const options = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(data),
  };

  fetch(url, options)
    .then(res => res.json())
    .then((data) => {
      alert(data.message);
      sessionStorage.clear();
      window.location = 'catalog.html';
    })
    .catch(error => console.log(error));
};
const createOrder = document.getElementById('order-form');
createOrder.addEventListener('submit', createNewOrder);


const checkout = () => {
  logoutBtn;
  cartInfo();
  getDeliveryInfo();
  createOrder;
};

document.addEventListener('DOMContentLoaded', checkout);
