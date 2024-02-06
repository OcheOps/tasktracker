import { useEffect, useState } from "react";
import axios from "axios";
import Login from "./components/Login";
import Tasks from "./components/Tasks";
import Signup from "./components/Signup";
import { APIURL } from "./config";
axios.defaults.withCredentials = true;
function App() {
  const [LoggedIn, setLoggedIn] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [username, setUsername] = useState(localStorage.getItem("username"));
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    localStorage.setItem("username", username);
  }, [username]);

  useEffect(() => {
    axios
      .get(`${APIURL}/`)
      .then((response) => {
        if (response.status === 401) {
          setLoggedIn(false);
          return;
        } else {
          return response.data;
        }
      })
      .then((data) => {
        setLoggedIn(true);
        setTasks(data);
        console.log(data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [LoggedIn]);

  if (showSignup) {
    return (
      <Signup
        showSignup={setShowSignup}
        setLoggedIn={setLoggedIn}
        setUsername={setUsername}
        setShowSignup={setShowSignup}
      />
    );
  } else {
    if (LoggedIn) {
      return (
        <Tasks
          username={username}
          tasks={tasks}
          setLoggedIn={setLoggedIn}
          setTasks={setTasks}
        />
      );
    } else {
      return (
        <Login
          showSignup={setShowSignup}
          setLoggedIn={setLoggedIn}
          setUsername={setUsername}
        />
      );
    }
  }
}

export default App;
