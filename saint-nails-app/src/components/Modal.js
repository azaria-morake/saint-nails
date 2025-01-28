import React from 'react';
import styled from 'styled-components';
import { FaWhatsapp } from 'react-icons/fa';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  z-index: 1117;

  @media (max-width: 720px) {
    justify-content: center;
    align-items: center;
  }
`;

const ModalContent = styled.div`
  background-color: rgb(240, 227, 238);
  padding: 20px;
  border-radius: 8px;
  width: 300px;
  height: auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transform: ${({ isOpen }) => (isOpen ? 'translateY(0)' : 'translateY(-100%)')};
  transition: transform 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  /* Desktop styles */
  margin-top: 60px;
  margin-right: 20px;

  /* Mobile styles */
  @media (max-width: 720px) {
    margin: 0; /* Reset margin for mobile */
    position: relative; /* Ensure it centers properly */
  }
`;

const BookButton = styled.button`
  background-color: rgb(255, 0, 170);
  color: white;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 20px;
  transition: background-color 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  &:hover {
    background-color: rgb(194, 44, 144);
  }
`;

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  // WhatsApp URL setup
  const whatsappNumber = '+27616963634';
  const message = 'Hello, I would like to book a service.';
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

  const handleBookService = () => {
    window.open(whatsappUrl, '_blank'); // Open WhatsApp in a new tab
    onClose(); // Close the modal
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()} isOpen={isOpen}>
        <div>{children}</div>
        <BookButton onClick={handleBookService}>
          <FaWhatsapp /> {/* WhatsApp icon */}
          Book Service
        </BookButton>
      </ModalContent>
    </ModalOverlay>
  );
};

export default Modal;