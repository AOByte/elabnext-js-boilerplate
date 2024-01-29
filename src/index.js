import config from './config.js';
import translate from './translate.js';

(function (context) {
  context.needsConfiguration = true;
  context.configurationSchema = function () {
    return {
      language: {
        title: 'Please select your language',
        type: 'string',
        enum: [
          'EN-gb',
          'DE-de',
          'ES-es',
          'FR-fr',
          'IT-it',
          'JA-jp',
          'NL-nl',
          'PL-pl',
          'PT-pt',
          'RU-ru',
          'ZH-cn',
        ],
        default: 'EN-gb',
      },
    };
  };

  context.init = function (conf) {
    $(() => {
      context.Translation = new context.Translation(conf);
    });
  };

  context.Translation = new Class({
    Implements: [Options, Events],
    // eslint-disable-next-line object-shorthand
    initialize: function (conf) {
      const self = this;
      self.setOptions(conf);

      const currentLanguage = this.options.language ?? config.DEFAULT_LANGUAGE;

      window.addEventListener('DOMContentLoaded', async () => {
        await translate(currentLanguage);
      });
    },
    options: {},
  });
// Ignored as this is injected during compile time
// eslint-disable-next-line no-undef
}(MY_ADDON));
