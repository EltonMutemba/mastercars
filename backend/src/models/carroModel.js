// src/models/carroModel.js
import pool from '../db/conexao.js';

const CarroModel = {

  getAll: async () => {
    const { rows } = await pool.query('SELECT * FROM carros ORDER BY id ASC');
    return rows;
  },

  getById: async (id) => {
    const { rows } = await pool.query('SELECT * FROM carros WHERE id = $1', [id]);
    return rows[0];
  },

  create: async ({ marca, modelo, ano }) => {
    const { rows } = await pool.query(
      'INSERT INTO carros (marca, modelo, ano) VALUES ($1, $2, $3) RETURNING *',
      [marca, modelo, ano]
    );
    return rows[0];
  },

  update: async (id, { marca, modelo, ano }) => {
    const { rows } = await pool.query(
      'UPDATE carros SET marca = $1, modelo = $2, ano = $3 WHERE id = $4 RETURNING *',
      [marca, modelo, ano, id]
    );
    return rows[0];
  },

  delete: async (id) => {
    await pool.query('DELETE FROM carros WHERE id = $1', [id]);
  }

};

export default CarroModel;
