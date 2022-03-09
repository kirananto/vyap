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
        screens: {
            'sm': '360px',
            'md': '768px',
            'lg': '1024px',
            'xl': '1280px',
        },
        
        backdropFilter: {
            'none': 'none',
            'blur': 'blur(20px)',
        },
  
        extend: {
            gridTemplateColumns: {
                '10/20/60/10': '15% 20% 55% 10%',
                '20/50/30': '20% 50% 30%',
            },
        },
    },
    plugins: [  
        require('@tailwindcss/line-clamp'),
    ],
}