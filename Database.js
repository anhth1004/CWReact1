import * as SQLite from "expo-sqlite";

const database_name = "TodoApp.db";
const database_version = "1.1"; // Increment the version to trigger an update
const database_displayname = "Todo App Database";
const database_size = 200000;

const db = SQLite.openDatabase(
  database_name,
  database_version,
  database_displayname,
  database_size
);

const initDatabase = () => {
  db.transaction((tx) => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS todos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        location TEXT,
        date TEXT,
        parkingAvailable TEXT,
        lengthOfTheHike TEXT,
        difficultyLevel TEXT,
        description TEXT
      );`,
      [],
      () => {
        // Check if the new columns exist
        tx.executeSql(
          `PRAGMA table_info(todos);`,
          [],
          (_, { rows }) => {
            const columnNames = rows._array.map((column) => column.name);
            if (!columnNames.includes("lengthOfTheHike")) {
              // If the "lengthOfTheHike" column doesn't exist, add it to the table
              tx.executeSql(
                `ALTER TABLE todos ADD COLUMN lengthOfTheHike TEXT;`,
                [],
                () => console.log("Added lengthOfTheHike column to the table"),
                (error) => console.error("Error adding lengthOfTheHike column", error)
              );
            }
            if (!columnNames.includes("difficultyLevel")) {
              // If the "difficultyLevel" column doesn't exist, add it to the table
              tx.executeSql(
                `ALTER TABLE todos ADD COLUMN difficultyLevel TEXT;`,
                [],
                () => console.log("Added difficultyLevel column to the table"),
                (error) => console.error("Error adding difficultyLevel column", error)
              );
            }
          },
          (error) => console.error("Error checking for table columns", error)
        );
      },
      (error) => console.error("Error occurred while creating the table.", error)
    );
  });
};

// CRUD functions have been updated to include the new fields.

const addTodo = (title, location, date, parkingAvailable, lengthOfTheHike, difficultyLevel, description) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO todos (title, location, date, parkingAvailable, lengthOfTheHike, difficultyLevel, description) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [title, location, date, parkingAvailable, lengthOfTheHike, difficultyLevel, description],
        (_, { insertId }) => {
          resolve(insertId);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};

const updateTodo = (id, updatedTodo) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "UPDATE todos SET title = ?, location = ?, date = ?, parkingAvailable = ?, lengthOfTheHike = ?, difficultyLevel = ?, description = ? WHERE id = ?",
        [updatedTodo.title, updatedTodo.location, updatedTodo.date, updatedTodo.parkingAvailable, updatedTodo.lengthOfTheHike, updatedTodo.difficultyLevel,, updatedTodo.description, id],
        () => {
          resolve();
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};
const searchTodos = (searchText) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM todos WHERE title LIKE ?",
        [`%${searchText}%`], // This will search for todos with titles containing the searchText
        (_, { rows }) => {
          const data = [];
          for (let i = 0; i < rows.length; i++) {
            data.push(rows.item(i));
          }
          resolve(data);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};


const getTodos = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM todos",
        [],
        (_, { rows }) => {
          const todos = rows._array.map((todo) => ({
            ...todo,
            date: todo.date, // Preserve the date format
          }));
          resolve(todos);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};

const deleteTodo = (id) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM todos WHERE id = ?",
        [id],
        () => {
          resolve();
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};

const Database = {
  initDatabase,
  addTodo,
  getTodos,
  deleteTodo,
  updateTodo,
  searchTodos,
};

export default Database;
