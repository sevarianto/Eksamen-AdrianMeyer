// themeToggle.js - Håndterer lys/mørk modus **Tilleggsfunksjon(?)**

document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('toggleTheme');

  if (!toggleBtn) {
    Logger?.logWarn?.('ThemeToggle', 'Modusknappen ikke funnet i DOM');
    return;
  }

  try {
    const savedMode = localStorage.getItem('theme');
    const defaultMode = savedMode === 'dark-mode' ? 'dark-mode' : 'light-mode';

  
    document.body.classList.add(defaultMode);
    toggleBtn.textContent = defaultMode === 'dark-mode' ? 'Bytt til lys modus' : 'Bytt til mørk modus';

    Logger?.logInfo?.('ThemeToggle', `Modus satt til ${defaultMode} ved lasting`);

   
    toggleBtn.addEventListener('click', () => {
      const isDark = document.body.classList.contains('dark-mode');

      document.body.classList.remove('dark-mode', 'light-mode');
      document.body.classList.add(isDark ? 'light-mode' : 'dark-mode');

      const newMode = isDark ? 'light-mode' : 'dark-mode';
      toggleBtn.textContent = newMode === 'dark-mode' ? 'Bytt til lys modus' : 'Bytt til mørk modus';

      try {
        localStorage.setItem('theme', newMode);
        Logger?.logInfo?.('ThemeToggle', `Bruker endret til ${newMode}`);
      } catch (err) {
        Logger?.logError?.('ThemeToggle', 'Lagring av brukerens modusvalg', err);
      }
    });
  } catch (err) {
    Logger?.logError?.('ThemeToggle', 'Feil ved initialisering', err);
  }
});
