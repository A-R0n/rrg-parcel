import { useEffect, useState } from "react";
import { get, CancelToken, isCancel } from "axios";

const useFetch = (url) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const source = CancelToken.source();
    const fetchRouteData = async () => {
      try {
        await get(url, { cancelToken: source.token }).then((res) => {
          setData(res.data);
        });
      } catch (error) {
        if (isCancel(error)) {
        } else {
          throw error;
        }
      }
    };
    fetchRouteData();

    return () => {
      source.cancel();
    };
  }, []);

  return { data };
};

export default useFetch;
