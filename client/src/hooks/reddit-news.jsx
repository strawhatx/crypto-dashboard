import { useState, useEffect } from "react";
import axios from "../config/axios";
import _axios from "axios";

export const useTwitterHook = (id) => {
  const [error, setError] = useState(false);
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    let cancel;

    axios({
      method: "GET",
      url: `reddit-news/${id}`,
      cancelToken: new _axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
        setPosts(res.data);
      })
      .catch((e) => {
        if (_axios.isCancel(e)) return;
        setError(true);
      });

    return () => cancel();
  };

  useEffect(() => {
    fetchPosts();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return { error, posts };
};
