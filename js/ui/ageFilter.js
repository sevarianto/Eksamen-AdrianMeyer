// ageFilter.js - Håndterer egendefinert filter slider for alder inspo fra Tinder

window.AgeFilter = {
  initCustomSlider: function () {
    const slider = document.getElementById("customSlider");
    const minThumb = slider.querySelector(".thumb.min");
    const maxThumb = slider.querySelector(".thumb.max");
    const range = slider.querySelector(".range");

    const minAgeDisplay = document.getElementById("minAgeDisplay");
    const maxAgeDisplay = document.getElementById("maxAgeDisplay");

    if (!slider || !minThumb || !maxThumb || !range || !minAgeDisplay || !maxAgeDisplay) {
    Logger.logWarn('AgeFilter', 'Ett eller flere DOM-elementer mangler - slider initieres ikke');
    return;
    }

    const minValue = 18;
    const maxValue = 99;

    let activeThumb = null;

    const saved = FilterStorage.getValues();
    let currentMin = saved.minAge;
    let currentMax = saved.maxAge;

    function setThumbPosition(thumb, value) {
    const percent = ((value - minValue) / (maxValue - minValue)) * 100;
    thumb.style.left = `${percent}%`;
    }

    function updateRange() {
      const minPercent = parseFloat(minThumb.style.left);
      const maxPercent = parseFloat(maxThumb.style.left);

      range.style.left = `${minPercent}%`;
      range.style.width = `${maxPercent - minPercent}%`;

      const minAge = Math.round(minValue + minPercent / 100 * (maxValue - minValue));
      const maxAge = Math.round(minValue + maxPercent / 100 * (maxValue - minValue));

      const safeMin = Math.min(minAge, maxAge);
      const safeMax = Math.max(minAge, maxAge);

     minAgeDisplay.textContent = safeMin;
     maxAgeDisplay.textContent = safeMax;

    try {
        FilterStorage.save({ minAge: safeMin, maxAge: safeMax });
        Logger.logInfo('AgeFilter', `Filter oppdatert: ${safeMin}–${safeMax}`);
    } catch (err) {
        Logger.logError('AgeFilter', 'FilterStorage.save()', err);
    }
       
      if (window.UserLoader?.loadNewUser) {
        try {
          UserLoader.loadNewUser();
          Logger.logInfo('AgeFilter', 'Ny bruker lastet basert på valgt filter');
        } catch (err) {
          Logger.logError('AgeFilter', 'UserLoader.loadNewUser()', err);
        }
      }
    }

    function onMouseMove(e) {
      if (!activeThumb) return;

      const rect = slider.getBoundingClientRect();
      let percent = ((e.clientX - rect.left) / rect.width) * 100;
      percent = Math.max(0, Math.min(100, percent));

      activeThumb.style.left = `${percent}%`;
      updateRange();
    }

    function onMouseUp() {
      activeThumb = null;
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    }

    [minThumb, maxThumb].forEach((thumb) => {
      thumb.addEventListener("mousedown", () => {
        activeThumb = thumb;
        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
      });
    });

     try {
      setThumbPosition(minThumb, currentMin);
      setThumbPosition(maxThumb, currentMax);
      updateRange();
      Logger.logInfo('AgeFilter', 'Aldersslider initialisert');
    } catch (err) {
      Logger.logError('AgeFilter', 'Initialisering av tomler', err);
    }
  }
};
    
