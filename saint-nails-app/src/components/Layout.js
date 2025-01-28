// src/components/Layout.js
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Homepage from './Homepage';
import Bookings from './Bookings';


const InfoBgContainer = styled.div`
  display: none;

  @media (max-width: 720px) {
    padding: 20px;
    max-width: 720px;
    height: 80vh;
    display: flex;
    width: 100%;
    z-index: 1109;
    position: fixed; /* Added to contain the absolute positioned InfoBg */
    overflow: hidden; /* Ensure the image doesn't overflow the container */
  }
`;

const InfoBg = styled.div`
  display: none;

  @media (max-width: 720px) {
    display: flex;
    position: absolute;
    z-index: 1108;
    width: calc(100% - 20vh); /* Adjust width to account for margin */
    height: calc(100% - 20vh); /* Adjust height to account for margin */
    margin: 10vh; /* Add margin */
    justify-content: center;
    align-items: center;
    background-size: cover;
    background-position: center; /* Ensure the image is centered */
    background-image: url('./women-with-creative-nail-art-collage.jpg');
    top: 0;
    left: 0;
  }
`;
const LayoutContainer = styled.div`
  display: flex;
  height: 100vh;
  object-fit: contain;
  background-image: url('hands-with-colorful-nails.jpg');
  background-color: rgb(240, 238, 227);
  overflow-x: hidden; // Prevent horizontal scrolling
`;

const Title = styled.h1`
  position: fixed;
  z-index: 1318;
  padding-left: 20px;
  background-color: rgb(255, 0, 170);

  @media (max-width: 720px) {
    position: fixed;
    z-index: 1310;
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
    height: 100vh;
    margin: 0;
    border-radius: 0;
    position: fixed;
    
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
  object-fit: cover;
  }

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
    z-index: 1213;
    cursor: pointer;
    font-size: 24px;  
    color: rgb(255, 0, 170);
  }
`;

const MobileNavbar = styled.nav`
  display: none;

  @media (max-width: 720px) {
    display: flex;
    flex-direction: row;
    position: fixed;
    top: 60px;
    right: ${({ isOpen }) => (isOpen ? '0%' : '-80%')}; // Adjusted to center horizontally
    width: 80%;
    z-index: 1214;
    gap: 10px;
    background-color: rgb(24, 23, 24);
    padding: 20px;
    transition: right 0.3s ease-in-out;
    visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
    opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
    justify-content: center; // Center the items horizontally
  }
`;


const Description = styled.p`
  display: block;
  position: absolute;
  bottom: 0;
  background-color: rgba(255, 0, 170, 0);
  color: white;
  width: 100%;
  padding: 10px;
  text-align: center;
  transition: transform 0.5s ease-in-out;
  transform: ${({ isVisible }) => (isVisible ? 'translateY(0)' : 'translateY(100%)')};

  @media (max-width: 720px) {
    margin-top: 10px;
    margin-left: 30px;
    padding: 10px;
    height: 5vh;
    font-size: 14px;
    position: relative;
    text-align: left;
    z-index: 1209;

    transition: right 0.3s ease-in-out;
  }
`;

const Content = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
`;

const Layout = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDescriptionVisible, setIsDescriptionVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 720);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('home'); // Track current page

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

  const bookings = [
    { id: 1, name: 'Classic Manicure', price: 'R25', image: '/price-list/img-0.jpg', 
      details: 'Pamper your hands with a classic manicure, including nail shaping, cuticle care, and a soothing hand massage. Finish with your choice of polish for a clean, polished look.' },
    { id: 2, name: 'Gel Manicure', price: 'R35', image: '/price-list/img-1.jpeg', 
      details: 'Experience long-lasting beauty with a gel manicure. Enjoy glossy, chip-resistant nails that stay flawless for up to two weeks, featuring a UV-cured gel finish in a variety of colors.' },
    { id: 3, name: 'Acrylic Nails', price: 'R45', image: '/price-list/img-2.jpg', 
      details: 'Elevate your look with durable, custom-shaped acrylic nails. Perfect for length and strength, these nails are a statement of elegance and style, tailored to your preferences.' },
    { id: 4, name: 'Nail Art', price: 'R50', image: '/price-list/img-3.jpg', 
      details: 'Express your creativity with custom nail art. From intricate designs to bold accents, our skilled technicians will create a unique look that suits your personality and style.' },
    { id: 5, name: 'Pedicure', price: 'R40', image: '/price-list/img-4.png', details: 'Details about Pedicure...' },
  ];

  const info_text = {
    info: "Nails crafted with care. Located in Braamfontein. Press on any item for more info and book via the WhatsApp button.",
  };

  const handleBookingClick = (booking) => {
    setSelectedBooking(booking);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBooking(null);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setIsMenuOpen(false); // Close the mobile menu after navigation
  };

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
          
          <Description> {info_text.info} </Description>

          <BurgerMenu onClick={() => setIsMenuOpen(!isMenuOpen)}>☰</BurgerMenu>
          <MobileNavbar isOpen={isMenuOpen}>
            <NavItem onClick={() => handlePageChange('home')}>Home</NavItem>
            <NavItem onClick={() => handlePageChange('about')}>About</NavItem>
            <NavItem onClick={() => handlePageChange('bookings')}>Bookings</NavItem>
          </MobileNavbar>

          <ImageCarousel onClick={() => setIsDescriptionVisible(!isDescriptionVisible)}>
          <CarouselImage
          src={images[16]} // Access the 12th element directly
          alt="Nail Style 12"
          isActive={true} // You can adjust this as needed
          />
            <Title>Saint Nails</Title>

          </ImageCarousel>
          {currentPage === 'home' && <Homepage isMobile={isMobile} />}
          {currentPage === 'bookings' && (
            <Bookings
              bookings={bookings}
              handleBookingClick={handleBookingClick}
              selectedBooking={selectedBooking}
              isModalOpen={isModalOpen}
              handleCloseModal={handleCloseModal}
            />
          )}
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
            <Content>
              <Homepage isMobile={isMobile} />
            </Content>
          </RightSection>
        </>
      )}
    </LayoutContainer>
  );
};

export default Layout;