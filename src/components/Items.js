import React from "react";
import * as styles from "../style/main.module.css";
import { useMutation } from "@apollo/client";
import { DELETE_TODO } from "../graphql/mutation";
import { TODOLISTDATA } from "../graphql/query";


export default function Items({ id, item }) {
  const [deleteTodo] = useMutation(DELETE_TODO);
  const deleteBtn = (id) => {
    deleteTodo({
      variables: {
        id: id,
      },
      refetchQueries: [{ query: TODOLISTDATA }],
    });
  };
  return (
    <div className={styles.Container}>
      <h4>{item}</h4>
      <div className={styles.deleteBtn}>
        <h3 onClick={() => deleteBtn(id)}>X</h3>
      </div>
    </div>
  );
}
