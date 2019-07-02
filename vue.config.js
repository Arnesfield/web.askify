module.exports = {
  lintOnSave: false,
  assetsDir: 'static',
  publicPath: process.env.VUE_APP_PUBLIC_PATH || '/',
  pwa: {
    name: 'askify',
    themeColor: '#5E7A87',
    msTileColor: '#000000',
    iconPaths: {
      favicon32: 'static/img/icons/32x32.png',
      favicon16: 'static/img/icons/16x16.png',
      appleTouchIcon: 'static/img/icons/152x152.png',
      maskIcon: '',
      msTileImage: 'static/img/icons/144x144.png'
    }
  }
}
