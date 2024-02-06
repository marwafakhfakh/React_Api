const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3001;
// Définition de l'en-tête pour permettre l'accès depuis n'importe où
app.use((req, res, next) => {
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
          res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
          next();
});
// const users = [
//  { id: 1, name: 'John Doe' },
//  { id: 2, name: 'Jane Smith' },
//  { id: 3, name: 'Bob Johnson' }
// ];
// app.get('/users', (req, res) => { res.json(users);
// });
// app.listen(port, () => {
//  console.log(`Server is running on port ${port}`);
// });
const db = mysql.createConnection({
          host: 'localhost',
          user: 'root',
          password: '',
          database: 'test'
});
// Connexion à la base de données
db.connect((err) => {
          if (err) {
                    console.error('Error connecting to database', err);
                    return;
          }
          console.log('Connected to database');
});
// Récupération des données de la base de données
app.get('/etudiants', (req, res) => {
          const sql = 'SELECT * FROM etudiants';
          db.query(sql, (error, results) => {
                    if (error) {
                              console.error('Error fetching data', error);
                    } else {
                              res.json(results);
                    }
          });
});




app.get('/etudiants/:id', (req, res) => {
          const id = req.params.id;
          const sql = 'SELECT * FROM etudiants where id= ?';
          db.query(sql, [id], (error, results) => {
                    if (error) {
                              console.error('Error fetching data', error);
                    } else {
                              res.json(results);
                    }
          });

});
app.get('/etudiants/:nom/:ville', (req, res) => {
          const nom = req.params.nom;
          const ville = req.params.ville;
          const sql = 'SELECT * FROM etudiants WHERE nom LIKE ? AND ville LIKE ?';
          db.query(sql, [`%${nom}%`, `%${ville}%`], (error, results) => {
              if (error) {
                  console.error('Error fetching data', error);
                  res.status(500).json({ error: 'Internal Server Error' });
              } else {
                  res.json(results);
              }
          });
      });
      
// Ajout d'un nouvel étudiant
app.post('/etudiants', (req, res) => {
          const { nom, ville } = req.body;
          Etudiants.create({ nom, ville }).then((etudiant) => {
              res.json(etudiant);
          });
}); 
// Démarrage du serveur
app.listen(port, () => {
          console.log(`Server is running on port ${port}`);
});