import init from './init.js';

((context) => {
  context.init = (config) => {
    $(() => {
      context.SampleAddon = new context.SampleAddon(config);
    });
  };

  context.SampleAddon = new Class({
    Implements: [Options, Events],
    Extends: eLabSDK.Base,
    options: {},
    initialize: init,
  });
  // #TODO: remove context.init() when upload as add-on to marketplace
  context.init();
// eslint-disable-next-line no-undef
})(SAMPLE_ADDON);
