// likedUsers.js - Håndterer likte brukere 

// Oppdaterer listen over likte brukere
function updateLikedUsersList() {
  getLikedUsers().then((users) => {
    const likedList = document.getElementById('likedUsersList');

    if (!likedList) {
      Logger.logWarn('LikedUsers', 'DOM-elementet likedUsersList mangler');
      return;
    }

    likedList.innerHTML = '';

    if (users.length === 0) {
      const placeholder = document.createElement('li');
      placeholder.id = 'noLikedPlaceholder';
      placeholder.textContent = 'Ingen likte brukere ennå.';
      likedList.appendChild(placeholder);
      return;
    }

    users.forEach((user) => {
  const listItem = document.createElement('li');
  listItem.className = 'liked-user';

  const container = document.createElement('div');
  container.className = 'liked-user-container';

  const img = document.createElement('img');
  img.src = user.image || '/assets/images/default-avatar.png';
  img.alt = user.name;
  img.className = 'liked-user-img';

  const info = document.createElement('div');
  info.innerHTML = `
    <strong>${user.name}</strong>, ${user.age}, ${user.city}, ${user.country} ${user.rose ? '🌹' : ''}
  `;

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Slett';
  deleteBtn.className = 'delete-liked-btn';
  deleteBtn.setAttribute('data-id', user._id);

  container.appendChild(img);
  container.appendChild(info);
  listItem.appendChild(container);
  listItem.appendChild(deleteBtn);
  likedList.appendChild(listItem);
});


    const deleteButtons = document.getElementsByClassName('delete-liked-btn');
    Array.from(deleteButtons).forEach((button) => {
      button.addEventListener('click', async () => {
        const userId = button.getAttribute('data-id');
        try {
          await deleteLikedUser(userId);
          Logger.logInfo('LikedUsers', `Bruker med id ${userId} slettet`);
          updateLikedUsersList();
        } catch (err) {
          Logger.logError('LikedUsers', 'deleteLikedUser()', err);
        }
      });
    });
  }).catch((err) => {
    Logger.logError('LikedUsers', 'getLikedUsers()', err);
  });
}

window.LikedUsers = {
  updateLikedUsersList
};