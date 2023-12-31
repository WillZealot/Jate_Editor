import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  const db = await initdb(); // Initialize the database
  const tx = db.transaction('jate', 'readwrite'); // Start a transaction
  const store = tx.objectStore('jate'); // Get the object store

  // Add the content to the store
  const newItem = { content };
  const key = await store.add(newItem);

  await tx.complete; // Complete the transaction
  console.log('Added content to the database with key:', key);
};

export const getDb = async () => {
  const db = await initdb(); // Initialize the database
  const tx = db.transaction('jate', 'readonly'); // Start a read-only transaction
  const store = tx.objectStore('jate'); // Get the object store

  return store.getAll();
};

initdb();