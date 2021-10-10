import express from "express";
import md5 from "md5";
import Image from "../database/Schema/ImageSchema";
import multer from "multer";


var storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const router = express.Router();
/**
 * send as answer Image
 */
router.get("/:Hash", function(req, res) {
  Image.findOne({ _id: req.params.Hash }, { __v: 0 }, (err, currentImage) => {
    if (currentImage) {
      currentImage.createdAt = Date.now();
      currentImage.save();
      res.contentType(currentImage.img.contentType);
      res.send(currentImage.img.data);
    } else {
      res.sendStatus(204);
    }
  });
});

/**
 * create Image for sharing in DB and send as answer slug
 */
router.post("/", upload.single("file"), function(req, res) {
  if (req.user) {
    Image.findOne({ _id: req.params.Hash }, { __v: 0 }, (err, currentImage) => {
    
        if (currentImage) {
          res.send(currentImage._id);
        } else {
          new Image({
            _id: md5(Date.now().toString() + req.user._id),
            img: { data: req.file.buffer, contentType: req.file.mimetype },
            createdAt: Date.now()
          })
            .save()
            .then(newImage => {
              res.send(newImage._id);
            });
        }
    });
  } else {
    res.sendStatus(401);
  }
});

export default router;
