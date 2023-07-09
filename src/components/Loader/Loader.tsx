import React from "react";
import styles from "./Loader.module.scss";
import Lottie from "lottie-react";

import loader from "../../assets/loader.json";

const Loader = () => {
  return (
    <div className={styles.loaderWrapper}>
      <Lottie
        style={{ width: 200, height: 200 }}
        animationData={loader}
        loop={true}
      />
    </div>
  );
};

export default Loader;
