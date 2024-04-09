import { useEffect, useState } from "react";


export const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {[]
    // const abortCont = new AbortController();
    // const signal = abortCont.signal;
    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Could not fetch tasks");
        }
        return res.json();
      })
      .then((data) => setData(data))
      .catch((error) => {
        if (error.name === "AbortError") {
          setError("Fetch Aborted");
        } else {
          setError(error.message);
        }
      })
      .finally(() => setIsLoading(false));

      return () => {
        console.log("clean-up");
        abortCont.abort();
      };
  }, [url]);
  return [data, error, isLoading] ;
};
