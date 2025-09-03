import conexao from "../database/Conexao.js";

const CursoRepository = {
  async findAll() {
    const rows = await conexao.queryAsync("SELECT * FROM cursos.curso;");
    return rows;
  },

  async findById(id) {
    const rows = await conexao.queryAsync(
      "SELECT * FROM cursos.curso WHERE id = CAST(? AS UNSIGNED) LIMIT 1;",[id]);
    return rows || null;
  },

  async create({ disciplina }) {
    const result = await conexao.queryAsync(
      "INSERT INTO cursos.curso (disciplina) VALUES (?);",[disciplina]);
    return { id: result.insertId };
  },

  async update(id, { disciplina }) {
    const result = await conexao.queryAsync(
      "UPDATE cursos.curso SET disciplina = ? WHERE id = ?;",[disciplina, id]);
    return result.affectedRows; // 0 ou 1
  },

  async remove(id) {
    const result = await conexao.queryAsync(
      "DELETE FROM cursos.curso WHERE id = ?;",[id]);
    return result.affectedRows; // 0 ou 1
  },
};

export default CursoRepository;
