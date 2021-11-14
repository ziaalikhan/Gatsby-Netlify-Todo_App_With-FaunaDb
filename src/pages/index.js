import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import gql from "graphql-tag";
import * as styles from "../style/main.module.css";
import Items from "../components/Items";
import Input from "../components/Input";
import Loading from "../components/Loading";
import Error from "../components/Error";
import { AddData } from "../graphql/mutation";
import { TODOLISTDATA } from "../graphql/query";

export default function Homeindex() {
  const [item, setItem] = useState("");

  const { loading, error, data } = useQuery(TODOLISTDATA);

  const [addTodoData] = useMutation(AddData);

  const InputHandler = () => {
    if (item) {
      addTodoData({
        variables: {
          item: item,
        },
        refetchQueries: [{ query: TODOLISTDATA }],
      });
    } else {
      alert("Your Input Is Empty Fill It First!");
    }
    setItem("");
  };
  if (loading) {
    return <Loading />;
  };
  if (error) {
    return <Error />;
  }

  return (

    <div>
      <div className={styles.Main_Container}>
        <div className={styles.Heading}>
          <h3>TodoApp</h3>
        </div>
        <div className={styles.input}>
          <Input item={item} setItem={setItem} />
        </div>
        <div className={styles.addBtn}>
          <button onClick={InputHandler}>Add Item</button>
        </div>
      </div>

      <div className={styles.TodoData}>
        {data.AllTodoData.map((val, id) => {
       return (
         <div className={styles.Map_Data}>
            <Items id={val.id} item={val.item} key={id} />
         </div>
       );
     })} 
      </div>
    </div>
  );
}
