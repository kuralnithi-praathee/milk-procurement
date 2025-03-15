import React from "react";
import { Container } from "react-bootstrap";
import { cssProperties } from "../utils/commonCssProperties";

const Layout = ({ children }) => {

  return (
    <Container
      fluid
    //   className="px-4 py-3"
      style={{
        width: `calc(100% - ${cssProperties?.drawerWidth}px)`,
        // marginLeft: showSidebar ? `${cssProperties?.drawerWidth}px` : "0px",
        // height: `calc(100% - ${cssProperties?.headerHight}px)`,
        marginTop: `${cssProperties?.headerHight}px`,

      }}
    >
      {children}
    </Container>
  );
};

export default Layout;
