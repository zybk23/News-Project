import React from "react";
import Container from "../Container";
import "./style.scss";

const Navigation = () => {
  return (
    <div className="navigation-container">
      <Container>
        <img src={require("../../assets/images/logo.png")} alt="" />
      </Container>
    </div>
  );
};

export default Navigation;
