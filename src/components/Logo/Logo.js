import React from "react";
import burgerLogo from '../../assets/images/28.1 burger-logo.png.png'
import './Logo.css'
const Logo = (props) => (
  <div className="Logo" style={{height: props.height}}>
      <img src={burgerLogo} alt="Myburger"/>
  </div>
);

export default Logo;