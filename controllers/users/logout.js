const login = async (req, res, next) => {
  const { _id } = req.user;
  console.log(req.user);
  console.log(_id);

  res.json({
    ok: true,
  });
};

module.exports = login;
