import React from "react";

function Footer() {
  return (
    <div
      style={{
        display: "flex",
        minHeight: "50vh",
        backgroundColor: "#e1e1e1",
        textAlign: "left",
        color: "#000000c7",
        padding: "20px",
      }}
    >
      <div
        style={{
          flex: 1,
          borderRight: "1px solid #ccc",
          padding: "0 20px",
        }}
      >
        <h6 style={{ fontSize: "25px", margin: 0 }}>
          The employee management application
        </h6>
        <h6 style={{ fontSize: "20px", marginTop: "1vw", color: "#9a074c" }}>
          WorkTango
        </h6>
        <img
          src='/logo.png'
          alt="Business Logo"
          style={{ width: "25vw", maxHeight: "100%", objectFit: "contain" }}
        />
      </div>

      <div style={{ flex: 1, padding: "0 20px" }}>
        <p style={{ fontSize: "22px" }}>
          If you have a question regarding the conduct of the website or the
          management and organization of employee information, we are here for
          you-
        </p>
        <h6 style={{ fontSize: "20px", margin: 0 }}>
          Address: 45 Quarry Street, New Jersey, USA
          <br />
          Email: johnnywalt@gmail.com
          <br />
          Phone number: +1 543 789 765
        </h6>
        <p style={{ fontSize: "22px" }}>
          We look forward to hearing from you later-
        </p>
        <h6 style={{ fontSize: "20px", margin: 0, color: "#087088" }}>
          Johnny Walt, the application developer
        </h6>
      </div>
    </div>
  );
}

export default Footer;