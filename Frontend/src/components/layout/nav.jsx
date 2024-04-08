import React, { useContext } from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Slide from "@mui/material/Slide";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import CssBaseline from "@mui/material/CssBaseline";
import { Home } from "@mui/icons-material";
import { IsConnected } from "../../App";

function HideOnScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};

export default function Nav(props) {
  const setIsConnected = useContext(IsConnected).setIsConnected;

  function Logout() {
    setIsConnected(false);
    localStorage.setItem("security_token", "");
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <HideOnScroll {...props}>
        <AppBar component="nav" sx={{ backgroundColor: "#087088" }}>
          <Toolbar sx={{ flexWrap: 'wrap', justifyContent: 'space-between' }}>
            <img src="/logoNav.png" height="40px"></img>
            <div>
              <Button href="/roles" color="inherit">
                Roles
              </Button>
              <Button href="/employees" color="inherit">
                Employees
              </Button>
              {useContext(IsConnected).isConnected ? (
                <Button onClick={Logout} color="inherit">
                  Logout
                </Button>
              ) : (
                <Button href="/login" color="inherit">
                  Login
                </Button>
              )}
              <Button href="/" color="inherit">
                <Home />
              </Button>
            </div>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar />
    </React.Fragment>
  );
}
