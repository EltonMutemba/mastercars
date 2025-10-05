import conexao from '../db/conexao.js';

const CarroModel = {
  getAll: async () => {
    const [rows] = await conexao.promise().query('SELECT * FROM carros ORDER BY id ASC');
    return rows;
  },

  getById: async (id) => {
    const [rows] = await conexao.promise().query('SELECT * FROM carros WHERE id = ?', [id]);
    return rows[0];
  },

  create: async ({ marca, modelo, ano }) => {
    const [result] = await conexao.promise().query(
      'INSERT INTO carros (marca, modelo, ano) VALUES (?, ?, ?)',
      [marca, modelo, ano]
    );
    return { id: result.insertId, marca, modelo, ano };
  },

  update: async (id, { marca, modelo, ano }) => {
    await conexao.promise().query(
      'UPDATE carros SET marca = ?, modelo = ?, ano = ? WHERE id = ?',
      [marca, modelo, ano, id]
    );
    return { id: Number(id), marca, modelo, ano };
  },

  delete: async (id) => {
    await conexao.promise().query('DELETE FROM carros WHERE id = ?', [id]);
  }
};

export default CarroModel;
