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

// PUT method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('PUT to the database');
  // Create a connection to the database database and version we want to use
  const jateDb = await openDB('jate', 1);
  // Create a new transaction and specify the database and data privileges.
  const tx = jateDb.transaction('jate', 'readwrite');
  // Open up the desired object store.
  const store = tx.objectStore('jate');
  // Use the put method to add content to the database.
  const request = store.put({ id: 1, value: content });
  // Get confirmation of the request.
  const result = await request;
  console.log('🚀 - data saved to the database', result.value);
};

// GET method that gets all the content from the database
export const getDb = async () => {
  console.log('GET from the database');
  // Create a connection to the database database and version we want to use.
  const jateDb = await openDB('jate', 1);
  // Create a new transaction and specify the database and data privileges.
  const tx = jateDb.transaction('jate', 'readonly');
  // Open up the desired object store.
  const store = tx.objectStore('jate');
  // Use the get method to get data from the database.
  const request = store.get(1);
  // Get confirmation of the request.
  const result = await request;
  result
  ? console.log('DATA is connected to db', result.value)
  : console.log ('DATA not connecting to db');
return result?.value;
};

initdb();
