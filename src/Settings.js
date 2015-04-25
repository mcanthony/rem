'use strict';

require('instapromise');

const path = require('path');
const fs = require('fs');

const SETTINGS_KEY = 'reactNativeApp';
const REACT_NATIVE_PATH_KEY = 'reactNativePath';
const PODFILE_DIRECTORY_KEY = 'podfileDirectory';

const DEFAULT_REACT_NATIVE_PATH = 'node_modules/react-native';
const DEFAULT_PODFILE_DIRECTORY = '';

class Settings {

  constructor(baseDirectory, options) {
    this.reactNativePath = path.resolve(
      baseDirectory,
      options[REACT_NATIVE_PATH_KEY] || DEFAULT_REACT_NATIVE_PATH
    );
    this.podfileDirectory = path.resolve(
      baseDirectory,
      options[PODFILE_DIRECTORY_KEY] || DEFAULT_PODFILE_DIRECTORY
    );
  }

  /**
   * Loads the configuration settings from the package.json file in the current
   * working directory.
   */
  static async load() {
    let baseDirectory = process.cwd();
    let packageJSONPath = path.resolve(baseDirectory, 'package.json');
    let packageJSON = await fs.promise.readFile(packageJSONPath, 'utf8');
    let manifest = JSON.parse(packageJSON);
    let options = manifest[SETTINGS_KEY] || {};
    return new Settings(baseDirectory, options);
  }
}

export default Settings;