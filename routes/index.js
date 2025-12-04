const router = require('express').Router();
const passport = require('passport');

router.use('/', require('./swagger'));

router.get('/', (req, res) => {
  //swagger.tags-['Hello World']
  res.send('Hello World');
});

router.use('/users', require("./users"));
router.use('/tasks', require("./tasks"));
router.use('/goals', require("./goals"));

//Auth Redirect to Github 
router.get('/login', passport.authenticate('github'), (req, res) => {});

router.get('/github/callback', passport.authenticate('github', {
    failureRedirect: '/api-docs'
  }),
  (req, res) => {
    req.session.user = req.user;
    res.redirect('/');
  }
);

// Logout
router.get('/logout', function (req, res, next) {
  req.logout(function(err) {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
});

module.exports = router;