import React from "react";
import { v4 as uuidv4 } from 'uuid';
import { useMount, useLocalStorage } from 'react-use';
import "./taro.scss";
import "./app.less";


export default function App({ children }) {
  const [uid, setUid] = useLocalStorage('uuid');
  useMount(() => {
    if (!uid) {
      setUid(uuidv4());
    }
  });

  return children;
}
