// userLoader.js - Håndterer lasting og visning av brukere

// Laster ny bruker basert på valgt filter
function loadNewUser() {
  try {
    const genderEl = document.getElementById('genderFilter');
    if (!genderEl) {
      Logger.logWarn('UserLoader', 'Kjønnfilter mangler - lasting avbrytes');
      return;
    }

    const gender = genderEl.value || '';
    const { minAge, maxAge } = FilterStorage.getValues();

    getRandomUser(gender, minAge, maxAge)
      .then((user) => {
        if (!user || !user.name || !user.dob || !user.location) {
          Logger.logWarn('UserLoader', 'Ingen bruker funnet for valgte filtre');
          return;
        }

        localStorage.setItem('currentRandomUser', JSON.stringify(user));
        UserCard.showUser(user);
        Logger.logInfo('UserLoader', 'Ny bruker lastet inn og vist');
      })
      .catch((err) => {
        Logger.logError('UserLoader', 'loadNewUser()', err);
      });

  } catch (err) {
    Logger.logError('UserLoader', 'loadNewUser() (sync)', err);
  }
}

// Leser nåværende lagrede bruker fra localStorage
function getCurrentUserFromStorage() {
  const rawUser = localStorage.getItem('currentRandomUser');
  if (!rawUser) return null;

  try {
    const user = JSON.parse(rawUser);
    if (!user.name || !user.dob || !user.location) {
      Logger.logWarn('UserLoader', 'Mangler nødvendig brukerdata - operasjon avbrytes');
      return null;
    }
    return user;
  } catch (err) {
    Logger.logError('UserLoader', 'getCurrentUserFromStorage()', err);
    return null;
  }
}

window.UserLoader = {
  loadNewUser,
  getCurrentUserFromStorage
};
