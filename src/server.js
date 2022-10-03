import express from 'express';
import cors from 'cors';
import categoriesRouters from './routers/categoriesRouters.js'
import gamesRouter from './routers/gamesRouter.js'
import customersRouter from './routers/customersRouter.js'
import rentalsRouter from './routers/rentalsRouter.js'

const PORT = (process.env.PORT || 4000)

const app = express();
app.use(express.json());
app.use(cors());

app.get('/status', (req, res) => {
  res.send(200)
})

app.use(categoriesRouters);
app.use(gamesRouter);
app.use(customersRouter);
app.use(rentalsRouter);

app.listen(PORT, () => console.log(`listen on port ${PORT}`));