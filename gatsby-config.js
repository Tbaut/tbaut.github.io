require("ts-node").register({ files: true });

const siteMetadata = {
  title: "Thibaut Sardan",
  header: "Hi, I'm Thibaut",
  capitalizeTitleOnHome: true,
  logo: "/images/logo.png",
  icon: "/images/icon.png",
  titleImage: "/images/wall.jpg",
  introTag: "JS/TS dev & Product with ❤️",
  description: "Welcome to my personal website.",
  author: "Thibaut Sardan",
  portfolioItemsPerPage: 10,
  darkmode: true,
  switchTheme: true,
  navLinks: [
    {
      name: "HOME",
      url: "/",
    },
    {
      name: "ABOUT",
      url: "/about",
    },
    // {
    //   name: "PORTFOLIO",
    //   url: "/portfolio",
    // },
  ],
  social: [
    {
      name: "Email",
      icon: "/images/email.svg",
      url: "mailto:hi@thib.top",
    },
    {
      name: "Github",
      icon: "/images/github.svg",
      url: "https://github.com/Tbaut/",
    },
    {
      name: "Twitter",
      icon: "/images/twitter.svg",
      url: "https://twitter.com/Tbaut",
    },
    {
      name: "Medium",
      icon: "/images/medium.svg",
      url: "https://medium.com/@tbaut",
    },
    {
      name: "Linkedin",
      icon: "/images/linkedin.svg",
      url: "https://www.linkedin.com/in/thibautsardan/",
    },
  ],
};

/** @type { import("gatsby").GatsbyConfig } */
module.exports = {
  siteMetadata,
  plugins: [
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    "gatsby-plugin-react-helmet",
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          "gatsby-remark-copy-linked-files",
          {
            resolve: "gatsby-remark-images",
            options: {
              maxWidth: 1280,
            },
          },
        ],
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: "./",
      },
    },
    {
      resolve: "gatsby-plugin-page-creator",
      options: {
        path: "./src/pages",
      },
    },
    {
      resolve: "gatsby-plugin-less",
      options: {
        strictMath: true,
      },
    },
    {
      resolve: "gatsby-plugin-eslint",
      options: {
        test: /\.tsx?$/,
        stages: ["develop", "build-javascript"],
      },
    },
    {
      resolve: "gatsby-plugin-sass",
      options: {
        cssLoaderOptions: {
          localIdentName: "[emoji]",
        },
      },
    },
    "gatsby-plugin-typescript",
  ],
};
