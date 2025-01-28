// src/components/Homepage.js
import React, { useState } from 'react';
import styled from 'styled-components';
import Modal from './Modal';

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: rgb(240, 238, 227);
  overflow-x: hidden; // Prevent horizontal scrolling
  position: relative; // Change to relative to contain children
  z-index: 1;
`;

const Description = styled.p`
  text-align: none;
  line-height: 1.6;
  position: relative;
  z-index: 5;
  color: black;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 40px;

  @media (max-width: 720px) {
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
  }
`;

const BookingItem = styled.div`

  display: flex;
  align-items: center;
  background-color: rgba(44, 39, 39, 0.8);
  margin-bottom: 1px;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  background-size: cover;
  background-position: 200px -140px;
  transition: transform 0.3s ease-in-out;
  transform: ${({ isSelected }) => (isSelected ? 'translateY(0)' : 'translateY(0)')};
  width: 100%; // Ensure full width
  padding: 10px; // Add padding for better spacing
  color: white;

  @media (max-width: 720px) { 

    
    background-color: rgba(31, 29, 29, 0.9);
    background-position: 140px;
    width: 80%;
    padding: 0;
    top:200px;
    border-radius: 0;


  }


`;

const BookingImage = styled.img`
  width: 75px;
  height: 75px;
  border-radius: none;
  object-fit: cover;
  margin-right: 10px;
  padding-left: 20px;

  @media (max-width: 720px) {

    padding-left: 10px;
  }
`;

const BookingDetails = styled.div`
  flex: 1;
  padding-bottom: 0px;
`;

const PopularStylesTitle = styled.h2`
  font-size: 1.5rem;
  color: black;
  margin-bottom: 20px;
  text-align: center;
  position: absolute;
  z-index: 1116;
  top: 17vh;
  background-color: rgba(255, 0, 170, 0.9);
  width: 90%; // Ensure full width
  padding: 10px; // Add padding for better spacing
`;

const PopularStylesContainer = styled.div`

display: hidden;

@media (max-width: 720px) {
  display: flex;
  top: 30vh; // Adjusted to ensure spacing below the title
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: relative;
  overflow: none;
  gap: 5px; // Adds spacing between items
  position: absolute;
  z-index: 1115;
  padding: 0; // Add padding to prevent squeezing
}
`;

const Homepage = ({ isMobile }) => {
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDescriptionVisible, setIsDescriptionVisible] = useState(false);

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

  const popularStyles = bookings.slice(0, 5); // Get the first 5 listings as popular styles

  const handleBookingClick = (booking) => {
    setSelectedBooking(booking);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBooking(null);
  };

  const info_text = {
    info: "Nails crafted with care. Located in Braamfontein | Walk-in/ appointment via WhatsApp @ +27 61 696 3634. Don't worry too much, just leave the pampering to us.",
  };

  return (
<>
      <Description isVisible={isDescriptionVisible}>{info_text.info}</Description>
      {isMobile && (
        <>
          <PopularStylesTitle>Popular Styles</PopularStylesTitle>
          <PopularStylesContainer>
            {popularStyles.map((booking) => (
              <BookingItem
                key={booking.id}
                onClick={() => handleBookingClick(booking)}
                isSelected={selectedBooking?.id === booking.id}
              >
                <BookingImage src={booking.image} alt={booking.name} />
                <BookingDetails>
                  <h3>{booking.name}</h3>
                  <p>{booking.price}</p>
                </BookingDetails>
              </BookingItem>
            ))}
          </PopularStylesContainer>
        </>
      )}
      {!isMobile && (
        <>
          {bookings.map((booking) => (
            <BookingItem
              key={booking.id}
              onClick={() => handleBookingClick(booking)}
              isSelected={selectedBooking?.id === booking.id}
            >
              <BookingImage src={booking.image} alt={booking.name} />
              <BookingDetails>
                <h3>{booking.name}</h3>
                <p>{booking.price}</p>
              </BookingDetails>
            </BookingItem>
          ))}
        </>
      )}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        {selectedBooking && (
          <>
            <h2>{selectedBooking.name}</h2>
            <p>{selectedBooking.details}</p>
            <p><strong>Colors:</strong> Red, Blue, Green</p>
            <p><strong>Time:</strong> 1 hour</p>
            <button onClick={handleCloseModal}>Book Service</button>
          </>
        )}
      </Modal>

      </>

  );
};

export default Homepage;