const createElement = element => document.createElement(element);
const appendChild = (parent, child) => parent.appendChild(child);

const getMenu = () => {
  const container = document.getElementById('container');
  let cart = []; /* initialize an empty cart */
  const cartCount = document.getElementById('cart-count'); /* get cart counter from DOM */
  if (!sessionStorage.getItem('cart')) { /* check if localStorage is empty */
    cartCount.textContent = 0;
  } else {
    cartCount.textContent = JSON.parse(sessionStorage.getItem('cart')).length;
    cart = JSON.parse(sessionStorage.getItem('cart')); /* populate cart with localstorage items */
  }

  const displayCart = document.querySelector('.cart');
  displayCart.addEventListener('click', () => {
    if (cart.length < 1) {
      alert('Cart is empty');
    } if (localStorage.getItem('data')) {
      window.location = 'cart.html'; /* redirect to cart page */
    } else {
      alert('please login or sign up');
      window.location = 'index.html#signin-modal';
    }
  });

  const url = '/api/v1/menu';

  fetch(url)
    .then(res => res.json())
    .then((data) => {
      const menus = data.menu;
      const menuCategory = {};
      menus.forEach((menu) => { /* refactor data response based on category */
        menuCategory[menu.category]
          ? menuCategory[menu.category]
            .push({
              id: menu.id,
              food_name: menu.food_name,
              image: menu.image,
              price: menu.price,
              category: menu.category,
            })
          : (menuCategory[menu.category] = [], menuCategory[menu.category]
            .push({
              id: menu.id,
              food_name: menu.food_name,
              image: menu.image,
              price: menu.price,
              category: menu.category,
            }));
      });

      for (const menu in menuCategory) {
        if (menuCategory.hasOwnProperty(menu)) {
          const popularFood = createElement('div');
          popularFood.className = 'content-header';
          const catalog = createElement('div');
          catalog.className = 'catalog';
          const imgContainer = createElement('div');
          imgContainer.className = 'img-container';
          const h2 = createElement('h2');
          h2.textContent = menu;

          menuCategory[menu].forEach((menu) => {
            const imgContainer = createElement('div');
            imgContainer.className = 'img-container';
            const img = createElement('img');
            img.src = menu.image;
            const p = createElement('p');
            p.textContent = menu.food_name;
            const btnContainer = createElement('div');
            const viewDetails = createElement('button');
            viewDetails.textContent = 'view details';
            viewDetails.addEventListener('click', () => {
              window.location.assign(`menu-details.html?id=${menu.id}`);
            });

            const cartQty = createElement('input');
            cartQty.type = 'number';
            cartQty.value = 1;
            cartQty.min = 1;
            cartQty.max = 99;

            const addToCart = createElement('button');
            addToCart.textContent = 'Add To Cart';
            addToCart.addEventListener('click', () => {
              cart.push({ quantity: cartQty.value, menu });
              sessionStorage.setItem('cart', JSON.stringify(cart));
              cartCount.textContent = JSON.parse(sessionStorage.getItem('cart')).length;
            });
            appendChild(catalog, imgContainer);
            appendChild(imgContainer, img);
            appendChild(imgContainer, p);
            appendChild(imgContainer, btnContainer);
            appendChild(btnContainer, viewDetails);
            appendChild(btnContainer, cartQty);
            appendChild(btnContainer, addToCart);
          });
          appendChild(popularFood, h2);
          appendChild(container, popularFood);
          appendChild(container, catalog);
        }
      }
    })
    .catch(error => console.log(error));
};

document.addEventListener('DOMContentLoaded', getMenu);
