import { useEffect, useState } from "react";
import { BrowserRouter ,Routes,Route,} from 'react-router-dom'
import Home from "./component/Home";
import About from "./component/About";
import BooksList from "./component/BooksList";
import SingleBook from "./component/SingleBook";
import AddBook from "./component/AddBook";
import UpdateBook from "./component/updateBook";




function App() {
  const [books, setBooks] = useState([]);
  const [categorySelected, setCategorySelected] = useState('');
  const [loading,setloading]=useState(true)
  const BooksUrl="http://localhost:8000/api/books"

 
  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = BooksUrl;
        if (categorySelected) {
          url += `?category=${categorySelected}`;
        }
        const reponse = await fetch(url);
        if (!reponse.ok) {
          console.log('failed to fetch data')
        }
        const jsondata = await reponse.json();
        setBooks(jsondata);
        setloading(false)
      } catch (error) {
        console.log(error);
      }
    };
    setTimeout(()=>{
      fetchData();

    },500)
  }, [categorySelected,books]);

  return (
    <> 
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/books" element={<BooksList  books={books} setCategorySelected={setCategorySelected} loading={loading}  /> }/>
        <Route path="/books/:slug" element={< SingleBook />}/>
        <Route path="/about" element={<About/> }/>
        <Route path="/books/AddBook" element={<AddBook />}/>
        <Route path="/books/updateBook/:slug" element={<UpdateBook />}/>
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
