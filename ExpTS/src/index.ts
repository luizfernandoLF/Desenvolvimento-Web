import express from "express"; 
import dotenv from "dotenv";
import { requestLogger } from "./middlewares/requestLogger";
import router from "./router/router"; 
import {engine} from 'express-handlebars';

dotenv.config(); 

const app = express(); 
const PORT = process.env.PORT || 3333; 

app.use(requestLogger('completo')) 

//ex 5
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", `./src/views`);

//ex 6
app.engine("handlebars", engine({

  helpers: {
    listNodejsTechnologies: require(`${process.cwd()}/src/views/helpers/helpers`).listNodejsTechnologies
  }
}));

app.set("view engine", "handlebars");
app.set("views", `./src/views`);

app.use(router); 

app.listen(PORT, () => { 
  console.log(`Express app iniciada na porta ${PORT}.`); 
});