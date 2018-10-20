const createUser = (event) => {
  event.preventDefault();
  const firstname = document.getElementById('firstName').value;
  const lastname = document.getElementById('lastName').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const password = document.getElementById('password').value;
  const rePassword = document.getElementById('re-password').value;
  const location = document.getElementById('location').value;

  const url = '/api/v1/auth/signup';

  const data = {
    firstname, lastname, email, phone, password, location,
  };

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(data),
  };

  fetch(url, options)
    .then(res => res.json())
    .then((data) => {
      let { message } = data;
      const { status } = data;
      if (password !== rePassword) {
        message = 'password does not match';
      }
      alert(message);
      if (status === 'success') {
        alert(message);
        window.location.replace('/index.html');
      }
    })
    .catch(error => console.log(error));
};

const loginUser = (e) => {
  e.preventDefault();
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  const url = '/api/v1/auth/login';

  const data = { email, password };

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(data),
  };

  fetch(url, options)
    .then(res => res.json())
    .then((userData) => {
      const { message, data } = userData;
      localStorage.setItem('data', JSON.stringify(data.token));
      if (data.user_status === 'admin') {
        alert('Admin login successful');
        window.location = '../admin-control-panel.html';
        return window.location;
      } alert(message);
      window.location = '/catalog.html';
    })
    .catch(error => console.log(error));
};


document.getElementById('signupUser').addEventListener('submit', createUser);
document.getElementById('loginUser').addEventListener('submit', loginUser);
