const firebaseApp = require("../config/firebaseMoudule");
const expoess = require("express");
const router = expoess.Router();
const Fauth = firebaseApp.auth();

router.get("/helloworld", (req, res) => {
  const email = "abc@abc.com";
  const password = "12345678";
  Fauth.createUser({
    email: email,
    password: password,
  })
    .then((credential) => {
      const { uid } = credential;
      console.log(uid);
    })
    .catch((err) => {
      console.log(err);
    });
  res.json({
    meg: "welcome world",
  });
});
module.exports = router;
