// profile.js - Håndterer brukerprofilvisning og endringer

document.addEventListener('DOMContentLoaded', () => {
  try {
    const form = document.getElementById('profileForm');
    const currentUser = JSON.parse(localStorage.getItem('loggedInUser'));

    if (!currentUser) {
      Logger.logWarn('ProfilePage', 'Ingen innlogget bruker - omdirigerer til innlogging');
      window.location.href = 'index.html'; 
      return;
    }

    const usernameInput = document.getElementById('editUsername');
    const passwordInput = document.getElementById('editPassword');
    const message = document.getElementById('updateMsg');

    if (!form || !usernameInput || !passwordInput || !message) {
      Logger.logError('ProfilePage', 'Et eller flere DOM-elementer mangler', new Error('DOM ikke komplett'));
      return;
    }

    Logger.logInfo('ProfilePage', `Skjema klart for bruker: ${currentUser.username}`);
    usernameInput.value = currentUser.username;

    form.addEventListener('submit', async (event) => {
      event.preventDefault();

      const newUsername = usernameInput.value.trim();
      const newPassword = passwordInput.value;

      message.textContent = '';
      message.classList.remove('feedback-success', 'feedback-error');

      if (!newUsername || newUsername === currentUser.username) {
        if (!newPassword) {
          message.textContent = 'Du må endre brukernavn eller passord.';
          message.classList.add('feedback-error');
          Logger.logWarn('ProfilePage', 'Ingen gyldige felt endret');
          return;
        }
      }

      const updatedData = {
        username: newUsername || currentUser.username,
        password: newPassword || currentUser.password
      };

      try {
        Logger.logInfo('ProfilePage', 'Sender oppdatering til server..');
        const status = await updateUser(currentUser._id, updatedData);

        const updatedUser = { ...currentUser, ...updatedData };
        localStorage.setItem('loggedInUser', JSON.stringify(updatedUser));

        Logger.logInfo('ProfilePage', `Brukerprofil oppdatert - status ${status}`);
        message.textContent = 'Profil oppdatert!';
        message.classList.add('feedback-success');

        setTimeout(() => {
          message.textContent = '';
        }, 3000);
      } catch (err) {
        Logger.logError('ProfilePage', 'Oppdatering feilet', err);
        message.textContent = 'Feil ved oppdatering. Prøv igjen.';
        message.classList.add('feedback-error');
      }
    });
  } catch (err) {
    Logger.logError('ProfilePage', 'Kritisk feil under lasting', err);
    const message = document.getElementById('updateMsg');
    if (message) {
      message.textContent = 'En feil oppstod ved lasting av profilen.';
      message.classList.add('feedback-error');
    }
  }
});
