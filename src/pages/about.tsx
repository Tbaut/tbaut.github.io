import React from "react";
import { graphql, Link } from "gatsby";
import Layout from "../components/layout";
import Img from "gatsby-image";
import SEO from "../components/seo";
import styled from "styled-components";

import "../style/basepage.less";
import SocialLinks from "../components/sociallinks";
import list from "../contents/media-pictures/list";
import useFluidImage from "../hooks/useFluidMediaImages";
import playImg from "../../static/images/play.svg";

interface Props {
  data: any;
  className?: string;
}

const About = function ({ data, className }: Props) {
  const picts = useFluidImage();

  const mediaElements = list
    .sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    })
    .map((media) => {
      const imgFluid = picts.allFile.edges.find(({ node }: any) => node.base === media.name);
      if (!imgFluid) {
        return null;
      }

      return (
        <div key={media.name} className="mediaWrapper col s12 m4 l4">
          <div className="mediaImageWrapper">
            <a href={media.url} rel="noreferrer" target="_blank">
              <Img className="mediaImage" fluid={imgFluid.node.childImageSharp.fluid} />
              <div className="playButtonWrapper">
                <img src={playImg} alt="play button" />
              </div>
            </a>
          </div>
          <div className="mediaTitle">{media.title}</div>
          <div className="mediaLocation text-secondary">{media.location}</div>
        </div>
      );
    });

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
              to make web3 easy to use, but I like challenges! I've been a product manager several years before becoming
              a full stack TS/JS developer.
              <br />
              <br /> I believe that the best PMs are those who understand the code of their products, and the best
              developers those who understand their users and the market in which their software evolves.
              <br />
              <br /> I like bouldering, travelling, and photography. You can find out about my code on Github, my
              writings on Medium, some of my photographs{" "}
              <Link className="text-secondary" to="/photos">
                here
              </Link>{" "}
              and contact me using any of the following links.
              <br />
              <br />
              <div className="social-links">
                <SocialLinks />
              </div>
            </div>
          </div>
          <h2 className="title media">Some talks</h2>
          <div className="row flex">{mediaElements}</div>
        </article>
      </div>
    </Layout>
  );
};

export default styled(About)`
  .profile-pic img {
    border-radius: 50%;
  }

  .content {
    margin-top: 0;
  }

  h1.title {
    font-size: 3rem;
  }

  .title.media {
    margin-top: 1rem;
    margin-bottom: 1rem;
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

  .mediaWrapper {
    margin-bottom: 2rem;
  }

  .mediaTitle,
  .mediaLocation {
    font-size: 16px;
    padding-left: 1rem;
  }

  .mediaLocation {
    font-size: 14px;
  }

  .mediaImageWrapper {
    position: relative;
    margin: 0 1rem 1rem 1rem;

    .mediaImage {
      border-radius: 1rem;
    }

    .playButtonWrapper {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      display: flex;
      align-items: center;

      img {
        height: 6rem;
        flex: 1;
        filter: invert(49%) sepia(45%) saturate(1234%) hue-rotate(197deg) brightness(100%) contrast(75%);
      }
    }
  }
`;

export const query = graphql`
  query ProfilePict {
    fileName: file(relativeDirectory: { eq: "profile-pic" }) {
      childImageSharp {
        fluid(maxWidth: 800) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`;
