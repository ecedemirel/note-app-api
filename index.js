const express = require('express');
const sql = require('mssql');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());


const config = {
  user: 'sa',
  password: 'StrongPassword!',
  server: 'localhost',
  database: 'NoteApp',
  options: {
    encrypt: true, 
    trustServerCertificate: true, 
  }
};


sql.connect(config, err => {
  if(err) {
    console.log('Veritabanına bağlanırken hata oluştu:', err);
  } else {
    console.log('Veritabanına başarıyla bağlanıldı!');
  }
});


app.get('/api/notes', async (req, res) => {
  try {
    const result = await sql.query`SELECT * FROM Note`;
    res.json(result.recordset);
  } catch(err) {
    res.status(500).send('Notlar alınırken hata oluştu.');
  }
});


app.post('/api/notes', async (req, res) => {
  const { text, backgroundColor } = req.body;
  try {
    // Notu veritabanına ekleyin
    const result = await sql.query`
      INSERT INTO Note (Text, Date, BackgroundColor)
      VALUES (${ text }, GETDATE(), ${ backgroundColor });
      SELECT SCOPE_IDENTITY() AS id
    `;

    // Eklenen notun detaylarını döndürün
    const newNote = {
      id: result.recordset[0].id,
      text: text,
      date: new Date(),
      backgroundColor: backgroundColor
    };
    res.status(201).json(newNote);
  } catch(err) {
    console.log(err)
    res.status(500).send('Not eklenirken hata oluştu.');
  }
});


// Sunucuyu başlatma
app.listen(3000, () => {
  console.log('API sunucusu 3000 portunda çalışıyor.');
});