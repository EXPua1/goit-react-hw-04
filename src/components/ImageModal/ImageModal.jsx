// ImageModal.jsx
import React, { useEffect } from "react";
import Modal from "react-modal";
import css from "./ImageModal.module.css";

// Убедитесь, что вы устанавливаете элемент приложения для модального окна
Modal.setAppElement("#root");

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: "0",
    background: "white",
    border: "none",
  },
};

const ImageModal = ({ isOpen, onClose, imageUrl, altText, description }) => {
  // Закрытие модального окна при нажатии клавиши ESC
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  // Отключаем прокрутку страницы при открытии модального окна
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; // Отключаем прокрутку
    } else {
      document.body.style.overflow = ""; // Включаем прокрутку
    }

    // Восстанавливаем прокрутку при размонтировании компонента
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={customStyles}
      overlayClassName={css.overlay}
    >
      <div>
        <img src={imageUrl} alt={altText} className={css.modalImage} />
        <div>
          <p className={css.description}>Likes: {description}</p>
        </div>
        <button onClick={onClose} className={css.closeButton}>
          Close
        </button>
      </div>
    </Modal>
  );
};

export default ImageModal;
