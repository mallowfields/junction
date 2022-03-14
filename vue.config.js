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
    public: `localhost:${process.env.PORT}`,
    disableHostCheck: true,
    https: false,
    port: process.env.PORT
  }
}
