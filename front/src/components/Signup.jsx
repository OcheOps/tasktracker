import React from "react";
import { APIURL } from "../config";
import axios from "axios";
import { toast } from "react-toastify";
export default function Signup({
  showSignup,
  setLoggedIn,
  setUsername,
  setShowSignup,
}) {
  async function handleSignup(event) {
    event.preventDefault();
    // check if password and the re-enter password are same
    const username = event.target.username.value;
    const password = event.target.password.value;
    const repass = event.target.password2.value;
    if (password.length < 8) {
      toast.warning("password length is smaller than 8 charachters!", {
        position: "top-right",
        autoClose: 7000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }
    if (password !== repass) {
      toast.error("The entered passwords are not the same!", {
        position: "top-right",
        autoClose: 7000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      const newUser = {
        username: username,
        password: password,
      };
      try {
        const response = await axios.post(`${APIURL}/register`, newUser, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.status === 200) {
          const data = response.data;
          toast.success("User creation was successfull!", {
            position: "top-right",
            autoClose: 7000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
          setLoggedIn(true);
          setShowSignup(false);
          setUsername(username);
        }
      } catch (error) {
        if (error.response.status == 409) {
          toast.warning(
            "This user already exists. if it's you login or enter a new username!",
            {
              position: "top-right",
              autoClose: 7000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            }
          );
          return;
        }
        toast.error(
          "there was a problem in user creation! make sure eveything is ok.",
          {
            position: "top-right",
            autoClose: 7000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          }
        );
      }
    }
  }
  return (
    <div>
      <h1>Sign up</h1>
      <form onSubmit={handleSignup} method="post">
        <label htmlFor="username">username: </label>
        <input type="text" name="username" id="username" />
        <br />
        <label htmlFor="password">password: </label>
        <input type="password" name="password" id="password" />
        <br />
        <label htmlFor="password2">re-enter password: </label>
        <input type="password" name="password2" id="password2" />
        <br />
        <input type="submit" value="Sign up" />
      </form>
      <p>
        Already have acount?{" "}
        <a
          href="#"
          onClick={() => {
            showSignup(false);
          }}
        >
          Login!
        </a>
      </p>
    </div>
  );
}
