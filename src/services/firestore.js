import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, doc, getDocs, addDoc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { query, orderBy, limit } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const getList = async () => {
  const docRef = collection(db, 'todos');
  const docs = await getDocs(docRef);
  const todos = [];

  docs.forEach((doc) => {
    todos.push({ id: doc.id, task: doc.data().task, completed: doc.data().completed, createdAt: doc.data().createdAt });
  });

  return todos;
};

export const addItem = async (task, completed) => {
  const docRef = collection(db, 'todos')
  const doc = await addDoc(docRef, { task: task, completed: completed, createdAt: new Date().toISOString() })
  const todo = { id: doc.id, task, completed, createdAt: new Date().toISOString() }
  return todo;
};


export const updateItemTask = async (id, updtedTask) => {
  const docRef = doc(db, 'todos', id);
  return await updateDoc(docRef, { task: updtedTask });
};

export const updateItemComplete = async (id) => {
  const docRef = doc(db, 'todos', id);
  const docSnap = await getDoc(docRef);
  return await updateDoc(docRef, { completed: !docSnap.data().completed });
};

export const deleteItem = async (id) => {
  const docRef = doc(db, 'todos', id);
  return await deleteDoc(docRef);
};
