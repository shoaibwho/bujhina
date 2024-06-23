document.getElementById('registerForm').addEventListener('submit', function (e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    fetch('http://localhost:3001/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data) {
            alert('Registration successful!');
            window.location.href = '/login.html';
        } else {
            alert('Registration failed. Please try again.');
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});
S