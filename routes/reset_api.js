import { Router } from 'express';
import NetflixData from '../models/netflix_data.js';

const router = Router();

// Reset Data API
router.delete('/', async (req, res) => {
    try {
        const count = await NetflixData.countDocuments();
        if (count === 0) {
          return res.status(404).json({ message: 'No data found.' });
        }
        await NetflixData.deleteMany({});
        return res.status(200).json({ message: 'Data has been reset.' });
      } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error.' });
      }
});

export default router;
