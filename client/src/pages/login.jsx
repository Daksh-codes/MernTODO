import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./register.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useUserStore from "../store.js";



function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useUserStore();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/user/login", {
        email,
        password,
      });

      if (response.status === 200) {
        // Login successful
        const { user, token } = response.data;
        console.log("token : ",token)
        setUser({ ...user, token });
        localStorage.setItem("user", JSON.stringify({ ...user, token })); 
        console.log("User after login:", localStorage.getItem("user"));
        navigate("/");
      }
    } catch (error) {
      if (error.response) {
        const { data, status: code } = error.response;

        if (code === 401) {
          toast.error(data.error);
        } else if (code === 404) {
          toast.error(data.message);
        }
      }
    }
  };

  return (
    <div className="container">
      <div className="registerContainer ">
        <h4 className="registerHeading">Login</h4>
        <ToastContainer
          position="top-center"
          autoClose={3000}
          newestOnTop={false}
          closeOnClick
        />
        <p className="navigation">
          <Link to="/" className="navigationLink">
            Home
          </Link>{" "}
          &gt; Account
        </p>
        <form onSubmit={handleSubmit}>
          <div className="inputContainer">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoFocus
            />
          </div>
          <div className="inputContainer">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              maxLength={8}
              minLength={8}
            />
          </div>
          <button type="submit" className="registerBtn">
            Sign in
          </button>
        </form>
        <p className="login">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;

