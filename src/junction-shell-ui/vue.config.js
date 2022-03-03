module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  chainWebpack: config => {
    config.module.rules.delete('eslint')
  },
  // css: {
  //   loaderOptions: {
  //     scss: {
  //       prependData: `
  //       `
  //     }
  //   }
  // },
  devServer: {
    public: 'localhost:3333',
    disableHostCheck: true,
    https: false,
    port: 3333
  }
}
