const createElement = element => document.createElement(element);
const appendChild = (parent, child) => parent.appendChild(child);

const getMenu = () => {
  const container = document.getElementById('container');
  container.className = 'container top';
  const url = '/api/v1/menu';

  fetch(url)
    .then(res => res.json())
    .then((data) => {
      const menus = data.menu;
      const menuCategory = {};
      menus.forEach((menu) => {
        menuCategory[menu.category]
          ? menuCategory[menu.category]
            .push({ id: menu.id, food_name: menu.food_name, image: menu.image })
          : (menuCategory[menu.category] = [], menuCategory[menu.category]
            .push({ id: menu.id, food_name: menu.food_name, image: menu.image }));
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
            const addToCart = createElement('button');
            addToCart.textContent = 'Add To Cart';

            appendChild(catalog, imgContainer);
            appendChild(imgContainer, img);
            appendChild(imgContainer, p);
            appendChild(imgContainer, btnContainer);
            appendChild(btnContainer, viewDetails);
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
