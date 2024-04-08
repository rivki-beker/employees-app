import { useContext } from "react";
import { Link } from "react-router-dom";
import { FaUsers, FaUserCog } from 'react-icons/fa';
import Button from "@mui/material/Button";
import { IsConnected } from "../../App";

export default function Home() {
  const isConnected = useContext(IsConnected).isConnected;
  const backgroundStyle = {
    textAlign: "left",
    color: "#fff",
    backgroundImage: `url('/homepage.jpg')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100vh",
    display: "flex",
    alignItems: "center",
  };

  return (
    <div style={backgroundStyle}>
      <div
        style={{
          width: "60vw",
          paddingBottom: "10vw",
          paddingTop: "10vw",
          paddingLeft: "20vw",
        }}
      >
        <h1 style={{ animation: "fadeIn 3s forwards" }}>Welcome to the employee management application</h1>
        <h2 style={{ animation: "fadeInUp 2s forwards" }}>WorkTango</h2>
        {isConnected ? (
          <p style={{ animation: "fadeIn 2s forwards" }}>Start managing your employee data</p>
        ) : (
          <p style={{ animation: "fadeIn 2s forwards" }}>View employee details and role names</p>
        )}
        {isConnected && (
          <div
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              marginTop: "5vw",
            }}
          >
            <Link to="employees" style={{ textDecoration: "none" }}>
              <Button
                startIcon={<FaUsers />}
                sx={{
                  margin: "5px",
                  ":hover": { backgroundColor: "grey", color: "white", transform: "scale(1.1)" },
                  textTransform: "lowercase",
                  fontSize: "20px",
                  backgroundColor: "#9a074c",
                  color: "white",
                  transition: "transform 0.3s ease",
                }}
                color="inherit"
                variant="contained"
              >
                Manage employee data
              </Button>
            </Link>
            <Link to="roles" style={{ textDecoration: "none" }}>
              <Button
                startIcon={<FaUserCog />}
                sx={{
                  margin: "5px",
                  ":hover": { backgroundColor: "grey", color: "white", transform: "scale(1.1)" },
                  textTransform: "lowercase",
                  fontSize: "20px",
                  backgroundColor: "#9a074c",
                  color: "white",
                  transition: "transform 0.3s ease",
                }}
                color="inherit"
                variant="contained"
              >
                View and add role names
              </Button>
            </Link>
          </div>
        )}
        {!isConnected && (
          <div
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              marginTop: "5vw",
            }}
          >
            <Link to="employees" style={{ textDecoration: "none" }}>
              <Button
                startIcon={<FaUsers />}
                sx={{
                  margin: "5px",
                  ":hover": { backgroundColor: "grey", color: "white", transform: "scale(1.1)" },
                  textTransform: "lowercase",
                  fontSize: "20px",
                  backgroundColor: "#9a074c",
                  color: "white",
                  transition: "transform 0.3s ease",
                }}
                color="inherit"
                variant="contained"
              >
                View employee details
              </Button>
            </Link>
            <Link to="roles" style={{ textDecoration: "none" }}>
              <Button
                startIcon={<FaUserCog />}
                sx={{
                  margin: "5px",
                  ":hover": { backgroundColor: "grey", color: "white", transform: "scale(1.1)" },
                  textTransform: "lowercase",
                  fontSize: "20px",
                  backgroundColor: "#9a074c",
                  color: "white",
                  transition: "transform 0.3s ease",
                }}
                color="inherit"
                variant="contained"
              >
                View role names
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
