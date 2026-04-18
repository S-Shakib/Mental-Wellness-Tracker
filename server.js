const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/auth');
const moodRoutes = require('./routes/mood');
const notesRoutes = require('./routes/notes');
const goalsRoutes = require('./routes/goals');
const remindersRoutes = require('./routes/reminders');
const chatbotRoutes = require('./routes/chatbot');
const adminRoutes = require('./routes/admin');

app.use('/api/auth', authRoutes);
app.use('/api/mood', moodRoutes);
app.use('/api/notes', notesRoutes);
app.use('/api/goals', goalsRoutes);
app.use('/api/reminders', remindersRoutes);
app.use('/api/chatbot', chatbotRoutes);
app.use('/api/admin', adminRoutes);

app.get('/', (req, res) => {
    res.send('Mental Wellness Tracker API is running!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});