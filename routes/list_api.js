import { Router } from 'express';
import NetflixData from '../models/netflix_data.js';

const router = Router();

// List Api
router.get('/', async (req, res) => {
  try {
    const { type, search, rating, fromDateAdded, toDateAdded, fromReleaseYear, toReleaseYear, sortBy } = req.query;

    const queries = {};
    if (type) {
      queries.type = { $regex: type, $options: 'i' };
    }
    if (search) {
      queries.$or = [
        { title: { $regex: search, $options: 'i' } },
        { director: { $regex: search, $options: 'i' } },
        { cast: { $regex: search, $options: 'i' } }
      ];
    }
    if (rating) {
      queries.rating = { $regex: rating, $options: 'i' };
    }
    if (fromReleaseYear && toReleaseYear) {
      queries.release_year = { $gte: parseInt(fromReleaseYear), $lte: parseInt(toReleaseYear) };
    }
    if (fromDateAdded && toDateAdded) {
      const fromDate = new Date(fromDateAdded).getFullYear();
      const toDate = new Date(toDateAdded).getFullYear();
      queries.date_added = { $gte: fromDate, $lte: toDate };
    }    

    let sortQuery;
    switch (sortBy) {
      case 'release_year new to old':
        sortQuery = { release_year: -1 };
        break;
      case 'release_year old to new':
        sortQuery = { release_year: 1 };
        break;
      case 'date_added old to new':
        sortQuery = { date_added: 1 };
        break;
      default:
        sortQuery = { date_added: -1 };
    }

    const netflix = await NetflixData.find(queries).sort(sortQuery);

    res.json(netflix);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

export default router;