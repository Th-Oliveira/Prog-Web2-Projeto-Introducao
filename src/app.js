import express from 'express'

import conexao from '../infra/conexao.js'

const app = express()

// Indicar para o express ler o body como json

app.use(express.json())
app.use(express.urlencoded({extended: true}))

// const cursos = [
//     {id: 1, disciplina: 'ADS'},
//     {id: 2, disciplina: 'ADS'},
//     {id: 3, disciplina: 'ADS'},
//     {id: 4, disciplina: 'ADS'},
// ]

function buscarCursosPorId(id){
    return cursos.filter(curso => curso.id == id)
}

function buscarIndexCurso(id){
    return cursos.findIndex(curso => curso.id == id)
}

// Criando uma rota default (endpoint) / req = request / res = response
// app.get('/', (req, res)=> {
//     res.send('Hello Thiago')
// })

// Rotas

app.get('/cursos', (req, res)=> {
    //res.status(200).send(cursos)
    const sql = "SELECT * FROM cursos.curso;"
    conexao.query(sql, (error, result) => {
        if (error){
            console.log(error)
        } else {
            res.status(200).json(result)
        }
    })
})

// app.get('/cursos/:id', (req, res)=> {
// //    let index = req.params.id
// //    console.log(index)
//     res.json(buscarCursosPorId(req.params.id))
// })

app.get('/cursos/:id', (req, res) => {
    const id = req.params.id
    const sql = "SELECT * FROM cursos.curso WHERE id = ?;"
    conexao.query(sql, id, (error, result) => {
        if(error){
            console.log(error)
            res.status(404).json({'error': error})
        } else {
            res.status(200).json(result)
        }
    })
})

// app.post('/cursos', (req, res)=> {
//     cursos.push(req.body)
//     res.status(200).send('Seleção cadastrada com sucesso!')
// })

app.post('/cursos', (req, res) => {
    const curso = req.body
    const sql = "INSERT INTO cursos.curso SET ?;"
    conexao.query(sql, curso, (error, result) => {
        if(error){
            console.log(error)
            res.status(404).json({'error': error})
        } else {
            res.status(200).json(result)
        }
    })
})

// app.delete('/cursos/:id', (req, res)=> {
//     let index = buscarIndexCurso(req.params.id)
//     console.log(index)
//     cursos.splice(index, 1)
//     res.send(`O curso com id ${req.params.id} excluído com sucesso!`)
// })

app.delete('/cursos/:id', (req, res) => {
    const id = req.params.id
    const sql = "DELETE FROM cursos.curso WHERE id = ?;"
    conexao.query(sql, id, (error, result) => {
        if(error){
            console.log(error)
            res.status(404).json({'error': error})
        } else {
            res.status(200).json(result)
        }
    })
})

// app.put('/cursos/:id', (req, res)=> {
//     let index = buscarIndexCurso(req.params.id)
//     cursos[index].disciplina = req.body.disciplina
//     res.json(cursos)
// })

app.put('/cursos/:id', (req, res) => {
    const id = req.params.id
    const { curso } = req.body
    const sql = "UPDATE cursos.curso SET disciplina = ? WHERE id = ?;"
    conexao.query(sql, [curso, id], (error, result) => {
        if(error){
            console.log(error)
            res.status(404).json({'error': error})
        } else {
            res.status(200).json(result)
        }
    })
})

export default app
