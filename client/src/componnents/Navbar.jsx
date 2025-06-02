import React, { useState } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import Button from "./Button";
import { MenuRounded } from "@mui/icons-material";
import LogoImg from "../utils/Images/Logo.svg";

const Nav = styled.div`
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  position: sticky;
  top: 0;
  z-index: 10;
  color: white;
`;

const NavbarContainer = styled.div`
  width: 100%;
  max-width: 1400px;
  padding: 0 24px;
  display: flex;
  gap: 14px;
  align-items: center;
  justify-content: space-between;
  font-size: 1rem;
`;

const NavLogo = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 6px;
  font-weight: 500;
  font-size: 18px;
  text-decoration: none;
  gap: 12px;
`;

const Logo = styled.img`
  height: 40px;
`;

const NavItems = styled.ul`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 32px;
  padding: 0 6px;
  list-style: none;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const Navlink = styled(NavLink)`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.white};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  text-decoration: none;
  &:hover {
    border-bottom: 1.8px solid ${({ theme }) => theme.primary};
  }
  &.active {
    color: ${({ theme }) => theme.white};
    border-bottom: 1.8px solid ${({ theme }) => theme.white};
  }
`;

const ButtonContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  gap: 28px;
  align-items: center;
  padding: 0 6px;
  color: ${({ theme }) => theme.text_primary};
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const MobileIcon = styled.div`
  color: ${({ theme }) => theme.white};
  display: none;
  cursor: pointer;
  @media screen and (max-width: 768px) {
    display: flex;
    align-items: center;
  }
`;

const MobileMenu = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 16px;
  list-style: none;
  width: 80%;
  padding: 12px 40px 24px 40px;
  background: ${({ theme }) => theme.card_light + 99};
  position: absolute;
  top: 80px;
  right: 0;
  transition: all 0.6s ease-in-out;
  transform: ${({ isOpen }) => (isOpen ? "translateY(0)" : "translateY(-100%)")};
  border-radius: 0 0 20px 20px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
  opacity: ${({ isOpen }) => (isOpen ? "100%" : "0")};
  z-index: ${({ isOpen }) => (isOpen ? "1000" : "-1000")};
`;

const Navbar = ({ setOpenAuth, openAuth }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleAuthClick = () => {
    setOpenAuth(!openAuth);
  };

  return (
    <Nav>
      <NavbarContainer>
        <MobileIcon onClick={toggleMobileMenu}>
          <MenuRounded style={{ color: "inherit" }} />
        </MobileIcon>

        <NavLogo>
          <Logo src={LogoImg} alt="logo" />
        </NavLogo>

        <NavItems>
          <Navlink to="/">Home</Navlink>
          <Navlink to="/properties">Places to stay</Navlink>
          <Navlink to="/contact">Contact</Navlink>
          <Navlink to="/blogs">Blogs</Navlink>
        </NavItems>

        <ButtonContainer>
          <Button 
            type="secondary" 
            text="Sign Up" 
            small 
            onClick={handleAuthClick}
          />
          <Button 
            text="Sign In" 
            small 
            onClick={handleAuthClick}
          />
        </ButtonContainer>

        <MobileMenu isOpen={isOpen}>
          <Navlink to="/" onClick={toggleMobileMenu}>
            Home
          </Navlink>
          <Navlink to="/properties" onClick={toggleMobileMenu}>
            Places to stay
          </Navlink>
          <Navlink to="/contact" onClick={toggleMobileMenu}>
            Contact
          </Navlink>
          <Navlink to="/blogs" onClick={toggleMobileMenu}>
            Blogs
          </Navlink>
          <div style={{
            display: "flex",
            gap: "12px",
            width: "100%"
          }}>
            <Button
              type="secondary"
              text="Sign Up"
              small
              onClick={handleAuthClick}
            />
            <Button
              text="Sign In"
              small
              onClick={handleAuthClick}
            />
          </div>
        </MobileMenu>
      </NavbarContainer>
    </Nav>
  );
};

export default Navbar;