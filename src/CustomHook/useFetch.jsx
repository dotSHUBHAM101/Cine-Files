import React, { useEffect, useState } from 'react'

function useFetch(url) {

  const [data , setData] = useState('');
  const [loading , setLoading] = useState(false);
  const [error , setError] = useState('');

  useEffect(()=>{

    setLoading(true);


    if (!url || url.endsWith('query=') || url.endsWith('query=null')) {
    return; 
  }
      fetch(url)
      .then((res)=>{
        if(!res.ok){
          throw new Error("FAILED TO FETCH DATA..");
        }
        return res.json()
      })
      .then((result)=>{
        setData(result);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      })
  },[url]);

  return {data , loading , error}
}

export default useFetch
