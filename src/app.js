import express from 'express'

const app = express()

// Indicar para o express ler o body como json

app.use(express.json())

const cursos = [
    {id: 1, disciplina: 'ADS'},
    {id: 2, disciplina: 'ADS'},
    {id: 3, disciplina: 'ADS'},
    {id: 4, disciplina: 'ADS'},
]

function buscarCursosPorId(id){
    return cursos.filter(curso => curso.id == id)
}

function buscarIndexCurso(id){
    return cursos.findIndex(curso => curso.id == id)
}

// Criando uma rota default (endpoint) / req = request / res = response
app.get('/', (req, res)=> {
    res.send('Hello Thiago')
})

app.get('/cursos', (req, res)=> {
    res.status(200).send(cursos)
})

app.get('/cursos/:id', (req, res)=> {
//    let index = req.params.id
//    console.log(index)
    res.json(buscarCursosPorId(req.params.id))
})

app.post('/cursos', (req, res)=> {
    cursos.push(req.body)
    res.status(200).send('Seleção cadastrada com sucesso!')
})

app.delete('/cursos/:id', (req, res)=> {
    let index = buscarIndexCurso(req.params.id)
    console.log(index)
    cursos.splice(index, 1)
    res.send(`O curso com id ${req.params.id} excluído com sucesso!`)
})

app.put('/cursos/:id', (req, res)=> {
    let index = buscarIndexCurso(req.params.id)
    cursos[index].disciplina = req.body.disciplina
    res.json(cursos)
})

export default app
