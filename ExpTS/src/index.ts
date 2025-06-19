// index.ts
import express from "express";
import dotenv from "dotenv";
import { requestLogger } from "./middlewares/requestLogger";
import router from "./router/router";
import { engine } from 'express-handlebars'; // Importe o engine do express-handlebars

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3333;

app.use(requestLogger('completo'));

//configuração única agora do handlebars (helpers e layouts do exercício 8)
app.engine("handlebars", engine({
  helpers: {
    listNodejsTechnologies: require(`${process.cwd()}/src/views/helpers/helpers`).listNodejsTechnologies
  },

  layoutsDir: `${process.cwd()}/src/views/layouts`, //caminho pras pasta de layouts 
  defaultLayout: 'main', 
}));

app.set("view engine", "handlebars"); 
app.set("views", `./src/views/main`); //caminho pras views dos controladores 

app.use(router);

app.listen(PORT, () => {
  console.log(`Express app iniciada na porta ${PORT}.`);
});