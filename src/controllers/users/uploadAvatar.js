// const path = require('path');
const fs = require('fs/promises');
const Jimp = require('jimp');
const { User } = require('../../models');

const uploadAvatar = async (req, res, next) => {
  const { path } = req.file;
  const { _id } = req.user;
  const [, extension] = req.file.originalname.split('.');

  const avatarName = `${_id}-avatar.${extension}`;

  await (await Jimp.read(path))
    .resize(250, 250)
    .quality(60)
    .write(`./public/avatars/${avatarName}`);

  await fs.unlink(path);

  const avatarUrl = `/avatars/${avatarName}`;

  const updatedUser = await User.findByIdAndUpdate(
    _id,
    { avatarURL: avatarUrl },
    { new: true }
  );

  res.json({
    avatarURL: updatedUser.avatarURL,
  });
};

module.exports = uploadAvatar;
