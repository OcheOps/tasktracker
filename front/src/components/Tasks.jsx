import React from "react";
import axios from "axios";
import { APIURL } from "../config";
import Task from "./Task";
import AddTask from "./AddTask";
import { toast } from "react-toastify";
export default function Tasks({ username, setLoggedIn, tasks, setTasks }) {
  function addtask(taskname) {
    axios
      .post(`${APIURL}/add`, { name: taskname })
      .then((response) => {
        if (response.status == 200) {
          return response.data;
        }
      })
      .then((data) => {
        const newTask = data;
        const newTasks = [...tasks, newTask];
        setTasks(newTasks);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function removetask(id) {
    console.log(id);
    axios
      .post(`${APIURL}/remove`, { id: id })
      .then((response) => {
        if (response.status == 200) {
          const newTasks = tasks.filter((task) => {
            return task._id != id;
          });
          setTasks(newTasks);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function toggletask(id, name, done) {
    axios
      .post(`${APIURL}/update`, { id: id, name: name, done: !done })
      .then((response) => {
        if (response.status == 200) {
          const newTasks = tasks.map((task) => {
            if (task._id == id) {
              task.done = !done;
            }
            return task;
          });
          console.log(newTasks);
          setTasks(newTasks);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function handleLogout() {
    axios
      .get(`${APIURL}/logout`)
      .then((response) => {
        setLoggedIn(false);
        toast.warning("logged out.", {
          position: "top-right",
          autoClose: 7000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <div>
      <h1>Welcome {username}!</h1>
      <AddTask addtask={addtask} />
      <h2>Your tasks:</h2>
      <ul>
        {tasks.map((task, index, arr) => {
          return (
            <Task
              {...task}
              addtask={addtask}
              key={task._id}
              toggletask={toggletask}
              removetask={removetask}
              id={task._id}
            />
          );
        })}
      </ul>

      <a href="#" onClick={handleLogout}>
        Logout
      </a>
    </div>
  );
}
