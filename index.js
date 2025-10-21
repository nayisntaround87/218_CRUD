const express = require('express');
let mysql = require('mysql2');
const app = express();
const port = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Hello World!');   
});

app.listen(port, () => {
    console.log(`Server is running on port ${PORT}`);
});

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'nayla0705',
    database: 'biodata',
    port: 3307
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:' + err.stack);
        return;
    }
    console.log('Connection Successfully');
});

app.get('/api/mahasiswa', (req, res) => {
    db.query('SELECT * FROM mahasiswa', (err, results) => {
        if (err) {
            console.error('Error executing query: ' + err.stack);
            res.status(500).send('Error fetching users');
            return;
        }
        res.json(results);
    });
});

app.post('/api/mahasiswa', (req, res) => {
    const { nama, nim, kelas, prodi } = req.body;

    if (!nama || !nim || !kelas || !prodi) {
        return res.status(400).json({ message: 'nama, nim, kelas, prodi wajib diisi'});
    }

    db.query('INSERT INTO mahasiswa (nama, nim, kelas, prodi) VALUES (?, ?, ?, ?)',
    [nama, nim, kelas, prodi],
    (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Database error' });
        }

        res.status(201).json({ message: 'User created successfully'});
    }
    );
});

app.put('/api/mahasiswa/:id', (req, res) => {
    const userId = req.params.id;
    const { nama, nim, kelas, prodi } = req.body;
    db.query(
        'UPDATE mahasiswa SET nama = ?, nim = ?, kelas = ?, prodi = ? WHERE id = ?',
        [nama, nim, kelas, prodi, userId],
        (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Database error' });
            }
            res.json({ message: 'User updated successfully' });
        }   
    );
});

app.delete('/api/mahasiswa/:id', (req, res) => {
    const userId = req.params.id;
    db.query('DELETE FROM mahasiswa WHERE id = ?', [userId], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Database error' });
        }
        res.json({ message: 'User deleted successfully' });
    });
});