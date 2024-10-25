import { defineConfig, presetUno  } from 'unocss'
import { presetScrollbarHide } from 'unocss-preset-scrollbar-hide'

export default defineConfig({
    theme: {
        colors: {
            primary: '#3b5bdb',
            'primary-1': '#e0e7ff',
            'primary-2': '#c7d2fe',
            'primary-3': '#a5b4fc',
            'primary-4': '#818cf8',
            'primary-5': '#3b5bdb',
            'primary-6': '#364fc7',
        }
    },
    presets: [
        presetUno(),
        presetScrollbarHide(),
    ]
})