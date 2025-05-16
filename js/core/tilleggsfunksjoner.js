// tilleggsfunksjoner.js - Tilleggsfunksjoner som bonus

// *Tilleggsfunksjon*  "Vis personlig velkomstmelding"
window.Greeting = {
  show: function (username) {
    const container = document.getElementById('dashboardContainer');
    const header = document.getElementById('dashboardHeader');

    if (!container) {
      Logger.logWarn('Greeting', 'dashboardContainer eller header mangler.');
      return;
    }

    let greetingMessage = document.getElementById('greetingMessage');

    if (!greetingMessage) {
      greetingMessage = document.createElement('p');
      greetingMessage.id = 'greetingMessage';
      greetingMessage.classList.add('greeting-message');
    }

    greetingMessage.textContent = `Velkommen tilbake, ${username}! 😊`;
    Logger.logInfo('Greeting', 'Velkomstmelding vist');

    container.insertBefore(greetingMessage, header.nextSibling);
    Logger.logInfo('Greeting', 'Velkomstmelding satt inn etter header i dashboardContainer');
  }
};



// *Tilleggsfunksjon* "Gi rose"
window.Bonus = {
  giveRose: async function () {
    const raw = localStorage.getItem('currentRandomUser');
    if (!raw) {
      Logger.logWarn('Bonus', 'Ingen bruker funnet i localStorage ved rose-handling');
      return;
    }

    try {
      const currentUser = JSON.parse(raw);
      const roseUser = { ...currentUser, rose: true };

      await addLikedUser(roseUser);
      Logger.logInfo('Bonus', 'Bruker fikk rose og ble lagret');


      localStorage.removeItem('currentRandomUser');
      await UserLoader.loadNewUser();
      await LikedUsers.updateLikedUsersList();
    } catch (err) {
      Logger.logError('Bonus', 'giveRose()', err);
    }
  }
};
