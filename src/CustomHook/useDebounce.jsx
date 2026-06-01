import React, { useEffect, useState } from 'react'

function useDebounce(value , delay = 500) {
    const [debounce , setDebounce] = useState(value);

    useEffect(()=>{

          const timer = setTimeout(() => {
            setDebounce(value);
          }, delay);

          return ()=> clearTimeout(timer);

    },[value , delay])


    return debounce;
}

export default useDebounce
