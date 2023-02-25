import mongoose from "mongoose";

const netflixSchema = new mongoose.Schema({
  show_id: {
    type: String,
  },
  type: {
    type: String,
    enum: ['Movie', 'TV Show'],
  },
  title: {
    type: String,
  },
  director: {
    type: String,
  },
  cast: {
    type: [String],
  },
  country: {
    type: [String],
  },
  date_added: {
    type: Date,
  },
  release_year: {
    type: Number,
  },
  rating: {
    type: String,
  },
  duration: {
    type: String,
  },
  listed_in: {
    type: [String],
  },
  description: {
    type: String,
  }
});

const NetflixData = mongoose.model('NetflixData', netflixSchema);

export default NetflixData;
