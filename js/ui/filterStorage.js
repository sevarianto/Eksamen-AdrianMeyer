// filterStorage.js - Håndterer lagring og henting av filterverdier fra localStorage

window.FilterStorage = {
  getValues: function () {
    try {
      return {
      gender: localStorage.getItem("filterGender") || "",
      minAge: parseInt(localStorage.getItem("filterMinAge")) || 18,
      maxAge: parseInt(localStorage.getItem("filterMaxAge")) || 99
    };
  
    } catch (err) {
      Logger.logError('FilterStorage', 'getValues()', err);
      return { gender: "", minAge: 18, maxAge: 99 }; 
    }
  },

  save: function ({ gender, minAge, maxAge }) {
    try {
      if (gender !== undefined) {
      localStorage.setItem("filterGender", gender);
    }
    if (minAge !== undefined) {
      localStorage.setItem("filterMinAge", minAge);
    }
    if (maxAge !== undefined) {
      localStorage.setItem("filterMaxAge", maxAge);
    }
   Logger.logInfo('FilterStorage', `Filter lagret: kjønn=${gender}, alder=${minAge}-${maxAge}`);
    } catch (err) {
      Logger.logError('FilterStorage', 'save()', err);
    }
  }
};