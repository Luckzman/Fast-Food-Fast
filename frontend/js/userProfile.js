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
const stateSelectOption = document.getElementById('state-input');
const stateContainer = document.getElementById('state-container');
const imgContainer = document.getElementById('img-input');
const updateInfoBtn = document.getElementById('updateUserDetailsBtn');
const deliveryBtn = document.getElementById('submitDeliveryBtn');
const updatedeliveryBtn = document.getElementById('updateDeliveryBtn');
const stateInputContainer = document.getElementById('state-input-container');
const updateInfoForm = document.getElementById('updateInfoForm');


const updateInfoLink = document.getElementById('update-user-info');
updateInfoLink.addEventListener('click', () => {
  emailInput.removeAttribute('disabled');
  phoneInput.removeAttribute('disabled');
  imgContainer.classList.remove('none');
  updateInfoBtn.classList.remove('none');
});

updateInfoForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const url = 'api/v1/user';
  // const data = new FormData();
  // data.append('email', emailInput.value);
  // data.append('phone', phoneInput.value);
  // data.append('image', image.files[0]);

  const options = {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify({
      email: emailInput.value,
      phone: phoneInput.value,
    }),
  };
  fetch(url, options)
    .then(res => res.json())
    .then((data) => {
      console.log(data);
      alert(data.message);
      emailInput.textContent = `${data.user.email}`;
      phoneInput.textContent = `${data.user.phone}`;
      emailInput.setAttribute('disabled', 'disabled');
      phoneInput.setAttribute('disabled', 'disabled');
      imgContainer.classList.add('none');
      updateInfoBtn.classList.add('none');
    })
    .catch(error => console.log(error));
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

updatedeliveryBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const url = 'api/v1/delivery_info';
  const options = {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify({
      address: addressInput.value,
      city: cityInput.value,
      // state: stateSelectOption.options[2].value,
    }),
  };
  fetch(url, options)
    .then(res => res.json())
    .then((data) => {
      // console.log(data, stateSelectOption.options[2].value);
      alert(data.message);
    })
    .catch(error => console.log(error));
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
  const url = 'api/v1/delivery_info';
  fetch(url, options)
    .then(res => res.json())
    .then((data) => {
      const {
        address, city, state,
      } = data.data;
      addressInput.value = address;
      cityInput.value = city;
      stateInput.value = state;
    })
    .catch(error => console.log(error));
};

const userProfile = () => {
  userInfo();
  userDeliveryInfo();
  if (!token) {
    window.location = 'index.html#signin-modal';
  }
};


document.addEventListener('DOMContentLoaded', userProfile);
