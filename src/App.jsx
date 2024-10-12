import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import "modern-normalize";
import "./index.css";
import { Container, SearchForm, Section, ImageGallery } from "./components";
import { fetchImages } from "./services/unsplash-api";

const App = () => {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState(null);
  const [images, setImages] = useState(null);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(null);

  const searchImage = async (query) => {
    setLoader(true);
    setPage(1);
    setQuery(query);
    setError(null);

    try {
      const responseData = await fetchImages(query, 1);
      setImages(responseData); // Сохраняем полученные данные
      console.log(images);
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
        {images && <ImageGallery data={images} />}
      </Container>
    </Section>
  );
};

export default App;
