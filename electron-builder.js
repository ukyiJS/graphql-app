/* eslint-disable no-template-curly-in-string */

/** @type {import('electron-builder').Configuration} */
const config = {
  productName: 'graphiql-app',
  appId: 'graphiql.app',
  files: ['dist/**/*'],
  icon: 'icons/icon.ico',
  directories: {
    output: 'release/${version}',
  },
  mac: {
    icon: 'icons/icon.icns',
    category: 'public.app-category.utilities',
    artifactName: '${productName}-${version}-${os}.${ext}',
  },
  win: {
    artifactName: '${productName}-${version}-${os}.${ext}',
  },
  dmg: {
    icon: 'icons/icon.icns',
    artifactName: '${productName}-${version}.${ext}',
  },
  nsis: {
    artifactName: '${productName}-${version}.${ext}',
  },
};

module.exports = config;
