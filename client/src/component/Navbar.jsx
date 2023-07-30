import {NavLink} from 'react-router-dom'

function Navbar() {
  return (
    <>
      <div className="flex flex-col md:flex-row md:justify-between md:p-4 md:shadow-xl md:ps-10">
        <div className="text-center mt-3 md:mt-0 md:ms-36  text-3xl  ">
          MERN Stack Crud Project
        </div>
        <div>
          <ul className="flex flex-col items-center space-y-3  mt-4 md:mt-0 md:flex-row md:space-x-6 md:pe-56 md:space-y-0  ">
            <NavLink to='/'><li className="bg-teal-400 py-1 px-10 rounded-full md:py-1  md:px-4 ">Home</li></NavLink>
            <NavLink to='/books'><li className="hover:text-teal-400  md:px-2 py-1">Books</li></NavLink>
            <NavLink to='/about'><li className="hover:text-teal-400  md:px-2 py-1">About</li></NavLink>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Navbar;
