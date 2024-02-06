import React from "react";
import axios from "axios";
import { APIURL } from "../config";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Login({ showSignup, setUsername, setLoggedIn }) {
  async function handleLogin(event) {
    event.preventDefault();
    // check if password and the re-enter password are same
    const username = event.target.username.value;
    const password = event.target.password.value;
    try {
      const response = await axios.post(
        `${APIURL}/login`,
        { username: username, password: password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        toast.success("Loged in successfully!", {
          position: "top-right",
          autoClose: 7000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        const data = response.data;
        setLoggedIn(true);
        setUsername(username);
      }
    } catch (error) {
      toast.error("There Was Error! make sure enteries are ok.", {
        position: "top-right",
        autoClose: 7000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  }
  return (
    <div>
      <h1>Login</h1>
      <form method="post" onSubmit={handleLogin}>
        <label htmlFor="username">username: </label>
        <input type="text" name="username" id="username" />
        <br />
        <label htmlFor="password">password: </label>
        <input type="password" name="password" id="password" />
        <br />
        <input type="submit" value="Login" />
      </form>
      <p>
        don't have account?{" "}
        <a
          href="#"
          onClick={() => {
            showSignup(true);
          }}
        >
          Sign up!
        </a>
      </p>
    </div>
  );
}
