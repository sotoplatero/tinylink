const production = !process.env.ROLLUP_WATCH;
const colors = require('tailwindcss/colors')
module.exports = {
    purge: {
        enabled: production,
        content: [
            './src/**/*.html',
            './src/**/*.svelte',
        ],
        options: {
        }
    },
    darkMode: 'class', // 'media' / 'class' / 'false'
    theme: {
        extend: { },
    },
    variants: {
        extend: {
            opacity: ['disabled'],
        }
    },
    plugins: [
        //  require('@tailwindcss/forms'),
    ],
}
