import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";

// Carregar variáveis de ambiente
dotenv.config();

const app = express();

// Middlewares globais
app.use(cors());
app.use(express.json());

// Exemplo de middleware de log simples
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Rotas básicas
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "🌍 Olá mundo com Express + TypeScript!" });
});

// Tratamento de rota não encontrada
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: "Rota não encontrada" });
});

// Tratamento de erros globais
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error("Erro:", err.message);
  res.status(500).json({ error: "Erro interno no servidor" });
});

// Porta do .env ou 3000
const PORT = process.env.PORT || 3000;

// Inicialização do servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor rodando em http://localhost:${PORT}`);
});
