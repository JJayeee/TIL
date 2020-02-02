require('dotenv').config();

const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const cors = require('cors');
const { sequelize } = require('./models');

const app = express();
const router = express.Router();
const corsOptions = {
  origin: ['http://localhost:8001'],
  // methods: 'GET',
  credentials: true,
};

sequelize.sync();
app.set('port', process.env.PORT || 8001);

app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));

const swaggerRouter = require('./routes/swagger');
const authRouter = require('./routes/auth');

app.use('/swagger', swaggerRouter);
app.use('/auth', authRouter);


app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'developement' ? err : {};
  res.status(err.status || 500).send('error');
});

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기 중');
});