import express from 'express';
import mongoose from 'mongoose';
import todoRoutes from './routes/todoRoutes';

const app = express();
const PORT = 3000;

mongoose.connect('mongodb://localhost:27017/todo-app', {
  useNewUrlParser: true,
  useUnifiedTopology: true
} as any).then(() => {
  console.log('MongoDB connected');
}).catch((err) => {
  console.error('MongoDB connection error', err);
});

app.use(express.json());
app.use('/api', todoRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
