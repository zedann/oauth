const router = require('express').Router();

const passport = require('passport')

router.get('/login/failed', (req, res, next) => {
  res.status(401).json({
    error: true,
    message: "log in failed"
  })
})

router.get('/login/success', (req, res, next) => {
  req.user ? res.status(200).json({
    error: false,
    message: "successfuly logged in",
    user: req.user
  }) : res.status(403).json({
    error: true,
    message: "not authorized"
  })
})

router.get("/google/callback", passport.authenticate("google", {
  successRedirect: process.env.CLIENT_URL,
  failureRedirect: "/login/failed"
}))

router.get("/google", passport.authenticate("google", ["profile", "email"]))

router.get("/logout", (req, res, next) => {
  req.logout()
  res.redirect(process.env.CLIENT_URL)
})

module.exports = router;
