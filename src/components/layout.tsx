import React, { ReactNode } from "react";
import Head from "./head";
import Navbar from "./navbar";
import Footer from "./footer";
import styled from "styled-components";

interface Props {
  className?: string;
  children?: ReactNode;
  placeholder?: boolean;
}
const Layout = ({ className, placeholder, children }: Props) => {
  return (
    <div className={className}>
      <Head />
      <Navbar placeholder={placeholder === undefined ? true : placeholder} />
      <div className="wrapper">{children}</div>
      <Footer />
    </div>
  );
};

export default styled(Layout)`
  position: relative;
  min-height: 100vh;
`;
