const createElement = element => document.createElement(element);
const appendChild = (parent, child) => parent.appendChild(child);

const getMenu = () => {
  const container = document.getElementById('container');
  container.className = 'container top';
  // const popularFood = document.getElementById('popularFood');
  //   popularFood.className = 'container top';
  //   const catalog = document.getElementById('catalog');
  //   catalog.className = 'catalog';
  //   const imgContainer = document.getElementById('imgContainer');
  //   imgContainer.className = 'img-container';
  //   const viewDetails = document.getElementById('viewDetails');
  //   const viewDetailsLink = document.getElementById('viewDetailsLink');
  //   const addToCart = document.getElementById('addToCart');


  //   appendChild(btnContainer, viewDetails);
  //   appendChild(btnContainer, addToCart);
  //   appendChild(viewDetails, viewDetailsLink);
  const url = '/api/v1/menu';

  fetch(url)
    .then(res => res.json())
    .then((data) => {
      console.log(data.menu);
      // loop through data.menu
      // return the unique data.menu.category to new array
      // add the content of array to the <h2> element
      // check if the data.menu.category === unique
      // add the content of the data.menu to the div
      const menus = data.menu;
      const menuCategory = {};
      menus.forEach((menu) => {
        menuCategory[menu.category]
          ? menuCategory[menu.category]
            .push({ food_name: menu.food_name, image: menu.image })
          : (menuCategory[menu.category] = [], menuCategory[menu.category]
            .push({ food_name: menu.food_name, image: menu.image }));
      });
      console.log(menuCategory);
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
          // const btnContainer = document.getElementById('btnContainer');
          // const viewDetails = document.getElementById('viewDetails');
          // // const viewDetailsLink = document.getElementById('viewDetailsLink');
          // const addToCart = document.getElementById('addToCart');

          menuCategory[menu].forEach((menu) => {
            const imgContainer = createElement('div');
            imgContainer.className = 'img-container';
            const img = createElement('img');
            img.src = menu.image;
            const p = createElement('p');
            p.textContent = menu.food_name;
            const btnContainer = createElement('div');
            const viewDetails = createElement('button');
            const viewDetailsLink = createElement('a');
            viewDetailsLink.textContent = 'view details';
            const addToCart = createElement('button');
            addToCart.textContent = 'Add To Cart';

            appendChild(catalog, imgContainer);
            appendChild(imgContainer, img);
            appendChild(imgContainer, p);
            appendChild(imgContainer, btnContainer);
            console.log(imgContainer);
            appendChild(btnContainer, viewDetails);
            appendChild(viewDetails, viewDetailsLink);
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
