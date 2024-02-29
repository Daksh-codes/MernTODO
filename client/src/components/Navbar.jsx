import React from "react";
import { Link } from "react-router-dom";
import useUserStore from "../store";

function Navbar() {

  const { user , removeUser } = useUserStore();
  const logoutUser = () => removeUser()


  return (
    <nav className="flex bg-blue-400 items-center justify-between px-20 py-4 ">
      <h1 className="text-xl font-bold">TO DO APP</h1>
      <div className=" flex gap-8">
        {user ? (
          <button onClick={logoutUser} className="text-xl font-semibold px-2 py-1 hover:bg-red-200">logout</button>
        ) : (
          <>
            <Link to={"/login"}>LOGIN</Link>
            <Link to={"/register"}>REGISTER</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
