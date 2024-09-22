// Import the functions you need from the SDKs you need
import {
  collection,
  getDocs,
  doc,
  setDoc,
  addDoc,
  deleteDoc,
  updateDoc,
  query,
  where
} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { db, auth } from "./config";

// Helper function to get documents from 'expenses' collection

const userPath = () => "users/" + auth.currentUser.uid + "/";

const getExpensesRef = () => {
  return collection(db, userPath() + "expenses")
};

const getExpenseRef = (id) => {
  return doc(db, userPath() + "expenses", id)
};

const getTagsRef = () => {
  return collection(db, userPath() + "tags")
};

const getTagRef = (id) => {
  return doc(db, userPath() + "tags", id)
}

const getExpenses = async (start_date=null, end_date=null) => {
  if (!start_date) {
    const today = new Date()
    start_date = new Date(today.getFullYear(), today.getMonth(), 1)
    end_date = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  }
  try {
    console.log("Getting expenses for user between", start_date, end_date)
    const q = query(
        getExpensesRef(), 
        where("date", ">=", start_date), 
        where("date", "<=", end_date)
      )
    const querySnapshot = await getDocs(
      q
    );
    const expenses = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return expenses == null ? [] : expenses;
  } catch (e) {
    console.error("Error retrieving expenses: ", e);
    return [];
  }
};

const addExpense = async (expense) => {
  try {
    console.log("Adding expense to firebase: ", expense);
    const docRef = await addDoc(getExpensesRef(), {
      ...expense,
      paid: expense.amount / expense.split,
    });
    return docRef;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

const updateExpense = async (updatedExpense) => {
  try {
    console.log("Updating expense: ", updatedExpense);
    await setDoc(
      getExpenseRef(updatedExpense.id),
      updatedExpense
    );
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

const deleteExpense = async (id) => {
  try {
    console.log("Deleting expense: ", id);
    await deleteDoc(getExpenseRef(id));
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

// expense level
const updateExpenseTags = async (id, updatedTags) => {
  try {
    console.log("Updating tags: ", updatedTags);
    await updateDoc(getExpenseRef(id), { tags: updatedTags });
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

// expense level
const updateExpensePrimaryTag = async (id, primaryTag) => {
  try {
    console.log("Updating primary tag: ", primaryTag);
    await updateDoc(getExpenseRef(id), { primaryTag: primaryTag });
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

// user level
const addTag = async (newTag) => {
  try {
    console.log("Adding tag to firebase: ", newTag);
    const docRef = await setDoc(getTagRef(newTag.name), {
      ...newTag
    });
    return docRef;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

// user level
const addTags = async (newTags) => {
  newTags.forEach(tag => {
    addTag(tag)
  })
};

// user level
const deleteTag = async (deletedTag) => {};

const getTags = async () => {
  try {
    console.log("Getting tags for user")
    const querySnapshot = await getDocs(
      getTagsRef()
    );
    const expenses = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return expenses == null ? [] : expenses;
  } catch (e) {
    console.error("Error retrieving expenses: ", e);
    return [];
  }
};

const newBudget = async () => {};

const deleteBudget = async () => {};

const updateBudget = async () => {};

const addRecurringExpense = async () => {};

const removeRecurringExpense = async () => {};

const createNotebook = async () => {};

export {
  addExpense,
  getExpenses,
  deleteExpense,
  updateExpense,
  updateExpenseTags,
  updateExpensePrimaryTag,
  getTags,
  addTag
};
