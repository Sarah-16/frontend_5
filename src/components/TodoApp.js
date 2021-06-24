import React, { useState } from "react";
import "./todoapp.css";

function TodoApp() {
  // we need a usestate to store the input value
  // task=usestate name
  // Initialize to an empty string
  const [task, setTask] = useState("");
  // Create another state to manage the whole list of tasks
  const [tasklist, setTaskList] = useState([]);
  // handleChange method
  // pass the value of input field
  const handleChange = (e) => {
    setTask(e.target.value);
  };
  // Logging the task state for the onClick method
  //   Add task in task list using the AddTask method
  const AddTask = () => {
    if (task !== "") {
      // Object of task
      const taskDetails = {
        //   Any random number in between 0 to 1000
        //   Math.random method
        //Math.floor since we need an integer value
        id: Math.floor(Math.random() * 1000),
        //Value which is stored in the task state
        value: task,
        //boolean value, false at the beginning
        isCompleted: false,
      };
      //set  taskDetails in taskList state
      //first store previous state value then append over taskDetails object
      setTaskList([...tasklist, taskDetails]);
    }
  };

  const deletetask = (e, id) => {
    e.preventDefault();
    setTaskList(tasklist.filter((t) => t.id !== id));
  };

  const taskCompleted = (e, id) => {
    e.preventDefault();
    //let's find index of element
    const element = tasklist.findIndex((elem) => elem.id === id);

    //copy array into new variable
    const newTaskList = [...tasklist];

    //edit our element
    newTaskList[element] = {
      ...newTaskList[element],
      isCompleted: true,
    };

    setTaskList(newTaskList);
  };

  return (
    <div className="todo">
      <input
        type="text"
        name="text"
        id="text"
        onChange={(e) => handleChange(e)}
        placeholder="Add task here..."
      />
      {/* Now call the handleChange in the input field on onChange event*/}
      {/* Pass e as the event so that we can get an input value from e.target.value*/}
      {/* onClick method  */}
      {/* onClick method which takes the name of the AddTask method above  */}
      <button className="add-btn" onClick={AddTask}>
        Add
      </button>
      <br />
      {/* condition rendering which means when the taskList is not empty, display
      list else nothing */}
      {tasklist !== [] ? (
        <ul>
          {/* map each task value from task list, for task t show its value in the li element */}
          {tasklist.map((t) => (
            // for task t show its value in the li element, t.value
            <li className={t.isCompleted ? "crossText" : "listitem"}>
              {t.value}
              <button
                className="completed"
                onClick={(e) => taskCompleted(e, t.id)}
              >
                Completed
              </button>

              <button className="delete" onClick={(e) => deletetask(e, t.id)}>
                Delete
              </button>
            </li>
          ))}
          <li>JavaScript</li>
        </ul>
      ) : null}
    </div>
  );
}

export default TodoApp;
