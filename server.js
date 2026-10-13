import express from 'express';
import multer from 'multer';
import fs from 'node:fs';  // se n tiver pasta ele cria uma
import path from 'node:path'; //trabalha com arquivos e o nome deles
import {randomUUID} from 'node:crypto'; // id unico

const app = express();

if (!fs.existsSync("uploads")) {
    fs.mkdirSync("upload");
}

const storage = multer.diskStorage( 
    {
        destination: (req, file, cb) => {
            cb(null, "uploads/");
        },

        filename: (req, file, cb) => {
            const extensao = path.extname(file.originalname);
            const nomeArquivo = randomUUID() + extensao;

            cb(null, nomeArquivo);
        }
});

const upload = multer({storage})

app.get("/", (req, res) => {
    res.send(`
                <h1>Meu primeiro upload</h1>

        <form action="/upload" method="POST"
            enctype="multipart/form-data">

            <input type="file" name="foto" required>

            <button type="submit">Enviar imagem</button>

        </form>`);
});

app.post("/upload", upload.single("foto"),(req,res) =>{
    if(!req.file){
        return res.status(400).send("Nenhum arquivo enviado.")
    }
    {
        res.send("Upload enviado com sucesso!")
    }
});

app.listen(300, () =>{
    console.log("Servidor em http:/localhost:3000");
});