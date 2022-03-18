const firebaseApp = require("../config/firebaseMoudule");

const express = require("express");
const router = express.Router();
const Fauth = firebaseApp.auth();
const Fdatabase = firebaseApp.database();

router.post("/user/new", (req, res) => {
  const { email, password, nickname } = req.body;

  console.log(email, password, nickname);

  Fauth.createUser({
    email: email,
    password: password,
    displayName: nickname,
  }).then((credential) => {
    const { uid } = credential;

    Promise.all([
      Fdatabase.ref(`users/${uid}/profile`).set({
        email: email,
        nickname: nickname,
        timestamp: Date.now(),
      }),

      Fdatabase.ref(`statics/nicknames/${uid}`).set({ nickname }),
    ])
      .then(() => {
        res.status(200).json({
          msg: "유저가 만들어졌습니다.",
        });
      })
      .catch((err) => {
        res.status(400).json({
          err,
        });
      });
  });
});
module.exports = router;
