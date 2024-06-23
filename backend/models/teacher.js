const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const teacherSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePhoto: { type: String, default: 'default.jpg' },
  cv: {
    fullName: { type: String, default: '' },
    age: { type: Number, default: null },
    experience: { type: String, default: '' },
    education: { type: String, default: '' },
    skills: { type: String, default: '' },
    // more fields can be added later
  },
  createdAt: { type: Date, default: Date.now },
  ratings: [{ type: Number }],
});

// Method to hash the password before saving the teacher document
teacherSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    return next(err);
  }
});

// Method to compare the provided password with the stored hashed password
teacherSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Method to calculate the average rating
teacherSchema.methods.updateAverageRating = function () {
  if (this.ratings.length === 0) {
    return 0;
  }

  const sum = this.ratings.reduce((total, rating) => total + rating, 0);
  return (sum / this.ratings.length).toFixed(2);
};

const Teacher = mongoose.model('Teacher', teacherSchema);

module.exports = Teacher;
