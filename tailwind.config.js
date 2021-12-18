module.exports = {
  content: [
    './src/**/*.jsx',
    './src/**/*.js',
    './src/**/*.ts',
    './src/**/*.tsx',
    './src/**/*.html',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      gridTemplateColumns: {
        '10/20/60/10': '13% 20% 57% 10%',
        '20/50/30': '20% 50% 30%',
      },
    },
  },
  plugins: [],
}
