// swipe.js - Håndterer swipe-funksjonalitet og brukerinteraksjoner

window.addEventListener('DOMContentLoaded', async () => {
  await loadOrReuseUser();
  setupSwipeButtons();
  LikedUsers.updateLikedUsersList();
});

function setupSwipeButtons() {
  const yesButton = document.getElementById('swipeYes');
  const noButton = document.getElementById('swipeNo');
  const roseButton = document.getElementById('giveRoseButton');

  if (!yesButton || !noButton || !roseButton) {
    Logger.logWarn('Swipe', 'Ett eller flere knappeelementer mangler');
    return;
  }

  yesButton.addEventListener('click', handleLike);
  noButton.addEventListener('click', handleDislike);
  roseButton.addEventListener('click', Bonus.giveRose);
}

async function handleLike() {
  const currentUser = UserLoader.getCurrentUserFromStorage();
  if (!currentUser) {
    Logger.logWarn('Swipe', 'Ingen bruker funnet i localStorage ved like');
    return;
  }

  try {
    await addLikedUser(currentUser);
    Logger.logInfo('Swipe', 'Bruker ble likt og lagret');

    localStorage.removeItem('currentRandomUser');
    await UserLoader.loadNewUser();
    await LikedUsers.updateLikedUsersList();
  } catch (err) {
    Logger.logError('Swipe', 'handleLike()', err);
  }
}

async function handleDislike() {
  try {
    localStorage.removeItem('currentRandomUser');
    await UserLoader.loadNewUser();
    Logger.logInfo('Swipe', 'Bruker swipet nei - ny bruker lastes inn');
  } catch (err) {
    Logger.logError('Swipe', 'handleDislike()', err);
  }
}
