const userList = document.getElementById('userList');
const loading = document.getElementById('loading');
const reloadBtn = document.getElementById('reloadBtn');

function fetchUsers() {
  loading.style.display = 'block';
  userList.innerHTML = '';

  fetch('https://jsonplaceholder.typicode.com/users')
    .then(res => {
      if (!res.ok) throw new Error('Failed to fetch users');
      return res.json();
    })
    .then(data => {
      loading.style.display = 'none';
      data.forEach(user => {
        const card = document.createElement('div');
        card.className = 'user-card';
        card.innerHTML = `
          <strong>Name:</strong> ${user.name}<br>
          <strong>Email:</strong> ${user.email}<br>
          <strong>Address:</strong> ${user.address.street}, ${user.address.city}, ${user.address.zipcode}
        `;
        userList.appendChild(card);
      });
    })
    .catch(err => {
      loading.style.display = 'none';
      userList.innerHTML = `<p class="error">⚠️ Error: ${err.message}</p>`;
    });
}

fetchUsers();
reloadBtn.addEventListener('click', fetchUsers);

