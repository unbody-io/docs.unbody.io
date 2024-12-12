import { type DocsThemeConfig } from "nextra-theme-docs";
import { Footer } from "./components/Footer";
import { default as HeadComponent } from "./components/HeadComponent";
import { Logo } from "./components/Logo";

const config: DocsThemeConfig = {
  logo: Logo,
  footer: {
    component: Footer,
  },

  project: {
    link: "https://github.com/unbody-io",
  },
  nextThemes: {
    defaultTheme: "dark",
  },
  docsRepositoryBase: "https://github.com/unbody-io/docs.unbody.io/tree/master",
  sidebar: {
    autoCollapse: true,
    defaultMenuCollapseLevel: 1,
  },

  head: HeadComponent,
};
export default config;
