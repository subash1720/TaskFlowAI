const express = require('express');
const cors = require('cors');
const taskRoutes = require("./routes/taskRoutes");
const authRoutes = require('./routes/authRoutes');
const aiRoutes = require('./routes/aiRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use("/api/tasks", taskRoutes);
app.use('/api/ai', aiRoutes);

app.get('/', (req, res) => {

    res.json({

        message: '🚀 TaskFlow AI Backend Running Successfully'

    });

});

module.exports = app;