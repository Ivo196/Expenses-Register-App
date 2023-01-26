
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js'
import {
  getFirestore,
  collection, 
  addDoc, 
  getDocs, 
  onSnapshot, 
  deleteDoc, 
  doc, 
  getDoc, 
  updateDoc} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js"

//Collection crea una tabla 
//getFiresotore  es la coneccion de la base de datos 
//addDoc viene de firestore y es una fancion para agregar  
//getDocs es para traer todos los datos de la base de datos
//onSnapshot es para cuando los datos cambian
//doc es por que vamos a eliminar un solo documento y no una colleccion
//getDoc es para traer un dato de la base de datos 
//updateDoc para actualizar un documento 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBRtTmqtKOYoDu2hb5neanNxZtna4DBdAQ",
  authDomain: "registrodegasto-416fb.firebaseapp.com",
  projectId: "registrodegasto-416fb",
  storageBucket: "registrodegasto-416fb.appspot.com",
  messagingSenderId: "420871966319",
  appId: "1:420871966319:web:0959a1d8737ec09de4c79a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(); //conexion a la base de datos
 
  export const saveTask = (description, amount,date) => { //Funcion para guardar las tareas 
    addDoc(collection(db,'tasks'),{description,amount,date}) //Llamo a una colleccion pero necesita la base de datos(db), luego le paso el nombre(task) y luego le paso el dato que le quiero pasar(objeto), primero lo que hago es aclarar si quiero ghuardar,editar o eliminar
  }

  export const getTasks = () => getDocs(collection(db,'tasks')) //Funcion para mostrar las tareas 

  export const onGetTasks = (callback) => onSnapshot(collection(db,"tasks"),callback) //Cuando se ejecute, haces una consulta a la base de datos de tareas 

  export const deleteTask = id => deleteDoc(doc(db,'tasks',id))  //Funcion para eliminar tareas (doc(bd,'tasks')) aqui busca y (id) esto elimina 

  export const getTask = id => getDoc(doc(db,'tasks',id)) //Funcion para pedir las tareas de determinado id 

  export const updateTask = (id, newFields) => updateDoc(doc(db,'tasks',id), newFields)
