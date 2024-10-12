import css from "./Loader.module.css";
import { Circles } from "react-loader-spinner";

const Loader = () => (
  <div className={css.loader}>
    <Circles
      height="80"
      width="80"
      color="#4fa94d"
      ariaLabel="circles-loading"
      visible={true}
    />
  </div>
);

export default Loader;
