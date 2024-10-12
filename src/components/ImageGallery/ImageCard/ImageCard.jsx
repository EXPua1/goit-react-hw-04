import css from "./ImageCard.module.css";

const ImageCard = ({ data, onClick }) => {
  return (
    <div className={css.card} onClick={onClick}>
      <div>
        <img src={data.urls.small} alt={data.alt_description} />
      </div>

      <div>
        <p className={css.description}>
          {data.description
            ? data.description.length > 25
              ? `${data.description.slice(0, 25)}...`
              : data.description
            : "Without description"}
        </p>
      </div>
    </div>
  );
};

export default ImageCard;
