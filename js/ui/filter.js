// filter.js - Hovedmpodulen for håndtering av filter

let genderFilter, minAgeDisplay, maxAgeDisplay;

document.addEventListener("DOMContentLoaded", async () => {
  genderFilter = document.getElementById("genderFilter");
  minAgeDisplay = document.getElementById("minAgeDisplay");
  maxAgeDisplay = document.getElementById("maxAgeDisplay");

  if (!genderFilter || !minAgeDisplay || !maxAgeDisplay) {
    Logger.logWarn('Filter', 'Et eller flere filterelementer mangler - initiering avbrytes');
    return;
  }

  try {
    FilterUI.init(genderFilter, onFilterChange);
    applySavedFilters();
    AgeFilter.initCustomSlider();

    if (typeof loadOrReuseUser === 'function') {
      await loadOrReuseUser();
    } else if (window.loadOrReuseUser) {
      await window.loadOrReuseUser();
    } else {
      await UserLoader.loadNewUser();
    }

    Logger.logInfo('Filter', 'Filtermodul initiert og bruker lastet med caching');
  } catch (err) {
    Logger.logError('Filter', 'DOM-initialisering', err);
  }
});

function onFilterChange() {
  localStorage.removeItem('currentRandomUser');
  UserLoader.loadNewUser();
}

function applySavedFilters() {
  try {
    const { gender } = FilterStorage.getValues();
    genderFilter.value = gender;
    Logger.logInfo('Filter', `Tidligere filter brukt: ${gender || 'alle'}`);
  } catch (err) {
    Logger.logError('Filter', 'applySavedFilters()', err);
  }
}
