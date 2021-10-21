import express from 'express';
import md5 from 'md5';
import User from '../models/Schema/userSchema';
import Link from '../models/Schema/shareLinkSchema';

const router = express.Router();

router.get('/:nameHash', async (req, res) => {
  if (req.user) {
    const currentLink = await Link.findById(req.params.nameHash);
    if (currentLink) {
      const secondFileId = req.user.secondFiles.findIndex(
        ({ nameHash }: { nameHash: string }) =>
          nameHash.localeCompare(currentLink.sharedFile.nameHash) === 0
            ? true
            : false
      );
      const ownFileId = req.user.ownFiles.findIndex(
        ({ nameHash }: { nameHash: string }) =>
          nameHash.localeCompare(currentLink.sharedFile.nameHash) === 0
            ? true
            : false
      );
      if (secondFileId === -1 && ownFileId === -1) {
        const user = await User.findById(req.user._id);
        currentLink.sharedFile.allowedPeople.push(user._id);
        user.secondFiles.push(currentLink.sharedFile);
        const owner = await User.findById(currentLink.sharedFile.ownerId);
        owner.ownFiles.forEach((element, index, array) => {
          if (
            element.nameHash.localeCompare(currentLink.sharedFile.nameHash) ===
            0
              ? true
              : false
          ) {
            owner.ownFiles[index].allowedPeople.push(user._id);
          }
        });
        owner.save();

        user.save();

        Link.deleteOne({ _id: currentLink._id }, (err) => {
          if (err) {
            throw err;
          }
        });
      }
    }
  }

  res.redirect(
    process.env.NODE_ENV
      ? 'http://lenote.herokuapp.com/'
      : 'http://localhost:3000/'
  );
});

export default router;
