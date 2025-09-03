import CursoRepository from '../repositories/CursoRepository.js';

const CursoController = {

  // GET /cursos
  async index(req, res) {
    try {
      const cursos = await CursoRepository.findAll();
      return res.status(200).json(cursos);

    } catch (err) {
      return res.status(500).json({ error: 'Erro ao listar os cursos'});
    }
  },

  //GET /cursos/:id
  async show(req, res) {
    try {
      const cursos = await CursoRepository.findById(req.params.id);
      if (!cursos) return res.status(404).json({ message: 'Não encontrado' });
      return res.status(200).json(cursos);

    } catch (err) {
      return res.status(500).json({ error: 'Erro interno' });
    }
  },

  // POST /cursos  (body: { "disciplina": "ADS" })
  async store(req, res) {
    try {
      const { disciplina } = req.body || {};
      if (!disciplina) return res.status(400).json({ message: 'Campo "disciplina" é obrigatório' });

      const { id } = await CursoRepository.create({ disciplina });
      return res.status(201).json({ id, disciplina });

    } catch (err) {
      return res.status(500).json({ error: 'Erro interno' });
    }
  },

  // PUT /cursos/:id  (body: { "disciplina": "Novo nome" })
  async update(req, res) {
    try {
      const { disciplina } = req.body || {};
      if (!disciplina) return res.status(400).json({ message: 'Campo "disciplina" é obrigatório' });

      const affected = await CursoRepository.update(req.params.id, { disciplina });
      if (!affected) return res.status(404).json({ message: 'Não encontrado' });
      return res.status(200).json({ message: 'Atualizado com sucesso' });

    } catch (err) {
      return res.status(500).json({ error: 'Erro interno' });
    }
  },

  // DELETE /cursos/:id
  async delete(req, res) {
    try {
      const affected = await CursoRepository.remove(req.params.id);
      if (!affected) return res.status(404).json({ message: 'Não encontrado' });
      return res.status(204).send();

    } catch (err) {
      return res.status(500).json({ error: 'Erro interno' });
    }
  }
};

export default CursoController;
