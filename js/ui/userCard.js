// userCard.js - Håndterer visning av brukerens profil

window.UserCard = {
  showUser: function (user) {
    const card = document.getElementById('userCard');

    if (!card) {
      Logger.logWarn('UserCard', 'Elementet #userCard finnes ikke i DOM');
      return;
    }

    if (!user || !user.name || !user.dob || !user.location || !user.picture) {
      Logger.logWarn('UserCard', 'Ufullstendig brukerdata - kort vises ikke');
      return;
    }

   try {
    card.innerHTML = `
      <img src="${user.picture.large}" alt="Profilbilde">
      <h3>${user.name.title} ${user.name.first} ${user.name.last}</h3>
      <p>Alder: ${user.dob.age}</p>
      <p>Bosted: ${user.location.city}, ${user.location.country}</p>
    `;
    Logger.logInfo('UserCard', `Brukerkort vist for ${user.name.first} ${user.name.last}`);
    } catch (err) {
      Logger.logError('UserCard', 'showUser()', err);
    }
  }
};