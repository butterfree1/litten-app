module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'dotenv-import',
      {
        allowUndefined: false,
        moduleName: '@env',
        path: '.env',
        safe: true,
      },
    ],
    [
      '@babel/plugin-transform-react-jsx',
      {
        runtime: 'automatic',
      },
    ],
    ['macros'],
  ],
}
