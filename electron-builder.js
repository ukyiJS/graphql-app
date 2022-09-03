/* eslint-disable no-template-curly-in-string */

/** @type {import('electron-builder').Configuration} */
const config = {
  productName: 'graphiql-app',
  appId: 'graphiql.app',
  files: ['dist/**/*'],
  directories: {
    output: 'release/${version}',
  },
  mac: {
    category: 'public.app-category.utilities',
    artifactName: '${productName}-${version}-${os}.${ext}',
  },
  win: {
    artifactName: '${productName}-${version}-${os}.${ext}',
  },
  dmg: {
    artifactName: '${productName}-${version}.${ext}',
  },
  nsis: {
    artifactName: '${productName}-${version}.${ext}',
  },
};

module.exports = config;
