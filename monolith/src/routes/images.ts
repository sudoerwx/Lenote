import express from 'express';
import md5 from 'md5';
import Image from '../models/Schema/ImageSchema';
import multer from 'multer';

var storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const router = express.Router();
/**
 * send as answer Image
 */
router.get('/:Hash', async (req, res) => {
  const currentImage = await Image.findOne(
    { _id: req.params.Hash },
    { __v: 0 }
  );

  if (!currentImage) {
    res.sendStatus(204);
  }
  currentImage.createdAt = Date.now();
  currentImage.save();
  res.contentType(currentImage.img.contentType);
  res.send(currentImage.img.data);
});

/**
 * create Image for sharing in DB and send as answer slug
 */
router.post('/', upload.single('file'), async (req, res) => {
  if (!req.user) {
    res.sendStatus(401);
  }
  const currentImage = await Image.findOne(
    { _id: req.params.Hash },
    { __v: 0 }
  );

  if (currentImage) {
    res.send(currentImage._id);
  } else {
    new Image({
      _id: md5(Date.now().toString() + req.user._id),
      img: { data: req.file.buffer, contentType: req.file.mimetype },
      createdAt: Date.now(),
    })
      .save()
      .then((newImage) => {
        res.send(newImage._id);
      });
  }
});

export default router;
