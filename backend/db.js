var mongoClient = require("mongodb").MongoClient
const bd_name = "sistema_matricula"
const bd_collection = "alunos"

mongoClient.connect(`mongodb://localhost/${bd_name}`)
            .then(conn => global.conn = conn.db(bd_name))
            .catch(err => console.log(err))

const ObjectId = require("mongodb").ObjectId

function count(config, callback){  
    global.conn.collection(bd_collection)
        .find(config)
        .count(callback)
}

function findAll(config, callback){  
    global.conn.collection(bd_collection)
        .find({})
        .project(config.query)
        .skip(config.skip)
        .limit(config.limit)
        .sort({ "_id": -1 })
        .toArray(callback)
}

function findForName(config, callback){  
    global.conn.collection(bd_collection)
        .find({[config.campo]: new RegExp(config.search) })
        .project(config.query)
        .skip(config.skip)
        .limit(config.limit)
        .toArray(callback)
}

function insert(aluno, callback){
    global.conn.collection(bd_collection)
        .insert(aluno, callback)
}

function findOne(id, callback){  
    global.conn.collection(bd_collection)
        .find(new ObjectId(id))
        .toArray(callback)
}

function update(id, aluno, callback){
    global.conn.collection(bd_collection)
        .updateOne({_id:new ObjectId(id)}, {$set: aluno}, callback)
}

function deleteOne(id, callback){
    global.conn.collection(bd_collection)
        .deleteOne({_id: new ObjectId(id)}, callback)
}

module.exports = { findAll, insert, findOne, update, deleteOne, findForName, count }
