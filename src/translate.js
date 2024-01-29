/**
 * Display a toast message with the selected language.
 * @param {string} currentLanguage - The selected language.
 * @returns {Promise<void>}
 */
export default async (currentLanguage) => {
  Helper.Toast.show({
    autoclose: 7500,
    message: `Selected language is ${currentLanguage}`,
  });
};
