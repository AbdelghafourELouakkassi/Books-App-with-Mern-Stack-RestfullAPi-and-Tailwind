/* eslint-disable react/prop-types */
import Navbar from "./Navbar";
import Footer from "./Footer";
import mern_stack_image from '../assets/images/mern1.png'

function Home() {
  return (
    <>
      <Navbar/>
      <section className="container flex md:flex-row items-center justify-between flex-col-reverse ">
        <div className="text-center leading-7 first-letter:text-4xl mx-20 -mt-7 md:mt-10 flex-1 font-semibold">
        MERN Stack is a Javascript Stack that is used for easier and faster deployment of full-stack web applications. and its comprises of 4 technologies namely: MongoDB, Express, React and Node.js.
        In this Project of this web site, we will create a basic Books app by Mern Stack , This app will allow us to create Book, show Books list, update Book, and delete a Book from the MongoDB database.
        </div>
        <div className=" flex-1">
          <img src={mern_stack_image} className=" -mt-2 md:mt-5 rounded-2xl  mx-auto " width='600px' alt="MERN STACK IMAGE" />
        </div>

      </section>
        <div className="flex flex-col ">
          <button className="text-center self-center outline-1 outline rounded-3xl px-4 py-3 bg-slate-900 text-white  mt-10 hover:bg-white hover:text-black">
            <a href="/books">Visit the Project</a>
          </button>
        </div>
      <Footer/>
    </>
  )
}

export default Home