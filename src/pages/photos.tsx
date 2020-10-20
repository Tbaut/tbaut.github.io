import React, { useEffect, useRef, useState } from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import Img from "gatsby-image";
import SEO from "../components/seo";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

import "../style/basepage.less";

const Photos = function ({ data, className }: { data: any; className?: string }) {
  const gallery = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<any | null>(null);
  const [fullScreen, setFullScreen] = useState(false);

  const getVal = function (elem: HTMLDivElement, style: string) {
    return parseInt(window.getComputedStyle(elem).getPropertyValue(style));
  };

  const getHeight = function (item: Element) {
    return item?.querySelector(".content")?.getBoundingClientRect().height || 0;
  };

  useEffect(() => {
    if (!gallery.current) {
      return;
    }

    const altura = getVal(gallery.current, "grid-auto-rows");
    const gap = getVal(gallery.current, "grid-row-gap");

    const resizeAll = function (gallery: HTMLDivElement | null) {
      if (!gallery) {
        console.error("no gallery found");
        return;
      }

      gallery.querySelectorAll(".gallery-item").forEach(function (item) {
        const el = item as HTMLElement;
        el.style.gridRowEnd = "span " + Math.ceil((getHeight(item) + gap) / (altura + gap));
      });
    };

    gallery.current.querySelectorAll("img").forEach(function (item) {
      const gitem = item?.parentElement?.parentElement;
      if (item.complete && gitem) {
        gitem.style.gridRowEnd = "span " + Math.ceil((getHeight(gitem) + gap) / (altura + gap));
      } else {
        item.addEventListener("load", function () {
          if (!gallery.current) {
            return;
          }

          if (!gitem) return;

          gitem.style.gridRowEnd = "span " + Math.ceil((getHeight(gitem) + gap) / (altura + gap));
        });
      }
    });

    window.addEventListener("resize", () => resizeAll(gallery.current));

    resizeAll(gallery.current);
  }, []);

  const handleClose = () => {
    setSelected(null);
    setFullScreen(false);
  };

  return (
    <Layout className={className}>
      <SEO
        lang="en"
        title={"Photos by Thibaut Sardan"}
        description={"Some of my favourite photos taken while traveling here or there."}
      />

      <h1 className="title">Some of my photos</h1>
      <div className={`fullscreen ${fullScreen ? "" : "hidden"}`} onClick={handleClose}>
        <div className={"close"} onClick={handleClose}>
          <FontAwesomeIcon icon={faTimesCircle} />
        </div>
        {selected && <Img fluid={selected} />}
      </div>
      <div className={"gallery "} id="gallery" ref={gallery}>
        {data.allFile.edges.map(({ node }: any, index: number) => {
          return (
            <div
              className="gallery-item"
              key={index}
              onClick={() => {
                setSelected(node.childImageSharp.fluid);
                setFullScreen(!fullScreen);
              }}
            >
              <div className="content">
                <Img fluid={node.childImageSharp.fluid} />
              </div>
            </div>
          );
        })}
      </div>
    </Layout>
  );
};

export default styled(Photos)`
  .title {
    font-size: 3rem;
    text-align: center;
  }

  .gallery {
    display: grid;
    grid-column-gap: 0px;
    grid-row-gap: 6px;
    grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
    grid-auto-rows: 8px;
    margin-top: 2rem;
  }

  .fullscreen {
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: #000000ad;
    z-index: 1000;
    cursor: pointer;
    display: flex;
    align-content: center;
  }

  .fullscreen .gatsby-image-wrapper {
    width: 100%;
    height: 100%;
    margin: auto;
    img {
      object-fit: contain !important;
    }
  }

  .close {
    position: absolute;
    top: 1rem;
    right: 1rem;
  }

  .fullscreen.hidden {
    display: none;
  }

  .gallery img {
    max-width: 100%;
    transition: all 0.5s ease;
  }
  .gallery img:hover {
    box-shadow: 0 0 32px #333;
  }
  .content {
    padding: 4px;
  }
  .gallery-item {
    transition: grid-row-start 300ms linear;
    transition: transform 300ms ease;
    transition: all 0.5s ease;
    cursor: pointer;
  }
  .gallery-item:hover {
    transform: scale(1.025);
  }
  @media (max-width: 600px) {
    .gallery {
      grid-template-columns: repeat(auto-fill, minmax(30%, 1fr));
    }
  }
  @media (max-width: 400px) {
    .gallery {
      grid-template-columns: repeat(auto-fill, minmax(50%, 1fr));
    }
  }
  @keyframes zoomin {
    0% {
      max-width: 50%;
      filter: blur(4px);
    }
    100% {
      max-width: 100%;
    }
  }
`;

export const query = graphql`
  query {
    allFile(filter: { relativeDirectory: { eq: "best-pictures" } }) {
      edges {
        node {
          base
          childImageSharp {
            fluid(maxWidth: 1200) {
              ...GatsbyImageSharpFluid
              ...GatsbyImageSharpFluidLimitPresentationSize
            }
          }
        }
      }
    }
  }
`;
