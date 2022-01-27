import React, { useState, useEffect, useRef } from "react";
import { Link } from "gatsby";
import Sidebar from "react-sidebar";
import NavLinks from "./navlinks";
import SocialLinks from "./sociallinks";
import Logo from "./logo";
import { Hamburger } from "./icons";

import "../style/navbar.less";

const SidebarContents = () => {
  return (
    <div className="sidebar-contents">
      <div className="logo">
        <Link to="/">
          <Logo />
        </Link>
      </div>
      <div className="links text-secondary">
        <NavLinks />
      </div>
      <div className="social-links">
        <SocialLinks />
      </div>
    </div>
  );
};

const Navbar = (props: { placeholder: boolean }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [navbarPlaceholderHeight, setNavbarPlaceholderHeight] = useState(100);
  const myNav = useRef<HTMLElement>(null);

  const menuOpen = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void => {
    event.preventDefault();
    setSidebarOpen(true);
  };

  const changeNavbarPlaceholderHeight = () => {
    if (myNav.current) {
      const newNavbarPlaceholderHeight = myNav.current.offsetHeight;
      setNavbarPlaceholderHeight(newNavbarPlaceholderHeight);
    }
  };

  useEffect(() => {
    changeNavbarPlaceholderHeight();

    if (myNav?.current) {
      const logo = myNav.current.querySelector(".logo");

      if (logo) {
        logo.addEventListener("load", () => {
          changeNavbarPlaceholderHeight();
        });
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (myNav.current) {
        if (window.scrollY > 0) {
          myNav.current.classList.add("scrolled");
        } else {
          myNav.current.classList.remove("scrolled");
        }
      }
    });
  }, []);

  return (
    <React.Fragment>
      <Sidebar
        sidebar={<SidebarContents />}
        open={sidebarOpen}
        onSetOpen={setSidebarOpen}
        sidebarClassName="sidebar-content"
        styles={{
          sidebar: {
            zIndex: "101",
            position: "fixed",
          },
          overlay: {
            zIndex: "100",
          },
          dragHandle: {
            position: "fixed",
            zIndex: "99999",
          },
        }}
      >
        <span></span>
      </Sidebar>
      <nav className="text-secondary" ref={myNav}>
        <a href="#mobilenav" id="menu-open" onClick={menuOpen}>
          <span className="icon">
            <Hamburger />
          </span>
        </a>
        <Link to="/">
          <Logo />
        </Link>
        <NavLinks />
      </nav>
      {props.placeholder && (
        <div
          className="navbar-placeholder"
          style={{
            height: navbarPlaceholderHeight + "px",
          }}
        ></div>
      )}
    </React.Fragment>
  );
};

export default Navbar;
