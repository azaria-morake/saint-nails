// src/components/Homepage.js
import React, { useState } from 'react';
import styled from 'styled-components';
import Modal from './Modal';

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

`;

const BookingItem = styled.div`
  color: white;
  display: flex;
  align-items: center;
  background-color:rgba(44, 39, 39, 0.1);
  margin-bottom: 15px;
  border-radius: 10px;
  cursor: pointer;
  background-image: url('clem-onojeghuo-HxHdSIesKg4-unsplash.jpg');
  background-size: cover;
  background-position: 200px -140px;
  transition: transform 0.3s ease-in-out;
  transform: ${({ isSelected }) => (isSelected ? 'translateY(0)' : 'translateY(0)')};
`;

const BookingImage = styled.img`
  width: 75px;
  height: 75px;
  border-radius: none;
  object-fit: cover;
  margin-right: 10px;
  padding-left: 20px;
  
`;

const BookingDetails = styled.div`
  flex: 1;
  /* border-bottom: 1px solid #ccc; */
  padding-bottom: 10px;
`;

const Homepage = () => {
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const bookings = [
    { id: 1, name: 'Classic Manicure', price: 'R25', image: '/price-list/img-0.jpg', 
      details: 'Pamper your hands with a classic manicure, including nail shaping, cuticle care, and a soothing hand massage. Finish with your choice of polish for a clean, polished look.' },
    { id: 2, name: 'Gel Manicure', price: 'R35', image: '/price-list/img-1.jpeg', 
      details: 'DExperience long-lasting beauty with a gel manicure. Enjoy glossy, chip-resistant nails that stay flawless for up to two weeks, featuring a UV-cured gel finish in a variety of colors..' },
    { id: 3, name: 'Acrylic Nails', price: 'R45', image: '/price-list/img-2.jpg', 
      details: 'Elevate your look with durable, custom-shaped acrylic nails. Perfect for length and strength, these nails are a statement of elegance and style, tailored to your preferences.' },
    { id: 4, name: 'Nail Art', price: 'R50', image: '/price-list/img-3.jpg', 
      details: 'Express your creativity with custom nail art. From intricate designs to bold accents, our skilled technicians will create a unique look that suits your personality and style.' },
    { id: 5, name: 'Pedicure', price: 'R40', image: '/price-list/img-4.png', details: 'Details about Pedicure...' },
    { id: 6, name: 'Classic Manicure', price: 'R25', image: '/price-list/img-0.jpg', details: 'Details about Classic Manicure...' },
    { id: 7, name: 'Gel Manicure', price: 'R35', image: '/price-list/img-1.jpeg', details: 'Details about Gel Manicure...' },
    { id: 8, name: 'Acrylic Nails', price: 'R45', image: '/price-list/img-2.jpg', details: 'Details about Acrylic Nails...' },
    { id: 9, name: 'Nail Art', price: 'R50', image: '/price-list/img-3.jpg', details: 'Details about Nail Art...' },
    { id: 10, name: 'Pedicure', price: 'R40', image: '/price-list/img-4.png', details: 'Details about Pedicure...' },
    
  ];

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

    <Description> { info_text.info } </Description>
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
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        {selectedBooking && (
          <>
            <h2>{selectedBooking.name}</h2>
            <p>{selectedBooking.details}</p>
            <p><strong>Colors:</strong> Red, Blue, Green</p>
            <p><strong>Time:</strong> 1 hour</p>
          </>
        )}
      </Modal>
    </>
  );
};

export default Homepage;