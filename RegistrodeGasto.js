import { getTasks, saveTask, onGetTasks, deleteTask, getTask, updateTask} from "./BD.js";

const tasksContainer = document.getElementById('task-container')

let editStatus = false;

let id=''

window.addEventListener('DOMContentLoaded',async() => { //Es para ejecutar algo cuando la pagina cargue(DOM Loaded)

    onGetTasks((querySnapshot) => {
        let html = ''
        querySnapshot.forEach(doc => {
            const task = doc.data()
            html += `
                <div class="card card-body mt-2 border-primary">
                    <h3 class="h5">${task.description}</h3>
                    <p>${task.amount}</p>
                    <p>${task.date}</p>
                    <div class="displayF">
                        <button class='btn-delete btn btn-primary' data-id="${doc.id}">Delete</button>
                        <button class='btn-edit btn btn-secundary' data-id="${doc.id}">Edit</button>
                    </div>
                    
                </div>
            `  
        })   
        tasksContainer.innerHTML = html
         
        const btnsDelete = tasksContainer.querySelectorAll('.btn-delete')
         btnsDelete.forEach(btn => {
            btn.addEventListener('click', ({target: {dataset}}) =>{
                deleteTask(dataset.id)
            })
         })

         const btnsEdit = tasksContainer.querySelectorAll('.btn-edit')
         btnsEdit.forEach(btn => {
            btn.addEventListener('click', async (e) => {
                const doc = await getTask(e.target.dataset.id)
                const task = doc.data()

                expenseForm['description'].value = task.description
                expenseForm['amount'].value = task.amount
                expenseForm['date'].value = task.date

                editStatus = true;
                id = doc.id

                expenseForm['center-btn'].innerHTML = "Update"
            })
         })
    })
  
})


// Obtén una referencia al formulario
const expenseForm = document.getElementById("expense-form");
// Agrega un manejador de eventos submit al formulario
expenseForm.addEventListener("submit", function(e) {
    e.preventDefault();

    // Obtén los valores de los campos del formulario
    const description = document.getElementById("description").value;
    const amount = document.getElementById("amount").value;
    const date = document.getElementById("date").value;
    // Crea un objeto de gasto con los valores del formulario
    const expense = {
        description: description,
        amount: amount,
        date: date
    };
                
    if (description === "" || amount === "" || date ==='') {
        alert("Por favor, rellena todos los campos del formulario");
    } else{
    // utilizando LocalStorage
    console.log(expense);
        if(editStatus){
            updateTask(id,{description,amount,date})
            editStatus = false;
            expenseForm['center-btn'].innerHTML = "Registrar Gasto"
        } else{
            saveTask(description,amount,date)
        }
    
    // Limpia los campos del formulario
    expenseForm.reset();
    }
});