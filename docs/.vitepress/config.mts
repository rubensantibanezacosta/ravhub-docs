import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'RavHub Docs',
  description: 'Documentación base para RavHub con VitePress.',
  cleanUrls: true,
  themeConfig: {
    nav: [
      { text: 'Inicio', link: '/' },
      { text: 'Guía', link: '/guide/getting-started' },
    ],
    sidebar: [
      {
        text: 'Guía',
        items: [
          { text: 'Primeros pasos', link: '/guide/getting-started' },
        ],
      },
    ],
    socialLinks: [{ icon: 'github', link: 'https://github.com/RavHub-App' }],
    footer: {
      message: 'Documentación base generada para RavHub.',
      copyright: '© RavHub',
    },
  },
});
