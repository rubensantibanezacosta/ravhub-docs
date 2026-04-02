import { defineConfig } from 'vitepress';
import type { HeadConfig } from 'vitepress';

const siteTitle = 'RavHub Docs';
const siteDescriptionEs = 'Documentación pública de RavHub centrada en producto, despliegue y uso desde clientes.';
const siteDescriptionEn = 'Public RavHub documentation focused on product, deployment, and client usage.';

const sharedHead: HeadConfig[] = [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }],
    ['link', { rel: 'shortcut icon', href: '/logo.svg' }],
    ['meta', { name: 'application-name', content: siteTitle }],
    ['meta', { name: 'apple-mobile-web-app-title', content: siteTitle }],
    ['meta', { name: 'theme-color', content: '#6942EA' }],
    ['meta', { name: 'robots', content: 'index, follow' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: siteTitle }],
    ['meta', { property: 'og:locale', content: 'es_ES' }],
    ['meta', { property: 'og:image', content: '/logo.svg' }],
    ['meta', { property: 'og:image:alt', content: 'RavHub' }],
    ['meta', { name: 'twitter:card', content: 'summary' }],
    ['meta', { name: 'twitter:title', content: siteTitle }],
    ['meta', { name: 'twitter:description', content: siteDescriptionEs }],
    ['meta', { name: 'twitter:image', content: '/logo.svg' }],
];

const rootNav = [
    { text: 'Inicio', link: '/' },
    { text: 'Producto', link: '/product/what-is-ravhub' },
    { text: 'Despliegue', link: '/deploy/core-bare-docker' },
    { text: 'Clientes', link: '/clients/usage' },
    {
        text: 'Versiones',
        items: [
            { text: 'Actual', link: '/' },
            { text: '0.1.0', link: '/0.1.0/' },
            { text: 'Índice de versiones', link: '/versions' },
        ],
    },
];

const rootSidebar = [
    {
        text: 'Producto',
        items: [
            { text: 'Qué es RavHub', link: '/product/what-is-ravhub' },
            { text: 'Features', link: '/product/features' },
            { text: 'Core vs Enterprise', link: '/product/core-vs-enterprise' },
        ],
    },
    {
        text: 'Despliegue',
        items: [
            { text: 'Core · Bare Docker', link: '/deploy/core-bare-docker' },
            { text: 'Core · Helm Chart', link: '/deploy/core-helm-chart' },
            { text: 'Enterprise · Bare Docker', link: '/deploy/enterprise-bare-docker' },
            { text: 'Enterprise · Helm Chart', link: '/deploy/enterprise-helm-chart' },
        ],
    },
    {
        text: 'Clientes',
        items: [{ text: 'Uso desde clientes', link: '/clients/usage' }],
    },
];

const englishNav = [
    { text: 'Home', link: '/en/' },
    { text: 'Product', link: '/en/product/what-is-ravhub' },
    { text: 'Deployment', link: '/en/deploy/core-bare-docker' },
    { text: 'Clients', link: '/en/clients/usage' },
    {
        text: 'Versions',
        items: [
            { text: 'Current', link: '/en/' },
            { text: '0.1.0', link: '/en/0.1.0/' },
            { text: 'Version index', link: '/en/versions' },
        ],
    },
];

const englishSidebar = [
    {
        text: 'Product',
        items: [
            { text: 'What is RavHub', link: '/en/product/what-is-ravhub' },
            { text: 'Features', link: '/en/product/features' },
            { text: 'Core vs Enterprise', link: '/en/product/core-vs-enterprise' },
        ],
    },
    {
        text: 'Deployment',
        items: [
            { text: 'Core · Bare Docker', link: '/en/deploy/core-bare-docker' },
            { text: 'Core · Helm Chart', link: '/en/deploy/core-helm-chart' },
            { text: 'Enterprise · Bare Docker', link: '/en/deploy/enterprise-bare-docker' },
            { text: 'Enterprise · Helm Chart', link: '/en/deploy/enterprise-helm-chart' },
        ],
    },
    {
        text: 'Clients',
        items: [{ text: 'Client usage', link: '/en/clients/usage' }],
    },
];

export default defineConfig({
    lang: 'es-ES',
    title: siteTitle,
    titleTemplate: false,
    description: siteDescriptionEs,
    cleanUrls: true,
    head: sharedHead,
    locales: {
        root: {
            label: 'Español',
            lang: 'es-ES',
            description: siteDescriptionEs,
            themeConfig: {
                nav: rootNav,
                sidebar: rootSidebar,
                outline: {
                    label: 'En esta página',
                },
                docFooter: {
                    prev: 'Página anterior',
                    next: 'Página siguiente',
                },
                lastUpdated: {
                    text: 'Última actualización',
                },
                darkModeSwitchLabel: 'Apariencia',
                lightModeSwitchTitle: 'Cambiar a tema claro',
                darkModeSwitchTitle: 'Cambiar a tema oscuro',
                sidebarMenuLabel: 'Menú',
                returnToTopLabel: 'Volver arriba',
                langMenuLabel: 'Cambiar idioma',
                skipToContentLabel: 'Saltar al contenido',
                footer: {
                    message: 'Documentación base generada para RavHub.',
                    copyright: '© RavHub',
                },
            },
        },
        en: {
            label: 'English',
            lang: 'en-US',
            link: '/en/',
            description: siteDescriptionEn,
            themeConfig: {
                nav: englishNav,
                sidebar: englishSidebar,
                outline: {
                    label: 'On this page',
                },
                docFooter: {
                    prev: 'Previous page',
                    next: 'Next page',
                },
                lastUpdated: {
                    text: 'Last updated',
                },
                darkModeSwitchLabel: 'Appearance',
                lightModeSwitchTitle: 'Switch to light theme',
                darkModeSwitchTitle: 'Switch to dark theme',
                sidebarMenuLabel: 'Menu',
                returnToTopLabel: 'Return to top',
                langMenuLabel: 'Change language',
                skipToContentLabel: 'Skip to content',
                footer: {
                    message: 'Base documentation site for RavHub.',
                    copyright: '© RavHub',
                },
            },
        },
    },
    transformHead: ({ pageData }) => {
        const isEnglishPage = pageData.relativePath.startsWith('en/');
        const pageTitle = pageData.title ? `${pageData.title} | ${siteTitle}` : siteTitle;
        const defaultDescription = isEnglishPage ? siteDescriptionEn : siteDescriptionEs;
        const pageDescription =
            typeof pageData.frontmatter.description === 'string' && pageData.frontmatter.description.length > 0
                ? pageData.frontmatter.description
                : defaultDescription;

        return [
            ['meta', { property: 'og:locale', content: isEnglishPage ? 'en_US' : 'es_ES' }],
            ['meta', { property: 'og:title', content: pageTitle }],
            ['meta', { property: 'og:description', content: pageDescription }],
            ['meta', { name: 'twitter:title', content: pageTitle }],
            ['meta', { name: 'twitter:description', content: pageDescription }],
        ];
    },
    themeConfig: {
        logo: '/logo.svg',
        socialLinks: [{ icon: 'github', link: 'https://github.com/RavHub-App' }],
    },
});
