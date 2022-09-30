import express from 'express';
import cors from 'cors';
import categoriesRouters from './routers/categoriesRouters.js'
import gamesRouter from './routers/gamesRouter.js'

const PORT = (process.env.PORT || 4000)

const app = express();
app.use(express.json());
app.use(cors());

app.get('/status', (req, res) => {
  res.send(200)
})

app.use(categoriesRouters);
app.use(gamesRouter);

app.listen(PORT, () => console.log(`listen on port ${PORT}`));