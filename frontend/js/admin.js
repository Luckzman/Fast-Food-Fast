const token = JSON.parse(localStorage.getItem('data'));
const options = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};
const createElement = e => document.createElement(e);
const appendChild = (Parent, child) => Parent.appendChild(child);

const logoutBtn = document.querySelector('.button');
logoutBtn.addEventListener('click', () => {
  sessionStorage.clear();
  localStorage.clear();
  window.location = 'index.html';
});

const addMenu = (e) => {
  e.preventDefault();
  const food_name = document.getElementById('foodName').value;
  const description = document.getElementById('description').value;
  const price = document.getElementById('price').value;
  const category = document.getElementById('category').value;
  const image = document.getElementById('image');

  const url = 'api/v1/menu';
  const data = new FormData();
  data.append('food_name', food_name);
  data.append('description', description);
  data.append('price', price);
  data.append('category', category);
  data.append('image', image.files[0]);
  const option = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: data,
  };
  fetch(url, option)
    .then(res => res.json())
    .then(data => alert(data.message))
    .catch(err => console.log(err));
};

const addMenuContent = document.getElementById('addMenu').addEventListener('submit', addMenu);

const editMenu = () => {
  console.log('edit menu');
};

const deleteMenu = () => {
  console.log('edit menu');
};

const getMenu = () => {
  const getMenuUrl = 'api/v1/menu';
  fetch(getMenuUrl)
    .then(res => res.json())
    .then((data) => {
      const menuTable = document.getElementById('menu-table');
      const menuHeader = createElement('thead');
      menuHeader.innerHTML = `
          <th></th>
          <th>name</th>
          <th>description</th>
          <th>price</th>
          <th>category</th>
          <th>edit</th>
          <th>delete</th>`;
      appendChild(menuTable, menuHeader);
      const menuTableBody = createElement('tbody');
      data.menu.forEach((menuItem) => {
        const menuTableRow = createElement('tr');
        const menuImg = createElement('td');
        const menuImgData = createElement('img');
        menuImgData.src = menuItem.image;
        appendChild(menuImg, menuImgData);
        const menuName = createElement('td');
        menuName.textContent = menuItem.food_name;
        const menuDes = createElement('td');
        menuDes.textContent = menuItem.description;
        const menuPrice = createElement('td');
        menuPrice.textContent = menuItem.price;
        const menuCat = createElement('td');
        menuCat.textContent = menuItem.category;
        const menuEditBtn = createElement('td');
        const menuEditLink = createElement('a');
        menuEditLink.href = '#new-food-modal';
        menuEditLink.innerHTML = '<i class="fas fa-edit"></i>';
        menuEditLink.addEventListener('click', editMenu);
        appendChild(menuEditBtn, menuEditLink);
        const menuDeleteBtn = createElement('td');
        const menuDeleteBtnIco = createElement('i');
        menuDeleteBtnIco.className = 'fas fa-times-circle red';
        menuDeleteBtnIco.addEventListener('click', deleteMenu);
        appendChild(menuDeleteBtn, menuDeleteBtnIco);
        appendChild(menuTableRow, menuImg);
        appendChild(menuTableRow, menuName);
        appendChild(menuTableRow, menuDes);
        appendChild(menuTableRow, menuPrice);
        appendChild(menuTableRow, menuCat);
        appendChild(menuTableRow, menuEditBtn);
        appendChild(menuTableRow, menuDeleteBtn);
        /* menuTableBody.innerHTML = `
            <td><img src=${menuItem.image} alt=""></td>
            <td>${menuItem.food_name}</td>
            <td>${menuItem.description}</td>
            <td>${menuItem.price}</td>
            <td>${menuItem.category}</td>
            <td><a href="#new-food-modal"><i class="fas fa-edit"></i></a></td>
            <td><i class="fas fa-times-circle red"></i></td>`; */
        appendChild(menuTableBody, menuTableRow);
        appendChild(menuTable, menuTableBody);
      });
    })
    .catch(error => console.log(error));
};

