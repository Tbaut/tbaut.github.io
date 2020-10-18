import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import styled from "styled-components";

function ListItem(props: any) {
  const data = props.data;
  return (
    <li>
      <a href={data.url} title={data.name}>
        <img src={data.icon} alt={data.name} />
      </a>
    </li>
  );
}

const SocialLinks = function ({ className }: { className?: string }) {
  const data = useStaticQuery(graphql`
    query SocialQuery {
      site {
        siteMetadata {
          social {
            name
            url
            icon
          }
        }
      }
    }
  `);
  const items = data.site.siteMetadata.social;
  const list: any[] = [];
  items.forEach(function (e: any, i: any) {
    list.push(<ListItem key={e.url + "-" + e.icon + "-" + i} data={e} />);
  });
  return <ul className={"social-links " + className}>{list}</ul>;
};

export default styled(SocialLinks)`
  list-style: none;

  li {
    margin: 5px 0;
    img {
      opacity: 0.7;
      width: 48px;
      transition: opacity 0.25s;
    }

    &:hover {
      img {
        opacity: 1;
      }
    }
  }

  & img {
    filter: invert(49%) sepia(45%) saturate(1234%) hue-rotate(197deg) brightness(100%) contrast(75%);
  }
`;
