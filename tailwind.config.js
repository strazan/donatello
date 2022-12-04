// eslint-disable-next-line no-undef
module.exports = {
    content: ['./renderer/**/*.{js,jsx,ts,tsx}'],
    theme: {
        // extend: {
        colors: {
            surface: '#FDFCFD',
            surfaceVariant: '#F9F8F9',
            uiSurface: '#F4F2F4',
            containerHover: '#EEEDEF',
            containerActive: '#E9E8EA',
            outline1: '#E4E2E4',
            outline2: '#DCDBDD',
            outline3: '#C8C7CB',
            containerFill: '#908E96',
            containerFillHover: '#86848D',
            secondaryText: '#6F6E77',
            primaryText: '#1A1523',

            primary: '#4E3091',
            primaryContainer: '#E9DDFF',
            onPrimaryContainer: '#23005C',
        
        },
        themes: {
            dark: {
                surface: '#161618',
                surfaceVariant: '#1C1C1F',
                uiSurface: '#232326',
                containerHover: '#28282C',
                containerActive: '#2E2E32',
                outline1: '#34343A',
                outline2: '#3E3E44',
                outline3: '#504F57',
                containerFill: '#706F78',
                containerFillHover: '#7E7D86',
                secondaryText: '#A09FA6',
                primaryText: '#EDEDEF',

                primary: '#D0BCFF',
                primaryContainer: '#513394',
                onPrimaryContainer: '#E9DDFF',
            },
        },
    },
    // },
    plugins: [
        // eslint-disable-next-line no-undef
        require('tailwind-theme-switcher'),
    ],
}
