
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/application/',
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
    'index.csr.html': {size: 26674, hash: 'fb54e5c696cfa19a0b4c8a79d2bb1826c42024f7a248d624bb7f34453fef1f27', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 26454, hash: 'ddc0066360119eda510e2113654919e2ade1456230e10c05ee974c59f8729c5f', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-TOVPNZDO.css': {size: 2345, hash: '8O0+flXQ9gU', text: () => import('./assets-chunks/styles-TOVPNZDO_css.mjs').then(m => m.default)}
  },
};
