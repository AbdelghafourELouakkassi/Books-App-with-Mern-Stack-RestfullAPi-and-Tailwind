/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function SingleBook() {
  const [data, setData] = useState([]);
  const useSlug = useParams();
  const Bookurl = `http://localhost:8000/api/books/${useSlug.slug}`;



  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(Bookurl);
        if (!res.ok) {
          console.log("error fetching this book");
        }
        const jsondata = await res.json();
        setData(jsondata);
      } catch (error) {
        console.log("catch error");
      }
    };
    fetchData();
  }, []);


  function ShowRating({numberStars}){
    let stars=[];
    for(let i=1;i<=numberStars;i++){
      stars.push(<span key={i}>⭐</span>)
    }

    return <div><b>Rating :</b> {stars}</div> 
 
  }

  return (
    <>
      <div className=" flex">
        <div className=" grid-cols-4 m-5">
          <h4 className="mb-4">
            <Link to="/books" className=" underline">
              Return to Books
            </Link>
          </h4>
          <img
            src={`http://localhost:8000/upload/${data?.thumbnail}`}
            alt={data.title}
            width="300px"
          />
        </div>
        <div className=" grid-cols-4 mt-14">
          <h1><b>Book Title : </b>{data?.title}</h1>
          <p><b>Book Description :</b> {data?.description}</p>
          <ShowRating numberStars={data?.stars}/>
          <b>Category : </b>{data?.category?.map((cat,index)=><span key={index}>{cat} </span> )}
        </div>
      </div>
    </>
  );
}

export default SingleBook;
