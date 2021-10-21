import express from 'express';
import md5 from 'md5';
import Link from '../models/Schema/shareLinkSchema';

const router = express.Router();
/**
 * create link for sharing in DB and send as answer ro client
 */
router.get('/:nameHash', async (req, res) => {
  if (!req.user) {
    res.sendStatus(401);
    return;
  }

  const fileid = req.user.ownFiles.findIndex(
    (element: { nameHash: string }) => element.nameHash === req.params.nameHash
  );

  if (fileid === -1) {
    res.sendStatus(204);
    return;
  }

  const currentLink = await Link.findOne(
    { _id: md5(req.params.nameHash) },
    { __v: 0 }
  );

  if (currentLink) {
    currentLink.createdAt = Date.now();
    currentLink.save();
    res.send({
      status: 'updated',
      link: currentLink._id,
      expires: 86400,
    });
  } else {
    new Link({
      _id: md5(req.params.nameHash),
      sharedFile: req.user.ownFiles[fileid],
      createdAt: Date.now(),
    })
      .save()
      .then((newLink) => {
        res.send({
          status: 'created',
          link: newLink._id,
          expires: 86400,
        });
      });
  }
});

/**
 * delete link in DB and send 200 status
 */
router.delete('/:nameHash', async (req, res) => {
  if (!req.user) {
    res.sendStatus(401);
    return;
  }

  const fileid = req.user.ownFiles.findIndex(
    (element: { nameHash: string }) => element.nameHash === req.params.nameHash
  );
  if (fileid === -1) {
    res.sendStatus(204);
    return;
  }

  const currentLink = await Link.findOne(
    { _id: md5(req.params.nameHash) },
    { __v: 0 }
  );

  if (currentLink) {
    Link.deleteOne({ _id: currentLink._id }, (err) => {}).then(
      res.sendStatus(200)
    );
  }
});
export default router;
