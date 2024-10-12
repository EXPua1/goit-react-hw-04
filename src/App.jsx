import React, { useState, useEffect } from "react";
import "modern-normalize";
import "./index.css";
import {
  Container,
  SearchBar,
  Section,
  ImageGallery,
  LoadMoreBtn,
  ImageModal,
  Loader,
  ErrorMessage,
} from "./components";
import { fetchImages } from "./services/unsplash-api";

const App = () => {
  const [images, setImages] = useState([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState({
    imageUrl: "",
    altText: "",
    description: "",
  });
  const [areImagesLoaded, setAreImagesLoaded] = useState(false);
  const [noImagesFound, setNoImagesFound] = useState(false);

  // Виклик API коли query і page змінюються
  useEffect(() => {
    if (!query) return;
    const fetchImageData = async () => {
      setLoader(true);
      setError(null);

      try {
        const responseData = await fetchImages(query, page);
        console.log(responseData);

        if (page === 1) {
          setImages(responseData.results); // Якщо новий пошук, скидаємо попередні зображення
        } else {
          setImages((prevImages) => [...prevImages, ...responseData.results]); // Додаємо нові зображення до існуючих
        }
        setNoImagesFound(responseData.results.length === 0);
        setTotalPages(responseData.total_pages); // Встановлюємо загальну кількість сторінок
      } catch (error) {
        setError(true);
      } finally {
        setLoader(false);
      }
    };

    fetchImageData();
  }, [query, page]);

  const searchImage = (newQuery) => {
    setPage(1); // Скидаємо сторінку при новому запиті
    setQuery(newQuery); // Змінюємо запит
    setAreImagesLoaded(false);
    setNoImagesFound(false);
  };

  const loadMoreImages = () => {
    if (page < totalPages) {
      setPage((prevPage) => prevPage + 1); // Завантажуємо наступну сторінку
      setAreImagesLoaded(true);
    }
  };

  const openModal = (imageUrl, altText, description) => {
    setSelectedImage({ imageUrl, altText, description });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage({ imageUrl: "", altText: "" });
  };

  useEffect(() => {
    if (areImagesLoaded) {
      window.scrollTo({
        top: window.scrollY + 750, // Прокрутка сторінки вниз
        behavior: "smooth",
      });
      setAreImagesLoaded(false);
    }
  }, [areImagesLoaded]);

  return (
    <Section>
      <Container>
        <SearchBar onSearch={searchImage} />
        {images.length > 0 && (
          <ImageGallery data={images} onImageClick={openModal} />
        )}
        {loader && <Loader />}
        {error && <ErrorMessage />}
        {images.length > 0 && page < totalPages && (
          <LoadMoreBtn onLoadMore={loadMoreImages} />
        )}
        {isModalOpen && (
          <ImageModal
            isOpen={isModalOpen}
            onClose={closeModal}
            imageUrl={selectedImage.imageUrl}
            altText={selectedImage.altText}
            description={selectedImage.description}
          />
        )}
        {noImagesFound && <div>No images found for your query.</div>}
      </Container>
    </Section>
  );
};

export default App;
