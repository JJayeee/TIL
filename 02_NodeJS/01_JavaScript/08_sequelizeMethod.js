// async await
async (req, res, next) => {
  const tag = await Hashtag.find({ where: { title: '노드' }});
  const posts = await tag.getPosts();
};

// promise
Hashtag.find({ where: { title: '노드' }})
  .then(tag => tag.getPosts())
  .then(posts => console.log(posts));


// async await 
router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.render('sequelize', { users });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// promise 
router.get('/', function(req, res, next) {
  User.findAll()
    .then((users) => {
      res.render('sequelize', { users });
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });
});