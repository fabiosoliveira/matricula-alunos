const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const cors = require("cors")
global.db = require('./db')
const porta = 3003
let host = 'localhost'

if (process.env.NODE_ENV == "production") {
    host = '192.168.44.101'
}

// meaduler
app.use(cors())
app.use(express.static('./public/')) // servir arquivos estaticos
app.use(bodyParser.urlencoded({ extended: true })) // ler dados submit de formulário
app.use(bodyParser.json()) // ler dados vindo em formato json
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', `http://${host}:3000`) // Website you wish to allow to connect 
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE') // Request methods you wish to allow 
    //res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // Request headers you wish to allow 
    //res.setHeader('Access-Control-Allow-Credentials', true); // Set to true if you need the website to include cookies in the requests sent // to the API (eg in case you use sessions) 
    next(); // Pass to next layer of middleware 
})

const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './public/fotos/')
    },
    filename: function (req, file, callback) {
        //callback(null, `${Date.now()}_${file.originalname}`)
        callback(null, `${req.body.id}.jpg`)
    }
})

const upload = multer({ storage }).single('foto')
// const upload = multer({ storage })

app.post('/upload', (req, res) => {
    upload(req, res, err => {
        if (err) {
            return res.end('Ocorreu um erro.')
        }
        res.end(`${req.body.id}.jpg`)
    })
})

app.get('/alunos', (req, res) => {
    const { page, limit } = req.query
    delete req.query.page
    delete req.query.limit

    const skip = limit * (page - 1)

    const config = {
        query: req.query,
        limit: Number(limit),
        skip
    }

    global.db.findAll(config, (e, docs) => {
        if (e) { return console.log(e) }
        res.send(docs)
    })
})

app.get('/alunos/quantidade', (req, res) => {
    const { search, campo } = req.query

    let config = {}
    if (search != undefined) {
        config = { [campo]: new RegExp(search) }
    }

    global.db.count(config, (e, resp) => {
        if (e) { return console.log(e) }
        res.send({ quantidade: resp })
    })
})

app.get('/alunos/:id', (req, res, next) => {
    const id = req.params.id
    global.db.findOne(id, (e, docs) => {
        if (e) { return console.log(e) }
        res.send(docs[0])
    })
})

app.get('/alunos/:campo/:search', (req, res, next) => {
    const { page, limit } = req.query
    delete req.query.page
    delete req.query.limit

    const skip = limit * (page - 1)

    const { search, campo } = req.params
    delete req.params.search
    delete req.params.campo

    const config = {
        query: req.query,
        limit: Number(limit),
        skip,
        campo,
        search
    }

    global.db.findForName(config, (e, docs) => {
        if (e) { return console.log(e) }
        res.send(docs)
    })
})


app.post('/alunos', (req, res) => {
    const aluno = { ...req.body }
    console.log(aluno)
    global.db.insert(aluno, (err, result) => {
        if (err) { return console.log(err) }
        res.send(aluno)
    })
})


// app.post('/alunos/file', upload.single('foto'), (req, res) => {
//     res.send(req.file.filename)
// })

app.put('/alunos/:id', (req, res) => {
    const id = req.params.id
    const aluno = { ...req.body }
    console.log(aluno)
    global.db.update(id, aluno, (e, result) => {
        if (e) { return console.log(e) }
        res.send(aluno)
    })
})

app.delete('/alunos/:id', (req, res) => {
    const id = req.params.id

    global.db.deleteOne(id, (e, result) => {
        if (e) { return console.log(e) }
        res.send({id})
    })
})

app.get('/teste', (req, res) => res.send("Ok"))
app.listen(porta, () => console.log(`Executando na porta: ${porta}`))