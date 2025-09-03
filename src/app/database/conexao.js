import mysql from 'mysql'
import { promisify } from 'node:util';

const conexao = mysql.createConnection({
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: '',
    database: 'cursos'
})

conexao.connect()

// Transforma query em Promise (resolve apenas "results")
conexao.queryAsync = promisify(conexao.query).bind(conexao);

// Aplicamos o export para utilizar o objeto em outros aplicativos
export default conexao;
