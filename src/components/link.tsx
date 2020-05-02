import React from "react";
import GatsbyLink from "gatsby-link";

const Link = (props: any) => {
  if (props.to.startsWith("/")) {
    return <GatsbyLink {...props}>{props.children}</GatsbyLink>;
  }

  return <a href={props.to}>{props.children}</a>;
};

export default Link;
