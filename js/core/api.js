// api.js - Håndterer API-funksjoner 

// API-funksjoner for CRUD-API
const BASE_URL = 'https://crudcrud.com/api/d947a9f3bd964d18ad4415f3d905de13/users';
const LIKED_URL = 'https://crudcrud.com/api/d947a9f3bd964d18ad4415f3d905de13/likedUsers';


// Registrerer ny bruker 

async function registerUser(newUser) {
  try { 
 const response = await fetch(BASE_URL);
  if (!response.ok) throw new Error(`GET-feil: ${response.status}`);
  Logger.logInfo('API', `GET alle brukere - status ${response.status}`);

 const users = await response.json();
 const exists = users.some(user => user.username === newUser.username);

 if (exists) { throw new Error('Brukernavnet er allerede i bruk'); 
  }

 const saveResponse = await fetch(BASE_URL, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(newUser)
});

if (!saveResponse.ok) throw new Error(`POST-feil: ${saveResponse.status}`);
Logger.logInfo('API', `POST ny bruker - status ${saveResponse.status}`);

    return await saveResponse.json();
  } catch (err) {
    Logger.logError('API', 'registerUser()', err);
    throw err;
  }
}

// Henter bruker med brukernavn
async function getUserByUsername(username) {
  try {
    const response = await fetch(BASE_URL);
    if (!response.ok) throw new Error(`GET-feil: ${response.status}`);
    Logger.logInfo('API', `GET alle brukere - status ${response.status}`);

    const users = await response.json();
    const user = users.find(user => user.username === username);
    return user;
  } catch (err) {
    Logger.logError('API', 'getUserByUsername()', err);
    throw err;
  }
}

// Oppdaterer brukerdata
async function updateUser(userId, updatedData) {
  try {
    const response = await fetch(`${BASE_URL}/${userId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedData)
    });


    if (!response.ok) throw new Error(`Statuskode: ${response.status}`);
    Logger.logInfo('API', `PUT bruker ${userId} - status ${response.status}`);
    return response.status;
  } catch (err) {
    Logger.logError('API', 'updateUser()', err);
    throw err;
  }
}

// Henter alle brukere
async function getAllUsers() {
  try {
    const response = await fetch(BASE_URL);
    if (!response.ok) throw new Error(`GET-feil: ${response.status}`);
    Logger.logInfo('API', `GET alle brukere - status ${response.status}`);
    return await response.json();
  } catch (err) {
    Logger.logError('API', 'getAllUsers()', err);
    throw err;
  }
}

// Henter alle likte brukere
async function getLikedUsers() {
  try {
    const response = await fetch(LIKED_URL);
    if (!response.ok) throw new Error(`Statuskode: ${response.status}`);
    Logger.logInfo('API', `GET likte brukere - status ${response.status}`);
    return await response.json();
  } catch (err) {
    Logger.logError('API', 'getLikedUsers()', err);
    throw err;
  }
}

// Lagrer en likt bruker
async function addLikedUser(user) {
  try {
    if (
      !user?.name?.first || !user?.dob?.age || !user?.location?.city || !user?.picture?.large
    ) {
      Logger.logWarn('API', 'Brukerdata mangler - lagring avbrytes');
      return;
    }

    const payload = {
  name: `${user.name?.title || ''} ${user.name?.first || ''} ${user.name?.last || ''}`.trim(),
  age: user.dob?.age,
  city: user.location?.city,
  country: user.location?.country,
  image: user.picture?.large
};

    if (user.rose === true) {
      payload.rose = true;
    }

    const response = await fetch(LIKED_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

     if (!response.ok) throw new Error(`POST-feil: ${response.status}`);
    Logger.logInfo('API', `POST likt bruker - status ${response.status}`);

    return await response.json();
  } catch (err) {
    Logger.logError('API', 'addLikedUser()', err);
    throw err;
  }
}


// Sletter en likt bruker
async function deleteLikedUser(id) {
  try {
    const response = await fetch(`${LIKED_URL}/${id}`, {
      method: 'DELETE'
    });

    if (!response.ok) throw new Error(`DELETE-feil: ${response.status}`);
    Logger.logInfo('API', `DELETE likt bruker ${id} - status ${response.status}`);
  } catch (err) {
    Logger.logError('API', 'deleteLikedUser()', err);

    throw err;
  }
}

// Henter tilfeldig bruker med valgt filter
async function getRandomUser(gender = '', min = 18, max = 99, attempts = 0, maxAttempts = 10) {
  if (attempts >= maxAttempts) {
  Logger.logWarn('API', `Maks forsøk nådd ved randomUser-filter (${gender}, ${min}-${max})`);
  return null;
  }

  let url = 'https://randomuser.me/api/?results=1';
  if (gender) url += `&gender=${gender}`;
  url += '&nat=no';

  try {
    const response = await fetch(url);
 if (!response.ok) throw new Error(`GET-feil: ${response.status}`);
    Logger.logInfo('API', `GET randomuser.me - status ${response.status}`);
    
    const data = await response.json();
    const user = data.results[0];
    const age = user.dob.age;

    if (age >= min && age <= max) {
      return user;
    } else {
      return await getRandomUser(gender, min, max, attempts + 1);
    }
  } catch (err) {
    Logger.logError('API', 'getRandomUser()', err);
    return null;
  }
}

// Eksport for Jest-testing
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    registerUser,
    getUserByUsername,
    updateUser,
    getLikedUsers,
    addLikedUser,
    deleteLikedUser,
    getRandomUser
  };
}
