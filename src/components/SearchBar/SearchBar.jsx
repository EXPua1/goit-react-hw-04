import css from "./SearchBar.module.css";
import toast, { Toaster } from "react-hot-toast";

const SearchForm = ({ onSearch }) => {
  const handleSubmit = (event) => {
    event.preventDefault(); // Предотвращаем автоматическую отправку формы
    const notify = () => toast("Введите запрос для поиска", { duration: 2000 });

    if (!event.target.elements.topic.value.trim()) {
      // Проверяем на пустое значение
      notify(); // Вызываем уведомление
      return;
    }

    const form = event.target;
    const searchQuery = form.topic.value.trim(); // Извлекаем значение из поля ввода
    onSearch(searchQuery); // Вызываем функцию поиска с введенным запросом
    form.reset(); // Сбрасываем форму после отправки
  };

  return (
    <header className={css.header}>
      <form className={css.form} onSubmit={handleSubmit}>
        <input
          className={css.input}
          type="text"
          name="topic"
          placeholder="Поиск картинок..."
        />
        <button className={css.btn} type="submit">
          Поиск
        </button>
      </form>
      <Toaster /> {/* Не забудьте добавить Toaster для показа уведомлений */}
    </header>
  );
};

export default SearchForm;
