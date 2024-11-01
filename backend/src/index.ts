import express from 'express';
import userRoutes from './modules/users/user.route';
import errorHandler from './libs/middleware/error.middleware';
import connectDB from './libs/db/db.config';

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(express.json());

app.use('/auth', userRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
