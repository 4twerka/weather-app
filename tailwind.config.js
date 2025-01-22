/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            backgroundImage: {
                'main-bg': "url('./assets/clouds1920.jpg')",
                'second-bg': "url('./assets/newYork.jpg')",
            },
            keyframes: {
                marquee: {
                  '0%': { transform: 'translateX(100%)' },
                  '100%': { transform: 'translateX(-100%)' },
                },
              },
              animation: {
                marquee: 'marquee 20s linear infinite',
              },
        },
    },
    plugins: [],
}
