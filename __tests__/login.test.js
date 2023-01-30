/* eslint-disable no-undef */
require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = require('../src/controllers/users/login');
const { User } = require('../src/models');

describe('Login controller test', () => {
  it('should sign in', async () => {
    const user = {
      _id: 'sd53g4s6d',
      email: 'test@mail.com',
      password: await bcrypt.hash('test123aA', await bcrypt.genSalt()),
      subscription: 'starter',
      token: null,
    };
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    const mReq = {
      body: { email: 'test@mail.com', password: 'test123aA' },
    };

    let mRes = {
      json(qwe) {
        mRes = { ...mRes, ...qwe, token };
      },
    };

    jest.spyOn(User, 'findOne').mockImplementationOnce(() => user);
    jest.spyOn(User, 'findByIdAndUpdate').mockImplementationOnce(() => token);

    await login(mReq, mRes);

    expect(mRes.token).toEqual(token);
    expect(mRes.user.email).toEqual(user.email);
    expect(mRes.user.subscription).toEqual(user.subscription);
  });
});
