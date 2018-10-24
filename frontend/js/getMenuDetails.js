const container = document.getElementById('container');
container.className = 'container';
const menuRow = document.getElementById('menuRow');
menuRow.className = 'order-row';
const menuImg = document.getElementById('menuImg');
menuImg.className = 'order-img';
const menuDetail = document.getElementById('menuDetail');
menuDetail.className = 'order-content';
const menuInput = document.getElementById('menuInput');
menuInput.className = 'order-input';
const menuDescription = document.getElementById('menuDescription');
menuDescription.className = 'order-description';

const appendChild = (parent, child) => parent.appendChild(child);

const menuDetails = () => {
  const menuId = window.location.href.split('?id=')[1];
  const url = `api/v1/menu/${menuId}`;
  fetch(url)
    .then(res => res.json())
    .then((data) => {
      console.log(data.menu);
      menuImg.innerHTML = `
      <img src=${data.menu.image} alt="order image">
      <div class="order-img-search"><a href=${data.menu.image}><i class="fas fa-search"></i></a></div>`;
      menuDetail.innerHTML = `
        <h3>${data.menu.food_name}</h3>
        <div>
            <p>${data.menu.price}</p>
            <div class="star-rating">
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked unchecked"></span>
            </div>
        </div>
        <p>Category: <span>${data.menu.category}</span></p>`;
      menuDescription.innerHTML = `
        <input id="tab1" type="radio" name="tabs" checked>
        <label for="tab1">Description</label>
        <input id="tab2" type="radio" name="tabs">
        <label for="tab2">Reviews</label>
        <section id="content1">
            <p>${data.menu.description}</p>
        </section>
        <section id="content2">
            <div class="flex-row">
                <div class="review-img">
                    <img src="./../images/review_pix_1.png" alt="reviewer's image">
                </div>
                <div class="review-info">
                    <p>Sasha Edwin</p>
                    <div class="star-rating">
                        <span class="fa fa-star checked"></span>
                        <span class="fa fa-star checked"></span>
                        <span class="fa fa-star checked"></span>
                        <span class="fa fa-star checked"></span>
                        <span class="fa fa-star checked checked"></span>
                    </div>
                    <p>Jerky jowl pork chop tongue, kielbasa shank venison. Capicola shank pig ribeye leberkas filet mignon brisket beef kevin tenderloin porchetta. Capicola fatback </p>
                </div>
            </div>
        </section>`;
      appendChild(container, menuRow);
      appendChild(menuRow, menuImg);
      appendChild(menuRow, menuDetail);
      appendChild(menuRow, menuInput);
      appendChild(container, menuDescription);
    })
    .catch(error => console.log(error));
};

document.addEventListener('DOMContentLoaded', menuDetails);
