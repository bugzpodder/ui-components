// @flow
import React from "react";
import styles from "./example-block.module.scss";

type Props = {
  content: any,
  strongHeader: string,
  helperText?: string,
};

export const ExampleBlock = (props: Props) => {
  const { strongHeader, helperText = "", content } = props;
  return (
    <div className={styles.container}>
      <pre className={styles.text}>
        <strong>{strongHeader}</strong>
        {helperText}= {JSON.stringify(content, null, 2)}
      </pre>
    </div>
  );
};