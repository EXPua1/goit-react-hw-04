import css from "./LoadMoreBtn.module.css";
const LoadMoreBtn = ({ onLoadMore }) => {
  return (
    <div className={css.loadMoreBtn}>
      <button className={css.btn} onClick={onLoadMore} type="button">
        Load more
      </button>
    </div>
  );
};

export default LoadMoreBtn;
