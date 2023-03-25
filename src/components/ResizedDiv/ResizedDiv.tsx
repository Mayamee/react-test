import { FC } from "react";
import styles from "./ResizedDiv.module.scss";
interface ResizedDivProps {}
const ResizedDiv: FC<ResizedDivProps> = ({}) => {
  return (
    <div className="container">
      <span className={styles["resized-control"]} />
      <span className={styles["resized-control"]} />
      <span className={styles["resized-control"]} />
      <span className={styles["resized-control"]} />
    </div>
  );
};
export { ResizedDiv };
