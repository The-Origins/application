
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: 'https://the-origins.github.io/application/',
  locale: undefined,
  routes: undefined,
  entryPointToBrowserMapping: {
  "src/components/roomCard/image-component/image-component.component.ts": [
    {
      "path": "chunk-GT3CLEXW.js",
      "dynamicImport": false
    }
  ],
  "src/components/roomCard/rating/rating.component.ts": [
    {
      "path": "chunk-HKYASVRL.js",
      "dynamicImport": false
    }
  ],
  "src/components/roomCard/amenities/amenities.component.ts": [
    {
      "path": "chunk-P4UV5EWE.js",
      "dynamicImport": false
    }
  ]
},
  assets: {
    'index.csr.html': {size: 26703, hash: '645f8b84ffba0404f27d4f8c60e8882cb899e4537d255a3b84764fa36ff8ded4', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 26483, hash: '56bfce482898d1aad4a5e113cba76910e3f7106f3d9a0ed4fe6a117c382c4661', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-TOVPNZDO.css': {size: 2345, hash: '8O0+flXQ9gU', text: () => import('./assets-chunks/styles-TOVPNZDO_css.mjs').then(m => m.default)}
  },
};
