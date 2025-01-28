// src/components/Bookings.js
import React, { useState } from 'react';
import styled from 'styled-components';
import Modal from './Modal';

const BookingsContainer = styled.div`
  padding: 20px;
  background-color: rgb(240, 238, 227);
  height: 100vh;
  overflow-y: auto;
  display: none;
`;

const BookingItem = styled.div`
  color: white;
  display: flex;
  align-items: center;
  background-color: rgba(44, 39, 39, 0.1);
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
  padding-bottom: 10px;
`;

const Bookings = ({ bookings, handleBookingClick, selectedBooking, isModalOpen, handleCloseModal }) => {
  return (
    <BookingsContainer>
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
    </BookingsContainer>
  );
};

export default Bookings;