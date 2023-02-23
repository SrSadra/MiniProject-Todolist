import {v4 as uuidv4} from "uuid";
// import swaggerUi from "swagger-ui-express";
// import * as swaggerDocument from "./swagger.json";

// console.log(uuidv4());

type Task = {
  id : string,
  name : string,
  completed : boolean,
  date : Date
}

const form = document.querySelector<HTMLFormElement>("form");
const inp = document.getElementById("textInp") as HTMLInputElement | null;
const list = document.querySelector<HTMLUListElement>("ul");
const tasks: Task[] = getTasks();
tasks.forEach(addListener);

form?.addEventListener("submit" , e => {
  e.preventDefault();
  console.log("al");
  if (inp?.value == "" || inp?.value == null) return;
  const task: Task = {
    id : uuidv4(),
    name : inp?.value,
    completed : false,
    date : new Date(),
  }
  tasks.push(task);
  saveTasks();

  addListener(task);
  
  inp.value = "";
})

function addListener(task : Task){
  const item = document.createElement("li");
  const label = document.createElement("label");
  const checkbox = document.createElement("input");
  document.addEventListener("change" , (e) => {
    task.completed = checkbox.checked;
    saveTasks();
  })
  checkbox.type = 'checkbox';
  checkbox.checked = task.completed;
  label.append(checkbox , task.name);
  item.append(label);
  list?.append(item);
}

function saveTasks(): void {
  localStorage.setItem("tasks" , JSON.stringify(tasks));
}

function getTasks(): Task[] {
  let jsonitem = localStorage.getItem("tasks");
  if (jsonitem == null) return [];
  return JSON.parse(jsonitem);
}




