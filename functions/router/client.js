const firebaseApp = require("../config/firebaseMoudule");

const express = require("express");
const router = express.Router();
const Fauth = firebaseApp.auth();
const Fdatabase = firebaseApp.database();

router.post("/user/new", (req, res) => {
  const { email, password, nickname } = req.body;

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

      Fdatabase.ref(`statics/nicknames/${uid}`).set(nickname),
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

router.post("/feed/new", (req, res) => {
  const { feed, profile, timestamp } = req.body;
  const { uid } = profile;
  Fdatabase.ref("feed")
    .push({
      feed,
      profile,
      timestamp,
    })
    .then((snapshot) => {
      const fid = snapshot.key; // 무작위의 키다 만들어진 후에 그 키를 반환
      Fdatabase.ref(`users/${uid}/feed`)
        .push({
          //유저가자기 글을 가지고 올때 필요
          fid,
        })
        .then(() => {
          res.status(200).json({
            msg: "피드가 올라갔습니다",
          });
        })
        .catch((err) => {
          res.status(400).json({
            err,
          });
        });
    })
    .catch((err) => {
      res.status(400).json({
        err,
      });
    }); //catch
}); //post
module.exports = router;
