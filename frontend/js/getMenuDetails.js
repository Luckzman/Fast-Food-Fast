
const menuDetails = () => {
  const menuId = window.location.href.split('?id=')[1];
  let cart = []; /* initialize an empty cart */
  const cartCount = document.getElementById('cart-count'); /* get cart counter from DOM */
  if (!sessionStorage.getItem('cart')) { /* check if localStorage is empty */
    cartCount.textContent = 0;
  } else {
    cartCount.textContent = JSON.parse(sessionStorage.getItem('cart')).length;
    cart = JSON.parse(sessionStorage.getItem('cart')); /* populate cart with localstorage items */
  }
  const reviewFormContainer = document.getElementById('review-form-container');
  const addReviewBtn = document.getElementById('addReview');
  addReviewBtn.addEventListener('click', () => {
    reviewFormContainer.classList.remove('none');
  });


  const addReviewForm = document.getElementById('add-review');
  addReviewForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const reviewInput = document.getElementById('review').value;
    const ratingInput = document.getElementById('rating').value;

    const url = `api/v1/menu/${menuId}/review`;
    const data = {
      review: reviewInput,
      rating: ratingInput,
    };
    const token = JSON.parse(localStorage.getItem('data'));
    const option = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    };
    fetch(url, option)
      .then(res => res.json())
      .then((data) => {
        console.log(data);
        if (data.status === 'fail') {
          alert(data.message);
        } else {
          alert(data.message);
        }
      })
      .catch(error => console.log(error));
  });


  const displayCart = document.querySelector('.cart');
  displayCart.addEventListener('click', () => {
    // console.log(localStorage.getItem('data'));
    if ((cart.length < 1) && (localStorage.getItem('data'))) {
      alert('cart is empty');
    } else if ((cart.length > 0) && (localStorage.getItem('data'))) {
      window.location = 'cart.html'; /* redirect to cart page */
    } else {
      alert('please login or sign up');
    }
  });

  const menuImg = document.getElementById('menuImg');
  menuImg.className = 'order-img';
  const menuDetail = document.getElementById('menuDetail');
  menuDetail.className = 'order-content';
  const menuInput = document.getElementById('menuInput');
  menuInput.className = 'order-input';
  const menuDescription = document.getElementById('content1');
  // menuDescription.className = 'order-description';

  //   const appendChild = (parent, child) => parent.appendChild(child);

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
            <p>${data.menu.description}</p>`;
        
        // <section id="content2">
        //     <div class="flex-row">
        //         <div class="review-img">
        //             <img src="./../images/review_pix_1.png" alt="reviewer's image">
        //         </div>
        //         <div class="review-info">
        //             <p>Sasha Edwin</p>
        //             <div class="star-rating">
        //                 <span class="fa fa-star checked"></span>
        //                 <span class="fa fa-star checked"></span>
        //                 <span class="fa fa-star checked"></span>
        //                 <span class="fa fa-star checked"></span>
        //                 <span class="fa fa-star checked checked"></span>
        //             </div>
        //             <p>Jerky jowl pork chop tongue, kielbasa shank venison. Capicola shank pig ribeye leberkas filet mignon brisket beef kevin tenderloin porchetta. Capicola fatback </p>
        //         </div>
        //     </div>
        // </section>`;
      const cartQty = document.getElementById('orderQty');
      const orderBtn = document.getElementById('orderBtn');
      orderBtn.addEventListener('click', () => {
        cart.push({ quantity: cartQty.value, menu: data.menu });
        sessionStorage.setItem('cart', JSON.stringify(cart));
        cartCount.textContent = JSON.parse(sessionStorage.getItem('cart')).length;
      });
    })
    .catch(error => console.log(error));
};

document.addEventListener('DOMContentLoaded', menuDetails);
