import css from "./SearchForm.module.css";

const SearchForm = ({ onSearch }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const searchQuery = form.topic.value; // Извлекаем значение из поля ввода
    onSearch(searchQuery); // Вызываем функцию поиска с введенным запросом
    form.reset(); // Сбрасываем форму после отправки
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <input
        className={css.input}
        type="text"
        name="topic"
        placeholder="Пошук картинок..."
      />
      <button className={css.btn} type="submit">
        Пошук
      </button>
    </form>
  );
};

export default SearchForm;
