import React, { useState } from "react";
import "modern-normalize";
import "./index.css";
import {
  Container,
  SearchForm,
  Section,
  ImageGallery,
  LoadMoreBtn,
} from "./components";
import { fetchImages } from "./services/unsplash-api";
import { Circles } from "react-loader-spinner"; // Импортируем компонент лоадера

const App = () => {
  const [images, setImages] = useState([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState(null);
  const [page, setPage] = useState(1);

  const searchImage = async (query) => {
    setLoader(true);
    setError(null);
    setPage(1);
    setQuery(query);

    try {
      const responseData = await fetchImages(query, page);
      setImages(responseData); // Сохраняем полученные данные
    } catch (error) {
      setError(true);
    } finally {
      setLoader(false);
    }
  };
  const loadMoreImages = async () => {
    setLoader(true);
    try {
      const responseData = await fetchImages(query, page + 1); // Загружаем следующую страницу
      setImages((prevImages) => [...prevImages, ...responseData]); // Добавляем новые изображения к предыдущим
      setPage((prevPage) => prevPage + 1); // Увеличиваем номер страницы
    } catch (error) {
      setError(true);
    } finally {
      setLoader(false);
    }
  };

  return (
    <Section>
      <Container>
        <SearchForm onSearch={searchImage} />
        {images.length > 0 && <ImageGallery data={images} />}
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
        {images.length > 0 && <LoadMoreBtn onLoadMore={loadMoreImages} />}
      </Container>
    </Section>
  );
};

export default App;
