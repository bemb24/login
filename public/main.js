document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
  
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
  
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;

      console.log({username, password});
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        
        body: JSON.stringify({ username, password }),
      });

      console.log(response);
  
      if (response.ok) {
        const container = document.querySelector('.container');
        container.innerHTML = '';
        
        const message = document.createElement('p');
        message.textContent = '¡Felicitaciones! Has iniciado sesión correctamente.';
        
        const logoutButton = document.createElement('a');
        logoutButton.href = 'http://localhost:3000/logout';
        logoutButton.textContent = 'Logout';
        
        container.appendChild(message);
        container.appendChild(logoutButton);
        
        logoutButton.addEventListener('click', () => {
          window.location.href = 'file:///C:/Users/steven%20Garcia/Desktop/proyecto%20Bonie/login/public/index.html'; // Redirige a la página de inicio de sesión al hacer logout
        });
      } else {
        document.getElementById('username').value = '';
        document.getElementById('password').value = '';
        alert('Usuario incorrecto');
      }
    });
  });
  