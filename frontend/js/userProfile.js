const token = JSON.parse(localStorage.getItem('data'));
const options = {
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json; charset=utf-8',
  },
};
const fullname = document.getElementById('fullname');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const addressInput = document.getElementById('address');
const cityInput = document.getElementById('city');
const stateInput = document.getElementById('state');
const stateContainer = document.getElementById('state-container');
const imgContainer = document.getElementById('img-input');
const updateInfoBtn = document.getElementById('updateUserDetails');
const deliveryBtn = document.getElementById('submitDeliveryBtn');
const updatedeliveryBtn = document.getElementById('updateDeliveryBtn');
const stateInputContainer = document.getElementById('state-input-container');

const updateInfoLink = document.getElementById('update-user-info');
updateInfoLink.addEventListener('click', () => {
  emailInput.removeAttribute('disabled');
  phoneInput.removeAttribute('disabled');
  imgContainer.classList.remove('none');
  updateInfoBtn.classList.remove('none');
});

const updateDeliveryLink = document.getElementById('updateDeliveryLink');
updateDeliveryLink.addEventListener('click', () => {
  addressInput.removeAttribute('disabled');
  cityInput.removeAttribute('disabled');
  stateContainer.classList.remove('none');
  if (!addressInput.value && !cityInput.value && !stateInput.value) {
    stateInputContainer.classList.add('none');
    deliveryBtn.classList.remove('none');
  } else {
    stateInputContainer.classList.add('none');
    updatedeliveryBtn.classList.remove('none');
  }
});

const userInfo = () => {
  const url = 'api/v1/user';
  fetch(url, options)
    .then(res => res.json())
    .then((data) => {
      const {
        firstname, lastname, phone, email,
      } = data.user;
      fullname.value = `${firstname} ${lastname}`;
      emailInput.value = email;
      phoneInput.value = phone;
    })
    .catch(error => console.log(error));
};

const userDeliveryInfo = () => {
  const addressInput = document.getElementById('address');
  const cityInput = document.getElementById('city');
  const stateInput = document.getElementById('state');
  const url = 'api/v1/delivery_info';
  fetch(url, options)
    .then(res => res.json())
    .then((data) => {
      const {
        address, city, state,
      } = data.data;
      addressInput.value = address;
      cityInput.value = city;
      stateInput.options[0].value = state;
    })
    .catch(error => console.log(error));
};

const userProfile = () => {
  userInfo();
  userDeliveryInfo();
};


document.addEventListener('DOMContentLoaded', userProfile);
