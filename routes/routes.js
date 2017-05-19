var router = require('express').Router();

router.get('/', (req, res) => {
  res.render('index', {title: "Steve th3 Chatter!"});
});

module.exports = router;