const orderStatus = (orderId) => {
  const order_status = document.querySelector('input[name="order_status"]:checked').value;
  const data = { order_status };
  const option = {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(data),
  };
  const url = `api/v1/orders/${orderId}`;
  fetch(url, option)
    .then(res => res.json())
    .then((data) => {
      alert(data.message);
      window.location = '#tab2';
    })
    .catch(error => console.log(error));
};

const getOrderDetails = (orderId) => {
  const url = `api/v1/orders/${orderId}`;
  fetch(url, options)
    .then(res => res.json())
    .then((data) => {
      const {
        id, firstname, lastname, cart, additional_info, address, city, state,
      } = data.order;
      // const orderDetials = document.getElementById('order-details');
      const username = document.getElementById('username');
      username.textContent = `${firstname} ${lastname}`;
      const cartInfo = document.getElementById('cart-info');
      cartInfo.innerHTML = `
      <h3>Cart Item (Qty)</h3>`;
      cart.forEach((cartItems) => {
        const cartContent = createElement('p');
        cartContent.textContent = `${cartItems.food} (${cartItems.quantity})`;
        appendChild(cartInfo, cartContent);
      });
      const deliveryInfo = document.getElementById('delivery-info');
      deliveryInfo.innerHTML = `
        <h3>delivery infomation</h3>
        <p>${address}</p>
        <p>${city}</p>
        <p>${state}</p>
        <p>${additional_info}</p>`;
      const updateOrderStatus = document.getElementById('update-order-status');
      updateOrderStatus.addEventListener('submit', (evt) => {
        evt.preventDefault();
        orderStatus(id);
      });
    })
    .catch(error => console.log(error));
};

const getOrder = () => {
  const getOrderUrl = 'api/v1/orders';
  fetch(getOrderUrl, options)
    .then(res => res.json())
    .then((data) => {
      const orderTable = document.getElementById('order-table');
      const orderHeading = createElement('tr');
      orderHeading.innerHTML = `
          <th>name</th>
          <th>state</th>
          <th>time/date of order</th>
          <th>order status</th>
          <th>Admin Action</th>`;
      appendChild(orderTable, orderHeading);
      data.order.forEach((orderItems) => {
        const {
          id, firstname, lastname, state, order_status, created_date,
        } = orderItems;
        const orderBody = createElement('tr');
        orderBody.innerHTML = `
            <td>${firstname} ${lastname}</td>
            <td>${state}</td>
            <td>${created_date}</td>
            <td>${order_status}</td>`;
        const viewDetails = createElement('td');
        const viewDetailsBtn = createElement('button');
        viewDetailsBtn.textContent = 'View Details';

        viewDetailsBtn.addEventListener('click', () => {
          document.location = '#accept/delete-modal';
          getOrderDetails(id);
        });
        appendChild(viewDetails, viewDetailsBtn);
        appendChild(orderBody, viewDetails);
        appendChild(orderTable, orderBody);
      });
    })
    .catch(error => console.log(error));
};

const getUsers = () => {
  const url = 'api/v1/user/admin';
  fetch(url, options)
    .then(res => res.json())
    .then((data) => {
      console.log(data);
      const userTable = document.getElementById('user-table');
      const userTableHeader = createElement('tr');
      userTableHeader.innerHTML = `
        <th>image</th>
        <th>fullname</th>
        <th>email</th>
        <th>phone</th>
        <th>address</th>
        <th>state</th>
        <th>user Status</th>`;
      appendChild(userTable, userTableHeader);
      data.user.forEach((userItem) => {
        console.log(userItem);
        const userTableBody = createElement('tr');
        userTableBody.innerHTML = `
          <td><img src=${userItem.image}></td>
          <td>${userItem.firstname} ${userItem.lastname}</td>
          <td>${userItem.email}</td>
          <td>${userItem.phone}</td>
          <td>${userItem.address}, ${userItem.city}</td>
          <td>${userItem.state}</td>
          <td>${userItem.user_status}</td>`;
        appendChild(userTable, userTableBody);
      });
    })
    .catch(error => console.log(error));
};

document.addEventListener('DOMContentLoaded', () => {
  addMenuContent;
  getMenu();
  getOrder();
  getUsers();
});
