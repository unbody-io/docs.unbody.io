import type { DocsThemeConfig } from "nextra-theme-docs";
import { Footer } from "./components/Footer";
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
};
export default config;
