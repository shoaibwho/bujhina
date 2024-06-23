const express = require('express');
const router = express.Router();
const Teacher = require('../models/teacher');

// basic profile info
router.put('/:teacherId', async (req, res) => {
  const { teacherId } = req.params;
  const { username, email, profilePhoto, cv } = req.body;

  try {
    const updatedTeacher = await Teacher.findByIdAndUpdate(
      teacherId,
      { username, email, profilePhoto, cv },
      { new: true }
    );

    if (!updatedTeacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }

    res.json({ success: true, teacher: updatedTeacher });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update profile', error: error.message });
  }
});

// update cv info
router.put('/cv/:teacherId', async (req, res) => {
  const { teacherId } = req.params;
  const { fullName, age, experience, education, skills } = req.body;

  try {
    const updatedTeacher = await Teacher.findByIdAndUpdate(
      teacherId,
      {
        'cv.fullName': fullName,
        'cv.age': age,
        'cv.experience': experience,
        'cv.education': education,
        'cv.skills': skills,
      },
      { new: true }
    );

    if (!updatedTeacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }

    res.json({ success: true, teacher: updatedTeacher });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update CV', error: error.message });
  }
});

// rating 
router.post('/rating/:teacherId', async (req, res) => {
  const { teacherId } = req.params;
  const { rating } = req.body;

  try {
    const teacher = await Teacher.findById(teacherId);

    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }

    teacher.ratings.push(rating);
    teacher.updateAverageRating();
    await teacher.save();

    res.json({ success: true, teacher });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add rating', error: error.message });
  }
});

module.exports = router;
