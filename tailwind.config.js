/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Vogue Eco-Editorial Palette
                primary: {
                    light: '#1F3A33',
                    DEFAULT: '#0F1F1C', // Deep Forest Black (Ink)
                    dark: '#050A09',
                },
                secondary: {
                    light: '#6B7E74',
                    DEFAULT: '#4A5D54', // Moss Grey
                    dark: '#2E3B35',
                },
                accent: {
                    light: '#E0C17E',
                    DEFAULT: '#C5A059', // Antique Bronze (Jewelry)
                    dark: '#8F723A',
                },
                background: {
                    DEFAULT: '#F9F7F1', // Alabaster Cream (Paper)
                    paper: '#FFFFFF',
                    dark: '#1a1a1a'
                },
                surface: {
                    subtle: '#F2EFDB', // Slightly darker cream for cards
                },
                text: {
                    primary: '#050505', // Obsidian
                    secondary: '#3D403D',
                    muted: '#888B88',
                    light: '#F9F7F1', // For text on dark backgrounds
                }
            },
            fontFamily: {
                heading: ['Playfair Display', 'Georgia', 'serif'],
                body: ['Inter', 'system-ui', 'sans-serif'],
            },
            backgroundImage: {
                'luxury-gradient': "linear-gradient(to bottom, #F9F7F1, #F0EAD6)",
            },
            boxShadow: {
                'editorial': '0 20px 40px -4px rgba(15, 31, 28, 0.08)',
                'float': '0 10px 30px -10px rgba(197, 160, 89, 0.3)',
            }
        },
    },
    plugins: [],
}
