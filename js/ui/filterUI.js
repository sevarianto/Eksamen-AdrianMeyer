// filterUI.js - Håndterer filter for kjønn

window.FilterUI = {
  init: function (genderFilterEl, onChangeCallback) {
    if (!genderFilterEl || typeof onChangeCallback !== 'function') {
     Logger.logWarn('FilterUI', 'Manglende element eller ugyldig callback');
      return;
    }

    genderFilterEl.addEventListener("change", () => {
      const gender = genderFilterEl.value;

      try {
        FilterStorage.save({ gender });
        Logger.logInfo('FilterUI', `Kjønn valgt: ${gender || 'alle'}`);
      } catch (err) {
        Logger.logError('FilterUI', 'Lagring av kjønnsfilter', err);
      }

       try {
        onChangeCallback();
      } catch (err) {
        Logger.logError('FilterUI', 'Kjøring av onChangeCallback()', err);
      }
    });
  }
};