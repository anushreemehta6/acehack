import mongoose from 'mongoose';

const userProfileSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  linkedin: {
    type: String,
    default: '',
  },
  twitter: {
    type: String,
    default: '',
  },
  telegram: {
    type: String,
    default: '',
  },
  contactNo: {
    type: String,
    required: true,
  },
  calendlyLink: {
    type: String,
    default: '',
  },
  companyCategory: {
    type: String,
    required: true,
  },
  customCategory: {
    type: String,
    default: '',
  },
  userType: {
    type: String,
    enum: ['creator', 'investor'],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update the updatedAt timestamp before saving
userProfileSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

const UserProfile = mongoose.models.UserProfile || mongoose.model('UserProfile', userProfileSchema);

export default UserProfile; 