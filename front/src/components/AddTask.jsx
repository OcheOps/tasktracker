import React from "react";
export default function AddTask({ addtask }) {
  function handleAddTask(event) {
    event.preventDefault();
    const taskname = event.target.taskname.value;
    addtask(taskname);
    event.target.taskname.value = "";
  }
  return (
    <div>
      <form method="POST" onSubmit={handleAddTask}>
        <input type="text" name="taskname" id="taskname" autoComplete="off" />
        <input type="submit" value="add task" />
      </form>
    </div>
  );
}
