// user.js - Administrerer innlogget bruker og profilvisning

window.addEventListener('DOMContentLoaded', async () => {
    if (!window.UserCard || !window.UserLoader || !window.LikedUsers) {
    Logger.logError('User', 'Viktig data mangler', new Error('UserCard, UserLoader eller LikedUsers ikke lastet'));
    return;
  }

  const currentUser = JSON.parse(localStorage.getItem('loggedInUser'));
  if (!currentUser) {
     Logger.logWarn('User', 'Ingen innlogget bruker funnet - omdirigerer til innlogging');
    window.location.href = 'index.html';
    return;
  }

  document.getElementById('editProfileBtn')?.addEventListener('click', () => {
  Logger.logInfo('Dashboard', 'Navigerer til profilredigering');
  window.location.href = 'profile.html'; 
});

  // *Tilleggsfunksjon* 
  Greeting.show(currentUser.username); 


  await loadOrReuseUser();
  LikedUsers.updateLikedUsersList();
});

// Gjenbruker lagret bruker eller henter ny
async function loadOrReuseUser() {
  try {
    const stored = localStorage.getItem('currentRandomUser');
   

    if (stored) {
      const user = JSON.parse(stored);
    UserCard.showUser(user);
      Logger.logInfo('User', 'Tidligere bruker lastet fra lagring');
      return;
    }
  
      await UserLoader.loadNewUser();
    Logger.logInfo('User', 'Ny bruker hentet fra API');
  } catch (err) {
    Logger.logError('User', 'loadOrReuseUser()', err);
  }
}