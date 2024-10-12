import ImageCard from "./ImageCard/ImageCard";
import css from "./ImageGallery.module.css";

const GalleryList = ({ data }) => {
  return (
    <ul className={css.gallery}>
      {data.map((item) => (
        <li key={item.id}>
          <ImageCard data={item} /> {/* Передаем данные в ImageCard */}
        </li>
      ))}
    </ul>
  );
};

export default GalleryList;
