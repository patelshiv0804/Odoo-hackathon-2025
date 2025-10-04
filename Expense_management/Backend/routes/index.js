const express = require('express');
const router = express.Router();
const authRoutes = require('./authRoutes');
const expenseRoutes = require('./expenseRoutes');

router.use('/expense', expenseRoutes);
router.use('/auth', authRoutes);
module.exports = router;
