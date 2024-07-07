const express = require('express');
const router = express.Router();
const Problem = require('../models/problem');

// Route to create a new problem
router.post('/', async (req, res) => {
  try {
    const { title, description, subject, payment } = req.body;
    const newProblem = new Problem({
      title,
      description,
      subject,
      payment,
      student: req.user.id,
    });

    const savedProblem = await newProblem.save();
    res.json(savedProblem);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Route to get all problems or a specific problem based on query parameters
router.get('/', async (req, res) => {
  try {
    let problems;
    if (req.query.studentId) {
      problems = await Problem.find({ student: req.query.studentId });
    } else {
      problems = await Problem.find();
    }
    res.json(problems);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Route to add a bid to a problem
router.put('/:problemId/bid', async (req, res) => {
  try {
    const { problemId } = req.params;
    const { price } = req.body;

    const problem = await Problem.findById(problemId);
    if (!problem) {
      return res.status(404).json({ message: 'Problem not found' });
    }

    problem.bids.push({ teacher: req.user.id, price });
    const updatedProblem = await problem.save();

    res.json(updatedProblem);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error'});
  }
});

module.exports = router; 
