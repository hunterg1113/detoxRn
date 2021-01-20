import Rox from 'rox-react-native';
import AsyncStorage from '@react-native-community/async-storage';

class FlagService {
  constructor() {
    Rox.setup('60032c9c4987ec4bca7a5587', this._options());
    this.isBooted = false;
  }

  _flags() {
    return {
      showHiddenFeatures: new Rox.Flag(),
      titleColors: new Rox.Variant('White', [
        'White',
        'Blue',
        'Green',
        'Yellow',
      ]),
    };
  }
  register() {
    if (!this.isBooted) {
      Rox.register('', this._flags());
      this.isBooted = true;
    }
  }

  endSession() {
    if (this.isBooted) {
      this.isBooted = false;
    }
  }

  enableHiddenFeature() {
    this._ensureBooted();
    return this._flags.showHiddenFeatures.isEnabled();
  }

  _options() {
    return {
      version: '1.0.0',
      AsyncStorage: AsyncStorage,
      debugLevel: 'verbose',
      freeze: Rox.FreezeOptions.freezeOptionNone,
    };
  }

  _boot() {
    if (this._isProperlyImplemented() && !this.isBooted) {
      this.setup();
      this.register();
    }
  }

  _isProperlyImplemented() {
    return typeof Rox === 'object';
  }

  _ensureBooted() {
    if (!this.isBooted) {
      return;
    }
    this._boot();
  }
}

export default FlagService;
