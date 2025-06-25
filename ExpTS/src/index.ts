import express from "express";
import dotenv from "dotenv";
import { requestLogger } from "./middlewares/requestLogger";
import router from "./router/router";
import { engine } from 'express-handlebars';
import path from 'path'; 
import sass from 'sass'; 
import validateEnv from "./utils/validateEnv";

dotenv.config();
validateEnv();

const app = express();
const PORT = process.env.PORT || 3333;

app.use(requestLogger('completo'));

//configuração ÚNICA do Handlebars
app.engine("handlebars", engine({
  helpers: {
    listNodejsTechnologies: require(`${process.cwd()}/src/views/helpers/helpers`).listNodejsTechnologies
  },
  layoutsDir: `${process.cwd()}/src/views/layouts`,
  defaultLayout: 'main',
}));

app.set("view engine", "handlebars");
app.set("views", `./src/views/main`);

app.use('/styles', (req, res, next) => {
    if (req.path.endsWith('.css')) {
        // Caminho para o arquivo SCSS original (dentro de src/views/main/styles)
        const scssPath = path.join(process.cwd(), 'src', 'views', 'main', 'styles', path.basename(req.path, '.css') + '.scss');

        sass.render({
            file: scssPath,
            outputStyle: 'compressed' 
        }, (err, result) => {
            if (err) {
                console.error('SASS Compile Error:', err.message);
                return res.status(500).send('Erro na compilação do SASS');
            }

            if (result && result.css) { 
                res.type('text/css').send(result.css.toString()); 
            } else {
                console.error('SASS Render Error: Result or css not found after compilation.');
                return res.status(500).send('Erro interno na compilação do SASS.');
            }
        });
    } else {
        next(); 
    }
});


app.use(express.static(path.join(process.cwd(), 'public')));


app.use(router);

app.listen(PORT, () => {
  console.log(`Express app iniciada na porta ${PORT}.`);
});