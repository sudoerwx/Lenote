import express from 'express';
import md5 from 'md5';
import { createFile, deleteFile } from '../sockets/sharedbWs';
import User from '../models/Schema/userSchema';

const router = express.Router();
/**
 * create file and  send all user file
 */
router.post('/:file', async (req, res) => {
  if (!req.user) {
    res.sendStatus(401);
    return;
  }

  const user = await User.findById(req.user._id);
  user.ownFiles.push({
    name: req.params.file,
    nameHash: md5(req.params.file + user._id),
    ownerId: user._id,
    ownerName: user.name,
    allowedPeople: [],
  });
  user.save();
  createFile(user.ownFiles[user.ownFiles.length - 1].nameHash);
  res.send(user.ownFiles[user.ownFiles.length - 1].nameHash);
});

/**
 * delete file and send 200 code
 */
router.delete('/:file', async (req, res) => {
  if (!req.user) {
    res.sendStatus(401);
    return;
  }

  const user = await User.findById(req.user._id);
  let ownFileIndex = user.ownFiles.findIndex((element) =>
    element.nameHash.localeCompare(req.params.file) === 0 ? true : false
  );
  let ownFile = user.ownFiles[ownFileIndex];
  let ownFileId = ownFile && ownFile.nameHash;
  let secondFileIndex = user.secondFiles.findIndex((element) =>
    element.nameHash.localeCompare(req.params.file) === 0 ? true : false
  );
  let secondFile = user.secondFiles[secondFileIndex];
  let secondFileId = secondFile && secondFile.nameHash;
  if (!ownFileId && !secondFileId) return;
  if (ownFileId) {
    user.ownFiles[ownFileIndex].allowedPeople.forEach(async (element) => {
      const allowedUser = await User.findById(element);
      allowedUser.secondFiles.forEach((file, i) => {
        if (file.nameHash.localeCompare(ownFileId) === 0 ? true : false) {
          allowedUser.secondFiles.splice(i, 1);
        }
        allowedUser.save();
      });
    });
    deleteFile(ownFileId);
    user.ownFiles.splice(ownFileIndex, 1);
  } else {
    let x = 1;
    const owner = await User.findById(
      user.secondFiles[secondFileIndex].ownerId
    );
    owner.ownFiles.forEach((file, i) => {
      if (file.nameHash.localeCompare(secondFileId) === 0 ? true : false) {
        owner.ownFiles[i].allowedPeople.forEach((element, peopleIndex) => {
          if (element === user._id) {
            owner.ownFiles[i].allowedPeople.splice(peopleIndex, 1);
          }
        });
      }
      owner.save();
    });
    user.secondFiles.splice(secondFileIndex, 1);
  }
  user.save();
  res.sendStatus(200);
});
export default router;
