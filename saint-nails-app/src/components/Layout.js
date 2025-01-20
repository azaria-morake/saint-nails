// src/components/Layout.js
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const LayoutContainer = styled.div`
  display: flex;
  height: 100vh;
  background-color: rgb(240, 238, 227);
  /* background-color: rgb(240, 227, 238); */
`;

const Title = styled.h1`
  position: fixed;
  z-index: 1008;
  padding-left: 20px;
  background-color: rgb(255, 0, 170);

@media (max-width: 720px) {
  position: fixed;
  z-index: 10010;
  top: -10px;
  right: 50px;

  

}

`;

const ImageCarousel = styled.div`
  width: 50%;
  background-color: #f0f0f0;
  display: flex;
  justify-content: normal;
  align-items: normal;
  border: 1px solid #ccc;
  position: relative;
  overflow: hidden;
  margin: 20px;
  border-radius: 10px;

  @media (max-width: 720px) {
    width: 100%;
    height: 90vh;
    margin: 0;
    border-radius: 0;
  }
`;

const CarouselImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  opacity: ${({ isActive }) => (isActive ? 1 : 0)};
  transition: opacity 1s ease-in-out;
`;

const RightSection = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;

  @media (max-width: 720px) {
    display: none; // Hide RightSection on mobile
  }
`;

const Navbar = styled.nav`
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-bottom: 1px solid #ccc;

  @media (max-width: 720px) {
    display: none; // Hide Navbar on mobile
  }
`;

const NavItem = styled.a`
  text-decoration: none;
  color: #333;
  font-size: 1.2rem;
  padding: 10px;
  color: black;
  background-color: rgb(255, 0, 170);
  border-radius: 5px;
  margin-right: 20px;

  &:hover {
    color: rgb(0, 0, 0);
    background-color: rgb(228, 228, 228);
    border-radius: 5px;
  }
`;

const BurgerMenu = styled.div`
  display: none;
  @media (max-width: 720px) {
    display: block;
    position: fixed;
    top: 10px;
    left: 10px;
    z-index: 1001;
    cursor: pointer;
    font-size: 24px;
    color: rgb(255, 0, 170);
  }
`;

const MobileNavbar = styled.nav`
  display: none;
  @media (max-width: 720px) {
    display: flex;
    flex-direction: row-reverse;
    position: absolute;
    top: 60px;
    right: ${({ isOpen }) => (isOpen ? '0' : '-100%')};
    /* background-color:  rgb(228, 228, 228); */
    width: 80%;
    z-index: 1000;
    gap: 20px;
    transition: right 0.3s ease-in-out;
    border-radius: 5px;
    font-weight: bold;
  }
`;

/*

const MobileNavbar = styled.nav`
  display: none;
  @media (max-width: 720px) {
    display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
    flex-direction: row-reverse;
    position: absolute;
    top: 4px;
    right: ${({ isOpen }) => (isOpen ? '0' : '-100%')};
    background-color:  rgb(228, 228, 228);;
    width: 100%;
    z-index: 1000;
    gap: 20px;
    transition: right 0.3s ease-in-out;
  }
`;

*/

const Description = styled.p`
  display: ${({ isVisible }) => (isVisible ? 'block' : 'none')};
  position: absolute;
  bottom: 0; 
  background-color: rgba(255, 0, 170, 0.9);
  color: white;
  width: 100%;
  padding: 10px;
  text-align: center;
  transition: transform 0.5s ease-in-out;
  transform: ${({ isVisible }) => (isVisible ? 'translateY(0)' : 'translateY(100%)')};

  @media (max-width: 720px) {
    margin-top:60px;
    margin-left: 30px;
    padding: 40px;
    height: 40vh ;
    font-size: 3.5vh;
    position: relative;
    text-align: right;
    top: 20vh;
    transition: right 0.3s ease-in-out;
  }
`;

const Content = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
`;

const Layout = ({ children }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDescriptionVisible, setIsDescriptionVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 720);

  const images = [
    '/img-7.jpg',
    '/img-6.jpg',
    '/img-5.jpg',
    '/img-4.jpg',
    '/img-23.jpg',
    '/img-22.jpg',
    '/img-20.jpg',
    '/img-19.jpg',
    '/img-18.jpg',
    '/img-17.jpg',
    '/img-16.jpg',
    '/img-15.jpg',
    '/img-14.jpg',
    '/img-13.jpg',
    '/img-12.jpg',
    '/img-11.jpg',
    '/img-10.jpg',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 720);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <LayoutContainer>
      {isMobile ? (
        <>
          <BurgerMenu onClick={() => setIsMenuOpen(!isMenuOpen)}>☰</BurgerMenu>
          <MobileNavbar isOpen={isMenuOpen}>
            <NavItem href="/">Home</NavItem>
            <NavItem href="/about">About</NavItem>
            <NavItem href="/bookings">Bookings</NavItem>
          </MobileNavbar>
          <ImageCarousel onClick={() => setIsDescriptionVisible(!isDescriptionVisible)}>
            {images.map((image, index) => (
              <CarouselImage
                key={index}
                src={image}
                alt={`Nail Style ${index + 1}`}
                isActive={index === currentImageIndex}
              />
            ))}
            <Title>Saint Nails</Title>
            <Description isVisible={isDescriptionVisible}>
              Nails crafted with care. Located in Braamfontein | Walk-in/ appointment via WhatsApp @ +27 61 696 3634.
            </Description>
          </ImageCarousel>
        </>
      ) : (
        <>
          <ImageCarousel>
            <Title>Saint Nails</Title>
            {images.map((image, index) => (
              <CarouselImage
                key={index}
                src={image}
                alt={`Nail Style ${index + 1}`}
                isActive={index === currentImageIndex}
              />
            ))}
          </ImageCarousel>
          <RightSection>
            <Navbar>
              <NavItem href="/">Home</NavItem>
              <NavItem href="/about">About</NavItem>
              <NavItem href="/bookings">Bookings</NavItem>
            </Navbar>
            <Content>{children}</Content>
          </RightSection>
        </>
      )}
    </LayoutContainer>
  );
};

export default Layout;