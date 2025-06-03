import express, { Request, Response } from "express"; 
import dotenv from "dotenv"; 
import { requestLogger } from "./middlewares/requestLogger";


dotenv.config(); 

const app = express(); 
const PORT = process.env.PORT || 3333; 

app.use(requestLogger('completo'))


app.get("/", (req: Request, res: Response) => { 
  res.send("Hello world!");
});

app.get("/teste", (req: Request, res: Response) => {
  res.send("Página de teste");
});

app.listen(PORT, () => { 
  console.log(`Express app iniciada na porta ${PORT}.`); 
});