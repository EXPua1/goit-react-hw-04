import ImageCard from "./ImageCard/ImageCard";
import css from "./ImageGallery.module.css";

const GalleryList = ({ data, onImageClick }) => {
  return (
    <ul className={css.gallery}>
      {data.map((item) => (
        <li className={css.item} key={item.id}>
          <ImageCard
            data={item}
            onClick={() =>
              onImageClick(item.urls.regular, item.alt_description)
            }
          />
        </li>
      ))}
    </ul>
  );
};

export default GalleryList;
