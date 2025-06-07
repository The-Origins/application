
export default {
  basePath: 'https://the-origins.github.io/application',
  supportedLocales: {
  "en-US": ""
},
  entryPoints: {
    '': () => import('./main.server.mjs')
  },
};
