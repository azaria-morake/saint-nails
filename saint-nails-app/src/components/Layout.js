// src/components/Layout.js
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const LayoutContainer = styled.div`
  display: flex;
  height: 100vh;
  background-position: center;
  background-size: 50%;
  background-color:rgb(240, 227, 238);
 
 /* background-image: linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.5)),
              url('clem-onojeghuo-HxHdSIesKg4-unsplash.jpg'); */

  
  /* background-image: url('clem-onojeghuo-HxHdSIesKg4-unsplash.jpg')*/
`;

const Title = styled.h1`

    position: fixed;
    z-index: 1008;
    padding-left: 20px;
    background-color:rgb(255, 0, 170);


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
width: 50%;
height: 50%;
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

  @media (max-width: 720px) {

    width: 100%;
    width: 10%;
    height: 10%;
  }
`;

const RightSection = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;

  @media (max-width: 720px) {
    width: 100%;
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
    width: 10%;
  }
`;

const NavItem = styled.a`
  text-decoration: none;
  color: #333;
  font-size: 1.2rem;
  position: sticky;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  
  &:hover {
    color:rgb(228, 228, 228);
    background-color:rgb(255, 0, 170);
    border-radius: 5px;

  }
`;

const Buttoner = styled.div`
  color:rgb(34, 34, 34);
  border-radius: 5px;

`;
const Content = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
`;

const Layout = ({ children }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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
    }, 3000); // Switch images every 3 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [images.length]);

  return (
    <LayoutContainer>
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
    </LayoutContainer>
  );
};

export default Layout;

