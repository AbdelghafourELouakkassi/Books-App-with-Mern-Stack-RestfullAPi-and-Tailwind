import { useState,useEffect } from "react";
import { useNavigate,useParams } from "react-router-dom";
import Navbar from "./Navbar";


function UpdateBook() {
  const useslug=useParams()
  const serverUrl=import.meta.env.VITE_SERVER_URL
  const onebookurl=`${serverUrl}/api/books/${useslug.slug}`

  const [title, settitle] = useState("");
  const [slug, setslug] = useState("");
  const [description, setdescription] = useState("");
  const [thumbnail, setthumbnail] = useState(null);
  const [stars, setstars] = useState(0);
  const [category, setcategory] = useState([]);
  const [image,setimage]=useState("")
  const navigate = useNavigate();

  const fetchbook=async ()=>{
    try {
      const res= await fetch(onebookurl);
      if(!res.ok){
        console.log('data not fetched')
      }
      const data=await res.json()
      settitle(data.title)
      setslug(data.slug)
      setdescription(data.description)
      setstars(data.stars)
      setcategory(data.category)
      setthumbnail(data.thumbnail)

    } catch (error) {
      console.log(error)
      
    }
  
   }

   useEffect(()=>{
    fetchbook()
   // eslint-disable-next-line react-hooks/exhaustive-deps
   },[])

  async function editBook(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title",title);
    formData.append("slug",slug);
    formData.append("description",description);
    formData.append("stars",stars);
    formData.append("category",category);

    if(thumbnail){
      formData.append("thumbnail",thumbnail);
    }

    try {
      const res = await fetch(`${serverUrl}/api/books/update/${useslug.slug}`, {
        method: "PUT",
        body: formData,
      });

      if (res.ok) {
        alert("the book is updated");
        navigate("/books");
      } else {
        alert("the book is not updated");
      }
    } catch (error) {
      console.log(error);
    }
  }

  const onImageChange=(e)=>{
    if(e.target.files && e.target.files[0]){
    setimage(URL.createObjectURL(e.target.files[0]))
    setthumbnail(e.target.files[0])
    }
  }

 

  return (
    <>
      <Navbar />
      <div className=" flex flex-col items-center">
        <div>
              <form
                className="bg-white shadow-xl rounded  pt-6 pb-8 mb-4 px-44 mt-8"
                onSubmit={editBook}
              > 
              <div className="text-3xl text-center mt-4">Update Book</div>
              <div className="my-4 text-center  space-y-2">
                <label>title: </label>
                <input
                  type="text"
                  className=" border border-black w-full p-1 rounded-xl text-center "
                  onChange={(e) => {
                    settitle(e.target.value);
                  }}
                  value={title}
                />
              </div>
              <div className=" text-center my-4  space-y-2">
                <label>slug: </label>
                <input
                  type="text"
                  className=" border border-black p-1 w-full rounded-xl text-center"
                  onChange={(e) => {
                    setslug(e.target.value);
                  }}
                  value={slug}
                />
              </div>
              <div className="text-center my-4  space-y-2">
                <label>description: </label>
                <textarea
                  type="text"
                  rows="3"
                  className=" border border-black p-1 w-full rounded-xl text-center "
                  onChange={(e) => {
                    setdescription(e.target.value);
                  }}
                  value={description}
                />
              </div>
              <div className="my-4 text-center flex flex-col items-center space-y-4">
                <label>thumbnail: </label>
                  {!image ?
                  <img src={`${serverUrl}/upload/${thumbnail}`} alt="no image selected"  width='200px' />
                  :<img src={`${image}`} alt="no image selected"  width='200px' />

                }
                  <input
                  type="file"
                  className=" border border-black p-1 w-full rounded-xl text-center"
                  onChange={onImageChange}
                  accept="image/gif, image/jfif, image/png, image/jpeg"
                
                />
            </div>
            <div className="text-center space-y-2">
                <label>stars : </label>
                <input
                  type="number"
                  className=" border border-black p-1 w-full rounded-xl text-center "
                  onChange={(e) => {
                    setstars(e.target.value);
                  }}
                  value={stars}
                />
            </div>
            <div className="text-center space-y-2 mb-4">
                <label>category : </label>
                <input
                  type="text"
                  className=" border border-black p-1 w-full rounded-xl text-center "
                  onChange={(e) => {
                    setcategory(
                      e.target.value.split(",").map((category) => category.trim())
                    );
                  }}
                  value={category}
                />
            </div>
            <div className="flex justify-center">
                <button className=" bg-sky-600 rounded-full text-white px-5 py-1 ">
                  Update
                </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default UpdateBook;
