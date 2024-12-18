import React, { useEffect, useState } from 'react'
import Product from '../components/Product';
import Spinner from "../components/Spinner";

export default function Home() {

  const API_URL = "https://fakestoreapi.com/products";

  const [loading, setLoading] = useState(false);

  const [posts, setPosts] = useState([]);

  async function fetchProductData () {
    setLoading(true);

    try {
      const result = await fetch(API_URL);
      const data = await result.json();   
      
      setPosts(data);
    } 
    catch (error) {
      alert("Something Wrong");
    }

    setLoading(false);
  }

  useEffect( () => {
    fetchProductData();
  }, []);


  // const [select, setSelect] = useState(false);

  // function clickHandler () {
  //   if(select){
  //     toast.error("Item removed from cart!")
  //     setSelect(!select);
  //   //   // remove();
  //   }
  //   // else{
  //   //   toast.success("Item added to cart!")
  //   //   setSelect(!select);
  //   //   // add();
  //   // }
  // }

  return (
    <div className='w-screen'>
      
      <div className='max-w-6xl flex flex-wrap mx-auto  my-12 justify-between gap-y-10'>
        
        {
          loading ? (<Spinner />) : (
            posts.map( (post) => (
              <Product key={post.id} post={post}/>
            ))
          )
        }
      </div>
      
    </div>
  )
}
