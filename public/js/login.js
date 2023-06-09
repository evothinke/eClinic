const loginForm = document.querySelector('form');
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;


if(email && password) {
  const response = await fetch('/login', {
    method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
  });
  console.log(response)
  if (response.ok) {
  
    document.location.replace(response.url);
    console.log("successful response")
  } else {
    document.getElementById('loginMessage').innerText = 'Email or Password not found';

  }
  }
});


document
.querySelector('.login-form')
.addEventListener('submit', loginForm);

