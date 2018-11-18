document.addEventListener('DOMContentLoaded', () => {
  const token = JSON.parse(localStorage.getItem('data'));

  const cartitem = [];
  const cartSummary = document.getElementById('order-details'); // display cart summary
  let total = 0;

  const carts = JSON.parse(sessionStorage.getItem('cart'));
  carts.forEach((cart) => {
    const cartinput = {
      food: cart.menu.food_name,
      quantity: cart.quantity,
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

  const createOrder = document.getElementById('order-form');
  createOrder.addEventListener('submit', (e) => {
    e.preventDefault();
    const additional_info = document.getElementById('info').value;
    const data = {
      cart: cartitem,
      additional_info,
    };
    const url = 'api/v1/orders';
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
      })
      .catch(error => console.log(error));
  });

  const fullName = document.getElementById('fullname');
  const address = document.getElementById('address');
  const city = document.getElementById('city');
  //   const state = document.getElementById('state');
  const phone = document.getElementById('phone');

  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const url = 'api/v1/user/delivery_info/';
  fetch(url, options)
    .then(res => res.json())
    .then((data) => {
      fullName.value = `${data.data.firstname} ${data.data.lastname}`;
      address.value = `${data.data.address}`;
      city.value = `${data.data.city}`;
      //   state.option = `${Lagos}`;
      phone.value = `${data.data.phone}`;
    })
    .catch(error => console.log(error));
});
