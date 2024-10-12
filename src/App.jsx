import React, { useState, useEffect } from "react";
import "modern-normalize";
import "./index.css";
import {
  Container,
  SearchForm,
  Section,
  ImageGallery,
  LoadMoreBtn,
  ImageModal,
} from "./components";
import { fetchImages } from "./services/unsplash-api";
import { Circles } from "react-loader-spinner"; // Импортируем компонент лоадера

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
  });
  const [areImagesLoaded, setAreImagesLoaded] = useState(false);
  const [noImagesFound, setNoImagesFound] = useState(false);

  const searchImage = async (query) => {
    setLoader(true);
    setError(null);
    setPage(1);
    setQuery(query);
    setAreImagesLoaded(false); // Сбрасываем состояние загрузки изображений
    setNoImagesFound(false); // Сбрасываем состояние "изображения не найдены"

    try {
      const responseData = await fetchImages(query, page);
      setImages(responseData.results); // Устанавливаем массив изображений
      setNoImagesFound(responseData.results.length === 0);
      setTotalPages(responseData.total_pages); // Устанавливаем общее количество страниц

      console.log("Response Data:", responseData);
      console.log("Total Pages:", responseData.total_pages);
    } catch (error) {
      setError(true);
    } finally {
      setLoader(false);
    }
  };

  const loadMoreImages = async () => {
    if (page >= totalPages) return; // Проверяем, есть ли еще страницы
    setLoader(true);
    try {
      const responseData = await fetchImages(query, page + 1); // Загружаем следующую страницу
      setImages((prevImages) => [...prevImages, ...responseData.results]); // Добавляем новые изображения к предыдущим
      setPage((prevPage) => prevPage + 1); // Увеличиваем номер страницы
      setAreImagesLoaded(true); // Устанавливаем, что изображения загружены
    } catch (error) {
      setError(true);
    } finally {
      setLoader(false);
    }
  };

  const openModal = (imageUrl, altText) => {
    setSelectedImage({ imageUrl, altText });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage({ imageUrl: "", altText: "" });
  };

  useEffect(() => {
    if (areImagesLoaded) {
      window.scrollTo({
        top: window.scrollY + 750, // Укажите желаемое количество пикселей для прокрутки
        behavior: "smooth", // Плавная прокрутка
      });
      setAreImagesLoaded(false); // Сбрасываем состояние после прокрутки
    }
  }, [areImagesLoaded]);

  return (
    <Section>
      <Container>
        <SearchForm onSearch={searchImage} />
        {images.length > 0 && (
          <ImageGallery data={images} onImageClick={openModal} />
        )}
        {loader && ( // Условный рендеринг лоадера
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            <Circles
              height="80"
              width="80"
              color="#4fa94d"
              ariaLabel="circles-loading"
              visible={true}
            />
          </div>
        )}
        {error && <div>Error occurred while fetching images.</div>}
        {images.length > 0 &&
          page < totalPages && ( // Проверяем, есть ли еще страницы для загрузки
            <LoadMoreBtn onLoadMore={loadMoreImages} />
          )}
        {isModalOpen && (
          <ImageModal
            isOpen={isModalOpen}
            onClose={closeModal}
            imageUrl={selectedImage.imageUrl}
            altText={selectedImage.altText}
          />
        )}
        {noImagesFound && <div>No images found for your query.</div>}
      </Container>
    </Section>
  );
};

export default App;
