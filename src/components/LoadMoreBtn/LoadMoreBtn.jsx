const LoadMoreBtn = ({ onLoadMore }) => {
  return (
    <div>
      <button onClick={onLoadMore} type="button">
        Load more
      </button>
    </div>
  );
};

export default LoadMoreBtn;
