// auth.js - Håndterer registrering og innlogging

document.addEventListener('DOMContentLoaded', () => {
  const registerForm = document.getElementById('registerForm');
  const loginForm = document.getElementById('loginForm');

  if (registerForm) {
    registerForm.addEventListener('submit', handleRegistration);
  }

  if (loginForm) {
    loginForm.addEventListener('submit', handleLogin);
  }
});

// Felles valideringsfunksjon for innlogging og registrering hvor hensikten er å unngå duplisert kode 
function validateInputs(username, password, errorElement) {
  if (!username || !password) {
    errorElement.textContent = 'Vennligst fyll ut begge feltene.';
    Logger.logWarn('Auth', 'Manglende brukernavn eller passord ved innsendelse');
    return false;
  }
  return true;
}

// Håndterer registrering
async function handleRegistration(event) {
  event.preventDefault();

  const usernameInput = document.getElementById('regUsername');
  const passwordInput = document.getElementById('regPassword');
  const errorText = document.getElementById('registerError');

  const username = usernameInput.value.trim();
  const password = passwordInput.value;

  if (!validateInputs(username, password, errorText)) return;

  try {
    await registerUser({ username, password });
    Logger.logInfo('Auth', 'Bruker registrert');
    window.location.href = 'dashboard.html';
  } catch (err) {
    Logger.logError('Auth', 'handleRegistration()', err);
    
    errorText.textContent = 
    err.message.includes('i bruk') 
    ? 'Brukernavnet er allerede i bruk.'
    : 'Kunne ikke registrere bruker. Prøv igjen.';
  }
}
// Håndterer innlogging
async function handleLogin(event) {
  event.preventDefault();

  const usernameInput = document.getElementById('loginUsername');
  const passwordInput = document.getElementById('loginPassword');
  const errorText = document.getElementById('loginError');

  const username = usernameInput.value.trim();
  const password = passwordInput.value;

  if (!validateInputs(username, password, errorText)) return;

  try {
    const user = await getUserByUsername(username);

    if (user && user.password === password) {
      localStorage.setItem('loggedInUser', JSON.stringify(user));
      Logger.logInfo('Auth', `Innlogging vellykket for ${username}`);
      window.location.href = 'dashboard.html';
    } else {
      Logger.logWarn('Auth', 'Feil brukernavn eller passord');
      errorText.textContent = 'Feil brukernavn eller passord.';
    }
  } catch (err) {
    const status = err?.response?.status || err?.status || 'Ukjent';
    Logger.logError('Auth', 'handleLogin()', err);
    errorText.textContent = 'Kunne ikke logge inn. Prøv igjen.';
  }
}