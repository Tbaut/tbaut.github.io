import React, { useState, useEffect, useRef } from "react";
import Layout from "../components/layout";
import { graphql } from "gatsby";
import SEO from "../components/seo";
import { Link } from "gatsby";
import SocialLinks from "../components/sociallinks";
import PortfolioList from "../components/list-portfolio";
import "../style/wall.less";

const IndexPage = (props: any) => {
  const [winHeight, setWindowHeight] = useState<string | number>("100vh");

  const createSVGElement = function (n: any, v: any) {
    n = document.createElementNS("http://www.w3.org/2000/svg", n);
    for (const p in v) n.setAttributeNS(null, p, v[p]);
    return n;
  };

  useEffect(() => {
    setWindowHeight(window.innerHeight);
    window.addEventListener("resize", () => {
      setWindowHeight(window.innerHeight);
    });
  }, []);

  const svg = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (svg?.current) {
      const sWidth = svg.current.clientWidth,
        tText = svg.current.querySelector("text");
      let tWidth = tText?.getBoundingClientRect().width;

      if (tWidth && tWidth > sWidth) {
        const tInnerText = tText?.innerHTML;
        if (tText && tInnerText && tInnerText.split(" ").length > 1) {
          tText.innerHTML = "";
          tInnerText.split(" ").forEach((e: any, i: any) => {
            const tSpan = createSVGElement("tspan", {
              dy: i === 0 ? "0em" : ".8em",
              x: "50",
            });
            tSpan.innerHTML = e;
            tText.appendChild(tSpan);
          });
          setTimeout(() => {
            if (svg?.current?.style?.height) {
              svg.current.style.height = `${tText.getBoundingClientRect().height + 70}`;
              svg.current.style.margin = "15px auto";
            }
          }, 250);
        } else {
          while (tText && tWidth > sWidth) {
            const fontSize = parseInt(window.getComputedStyle(tText, null).getPropertyValue("font-size"));
            tText.style.fontSize = fontSize - 1 + "px";
            tWidth = tText.getBoundingClientRect().width;
          }
        }
      }
    }
  });

  return (
    <Layout placeholder={false}>
      <SEO lang="en" title={props.data.site.siteMetadata.title} />
      <div className="wall" style={{ height: winHeight + "px" }}>
        <div className="intro container">
          <div className="main-title text-primary">
            <svg width="90%" height="220px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" ref={svg}>
              {props.data.site.siteMetadata.capitalizeTitleOnHome
                ? props.data.site.siteMetadata.header.toUpperCase()
                : props.data.site.siteMetadata.header}
              <pattern id="wallPattern" patternUnits="userSpaceOnUse" width="100" height="100">
                <rect x="0" y="0" className="fill-primary" width="100" height="100" />
                <image
                  xlinkHref={props.data.site.siteMetadata.titleImage}
                  height="100"
                  width="100"
                  y="0"
                  preserveAspectRatio="none"
                />
              </pattern>
              <text fill="url(#wallPattern)" textAnchor="middle" x="50" y="50">
                {props.data.site.siteMetadata.capitalizeTitleOnHome
                  ? props.data.site.siteMetadata.header.toUpperCase()
                  : props.data.site.siteMetadata.header}
              </text>
            </svg>
          </div>
          <p className="tag-line text-secondary">{props.data.site.siteMetadata.introTag}</p>
          <p className="caption text-tertiary">{props.data.site.siteMetadata.description}</p>
          <Link to="/about" className="btn">
            ABOUT ME
          </Link>
        </div>
        <div className="social-buttons">
          <SocialLinks />
        </div>
      </div>
      {/* <PortfolioList /> */}
    </Layout>
  );
};

export default IndexPage;

export const query = graphql`
  query {
    site {
      siteMetadata {
        header
        title
        capitalizeTitleOnHome
        titleImage
        introTag
        description
        social {
          name
          url
          icon
        }
      }
    }
  }
`;
