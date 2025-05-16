// logger.js - Modul for strukturert logging 

window.Logger = {
  logInfo: function (module, message) {
    console.log(`[${module}] INFO: ${message}`);
  },

  logWarn: function (module, message) {
    console.warn(`[${module}] ADVARSEL: ${message}`);
  },

  logError: function (module, action, err) {
    const status = err?.response?.status || err?.status || 'ukjent';
    console.error(`[${module}] FEIL i ${action} – ${err.message} (Status: ${status})`, err);
  }
};
