// swipe.js - Håndterer swipe overordnet

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
    Logger.logWarn('Swipe', 'En eller flere knapper mangler i DOM');
    return;
  }

  yesButton.addEventListener('click', handleLike);
  noButton.addEventListener('click', handleDislike);
  roseButton.addEventListener('click', Bonus.giveRose);
}

async function handleLike() {
  const currentUser = UserLoader.getCurrentUserFromStorage();

  if (!currentUser) {
    Logger.logWarn('Swipe', 'Ingen bruker i localStorage ved like');
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
    Logger.logInfo('Swipe', 'Bruker ble swipet nei - ny lastet');
  } catch (err) {
    Logger.logError('Swipe', 'handleDislike()', err);
  }
}
