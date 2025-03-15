import sqlite3 from 'sqlite3';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

interface Link {
  id: number;
  url: string;
  date_added: string;
}

const db = new sqlite3.Database(path.join(__dirname, '..', 'links.db'), (err: Error | null) => {
  if (err) {
    console.error('Error opening database:', err);
  } else {
    console.log('Database connected.');
  }
});

// Initialize the table if it doesn't exist
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS links (
    id INTEGER PRIMARY KEY, 
    url TEXT, 
    date_added DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);
});

export function saveLink(url: string): void {
  const stmt = db.prepare("INSERT INTO links (url) VALUES (?)");
  stmt.run(url, (err: Error | null) => {
    if (err) {
      console.error('Error inserting link:', err);
    }
  });
  stmt.finalize();
}

export function getLinks(callback: (rows: Link[]) => void): void {
  db.all("SELECT * FROM links ORDER BY date_added DESC", (err: Error | null, rows: Link[]) => {
    if (err) {
      console.error('Error fetching links:', err);
    } else {
      callback(rows);
    }
  });
}
