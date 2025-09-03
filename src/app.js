import express from 'express'

import cursoRoutes from './app/routes/CursoRoutes.js'

const app = express()

// Indicar para o express ler o body como json

app.use(express.json())
app.use(express.urlencoded({extended: true}))

// Healthcheck
app.get('/health', (_req, res) => res.status(200).json({ status: 'ok'}));

// Rotas
app.use(cursoRoutes);

// 404 - rota não encontrada
app.use((req, res) => {
    return res.status(404).json({ error: 'Rota não encontrada.'});
});

// Handler genérico de erros
app.use((err, _req, res, _next) => {
    console.error(err);
    return res.status(500).json({ error: 'Erro interno no servidor.'});
})

export default app;