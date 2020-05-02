/* eslint-disable @typescript-eslint/no-var-requires */
const { createFilePath } = require(`gatsby-source-filesystem`);
const path = require(`path`);
const fs = require("fs");

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `basepages` });
    createNodeField({ node, name: `slug`, value: slug });
  }
};

exports.onPreBootstrap = ({ reporter }, themeOptions) => {
  const contentPath = themeOptions.contentPath || "contents";

  if (!fs.existsSync(contentPath)) {
    reporter.info(`creating the ${contentPath} directory`);
    fs.mkdirSync(contentPath);
  }
  if (!fs.existsSync(`${contentPath}/blog`)) {
    reporter.info(`creating the ${contentPath}/blog directory`);
    fs.mkdirSync(`${contentPath}/blog`);
  }
  if (!fs.existsSync(`${contentPath}/portfolio`)) {
    reporter.info(`creating the ${contentPath}/portfolio directory`);
    fs.mkdirSync(`${contentPath}/portfolio`);
  }
  if (!fs.existsSync(`${contentPath}/basepages`)) {
    reporter.info(`creating the ${contentPath}/basepages directory`);
    fs.mkdirSync(`${contentPath}/basepages`);
  }
};
