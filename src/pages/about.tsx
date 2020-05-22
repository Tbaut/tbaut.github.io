import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import Img from "gatsby-image";
import SEO from "../components/seo";
import styled from "styled-components";

import "../style/basepage.less";
import SocialLinks from "../components/sociallinks";

const About = function ({ data, className }: any) {
  return (
    <Layout>
      <SEO
        lang="en"
        title={"About Thibaut Sardan"}
        description={"I'm software engineer passionate about web3, privacy and.. good UX!"}
      />
      <div className={"container " + className}>
        <article className="post">
          <div className="content row flex">
            <div className="col s12 m4 l4">
              <div className="img profile-pic">
                <Img fluid={data.fileName.childImageSharp.fluid} />
              </div>
            </div>
            <div className="col s12 m8 l8 bio">
              <h1 className="title">About me</h1>
              I'm software engineer passionate about web3, privacy and.. good UX! I know, there's still a long way to go
              to to make web3 easy to use, but I like challenges! I've been a product manager several years before
              becoming a full stack JS/TS developer.
              <br />
              <br /> I believe that the best PMs are those who understand the code of their products, and the best
              developers those who understand their users and the market in which their software evolves.
              <br />
              <br /> I like bouldering, travelling, and photography. You can find out about my code on Github, my
              writings on Medium, and contact me using any of the following links.
              <br />
              <br />
              <div className="social-links">
                <SocialLinks />
              </div>
            </div>
          </div>
        </article>
      </div>
    </Layout>
  );
};

export default styled(About)`
  .profile-pic img {
    border-radius: 50%;
    margin-top: 0.1rem;
  }

  .content {
    margin-top: 0;
  }

  h1.title {
    font-size: 3rem;
    margin-top: 0.1rem;
  }

  .bio {
    padding: 0 2rem 2rem 2rem;
  }

  .social-links {
    text-align: center;

    ul {
      li {
        display: inline-block;
      }
    }
  }
`;

export const query = graphql`
  query {
    fileName: file(relativeDirectory: { eq: "profile-pic" }) {
      childImageSharp {
        fluid(maxWidth: 800) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`;
