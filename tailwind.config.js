import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.tsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                primary: {
                    DEFAULT: '#80E6D3',
                    50: '#F2FCFA',
                    100: '#E6F9F5',
                    200: '#C0F0E6',
                    300: '#99E7D7',
                    400: '#80E6D3', // Base
                    500: '#4CD9BE',
                    600: '#26C2A3',
                    700: '#1D967D',
                    800: '#156B59',
                    900: '#0D4036',
                },
            },
        },
    },

    plugins: [forms],
};
