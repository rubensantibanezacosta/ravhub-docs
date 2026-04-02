import DefaultTheme from 'vitepress/theme';
import type { Theme } from 'vitepress';
import './styles.css';
import DocHeader from './components/DocHeader.vue';
import DocIcon from './components/DocIcon.vue';

const theme: Theme = {
    extends: DefaultTheme,
    enhanceApp({ app }) {
        app.component('DocHeader', DocHeader);
        app.component('DocIcon', DocIcon);
    },
};

export default theme;
