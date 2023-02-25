import { Router } from 'express';
import NetflixData from '../models/netflix_data.js';
import { readFile } from 'fs/promises';


const router = Router();

// Seed Data API
router.post('/', async (req, res) => {
  try {
    const count = await NetflixData.countDocuments();

    if (count > 0) {
      res.status(400).json({ message: 'Data already seeded' });
      return;
    }

    const json = JSON.parse(
      await readFile(
        new URL('../netflix_titles.json', import.meta.url)
      )
    );
    await NetflixData.insertMany(json);

    res.json({ message: 'Data seeded successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

export default router;
