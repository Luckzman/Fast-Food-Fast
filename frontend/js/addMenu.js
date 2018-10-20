
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
  const token = JSON.parse(localStorage.getItem('data'));
  console.log(token);
  const options = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: data,
  };

  fetch(url, options)
    .then(res => res.json())
    .then(data => alert(data.message))
    .catch(err => console.log(err));
};

document.getElementById('addMenu').addEventListener('submit', addMenu);
