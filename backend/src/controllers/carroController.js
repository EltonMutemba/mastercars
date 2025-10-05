import CarroModel from '../models/carroModel.js';

const CarroController = {
  listar: async (req, res) => {
    try {
      const carros = await CarroModel.getAll();
      res.json(carros);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erro ao listar carros' });
    }
  },

  obter: async (req, res) => {
    try {
      const { id } = req.params;
      const carro = await CarroModel.getById(id);
      if (!carro) return res.status(404).json({ error: 'Carro não encontrado' });
      res.json(carro);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erro ao obter carro' });
    }
  },

  criar: async (req, res) => {
    try {
      const { marca, modelo, ano } = req.body;

      // validação básica no backend
      if (!marca || !modelo || !ano) {
        return res.status(400).json({ error: 'marca, modelo e ano são obrigatórios' });
      }
      if (isNaN(Number(ano)) || Number(ano) < 1886 || Number(ano) > new Date().getFullYear() + 1) {
        return res.status(400).json({ error: 'ano inválido' });
      }

      const novo = await CarroModel.create({ marca, modelo, ano: Number(ano) });
      res.status(201).json(novo);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erro ao criar carro' });
    }
  },

  atualizar: async (req, res) => {
    try {
      const { id } = req.params;
      const { marca, modelo, ano } = req.body;

      const existente = await CarroModel.getById(id);
      if (!existente) return res.status(404).json({ error: 'Carro não encontrado' });

      if (!marca || !modelo || !ano) {
        return res.status(400).json({ error: 'marca, modelo e ano são obrigatórios' });
      }
      if (isNaN(Number(ano)) || Number(ano) < 1886 || Number(ano) > new Date().getFullYear() + 1) {
        return res.status(400).json({ error: 'ano inválido' });
      }

      const atualizado = await CarroModel.update(id, { marca, modelo, ano: Number(ano) });
      res.json(atualizado);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erro ao atualizar carro' });
    }
  },

  deletar: async (req, res) => {
    try {
      const { id } = req.params;
      const existente = await CarroModel.getById(id);
      if (!existente) return res.status(404).json({ error: 'Carro não encontrado' });

      await CarroModel.delete(id);
      res.json({ message: 'Carro deletado com sucesso' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erro ao deletar carro' });
    }
  }
};

export default CarroController;
