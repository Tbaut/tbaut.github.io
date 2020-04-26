import React from "react";

import styles from "./index.module.scss";

export default function GridPage() {
  return (
    <h1 className={styles.h1}>
      Hello lockdown world!{" "}
      <span role="img" aria-label="lockdown">
        😷
      </span>
    </h1>
  );
}
