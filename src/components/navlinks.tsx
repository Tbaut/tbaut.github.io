import React, { useState, useEffect } from "react";
import { useStaticQuery, graphql } from "gatsby";
import Link from "./link";
import { Location } from "@reach/router";
import { Sun, Moon } from "./icons";

function ListItem(props: any) {
  const data = props.data;
  const anchorAttrs = {
    href: data.url,
    title: data.name,
  };
  return (
    <Location>
      {({ location }) => {
        return (
          <li>
            <Link
              to={data.url}
              {...anchorAttrs}
              className={"/" + location.pathname.split("/")[1] === data.url ? "active" : ""}
            >
              <span>{data.name}</span>
            </Link>
          </li>
        );
      }}
    </Location>
  );
}

const ThemeSwitchButton = (props: { darkMode: boolean }) => {
  const localDarkMode = localStorage.getItem("darkMode") || props.darkMode || true;
  const [darkMode, setDarkMode] = useState<boolean>(localDarkMode === "true");

  useEffect(() => {
    document.body.className = darkMode ? "dark-mode" : "";
  }, [darkMode]);

  const swichClick = () => {
    setDarkMode(!darkMode);
    localStorage.setItem("darkMode", `${!darkMode}`);
  };

  return (
    <React.Fragment>
      <li className="switch-theme">
        <div role="button" className="switch-button" onClick={swichClick}>
          <div title="Switch to Dark Mode" data-switch-to="dark" className={!darkMode ? "active" : ""}>
            <Moon />
          </div>
          <div title="Switch to Light Mode" data-switch-to="light" className={darkMode ? "active" : ""}>
            <Sun />
          </div>
        </div>
      </li>
    </React.Fragment>
  );
};

export default function () {
  const data = useStaticQuery(graphql`
    query NavbarLinkQuery {
      site {
        siteMetadata {
          navLinks {
            name
            url
          }
          darkmode
          switchTheme
        }
      }
    }
  `);
  const items = data.site.siteMetadata.navLinks;
  const list = [];

  items.forEach(function (e: any, i: any) {
    list.push(<ListItem key={e.url + "-" + i} data={e} />);
  });

  if (data.site.siteMetadata.switchTheme) {
    list.push(<ThemeSwitchButton key="themeswitcher" darkMode={data.site.siteMetadata.darkmode} />);
  }

  return <ul className="navbar-links">{list}</ul>;
}
