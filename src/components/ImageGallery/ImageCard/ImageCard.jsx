import css from "./ImageGallery.module.css";

const ImageCard = ({ data }) => {
  return (
    <div className={css.card}>
      {" "}
      {/* Используйте подходящий контейнер */}
      <img src={data.urls.small} alt={data.alt_description} />
      <p>{data.description || "Без описания"}</p>
    </div>
  );
};

export default ImageCard;
