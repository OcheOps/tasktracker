import React from "react";
export default function Task({ id, name, date, done, removetask, toggletask }) {
  function handleRemoveTask(taskid) {
    removetask(taskid);
  }
  function handleToggleTask(taskid, name, done) {
    toggletask(taskid, name, done);
  }
  const formattedDate = new Date(date).toLocaleString();
  return (
    <li>
      <span
        className={done ? "stroke" : ""}
        onClick={() => handleToggleTask(id, name, done)}
      >
        {name} , {formattedDate + " "}
      </span>
      <a href="#" onClick={() => handleRemoveTask(id)}>
        [remove]
      </a>
    </li>
  );
}
