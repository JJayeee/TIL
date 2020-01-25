var express = require('express');
var { User, Comment } = require('../models');

var router = express.Router();

router.get('/:id', function(req, res, next) {
  Comment.findAll({
    include: {
      model: User,
      where: { id: req.params.id },
    },
  })
    .then((comments) => {
      console.log(comments);
      res.json(comments);
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });
});

router.post('/', function(req, res, next) {
  Comment.create({
    commenter: req.body.id,
    comment: req.body.comment,
  })
    .then((result) => {
      console.log(result);
      res.status(201).json(result);
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });
});

router.patch('/:id', function(req, res, next) {
  Comment.update({ comment: req.body.comment }, { where: { id: req.params.id }})
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });
});

router.delete('/:id', function(req, res, next) {
  Comment.destroy({ where: { id: req.params.id }})
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });
});

module.exports = router;

/*
  Executing (default): 
  SELECT 
    `comment`.`id`, `comment`.`comment`, 
    `comment`.`created_at`, `comment`.`commenter`, 
    `user`.`id` AS `user.id`, `user`.`name` AS `user.name`, 
    `user`.`age` AS `user.age`, `user`.`married` AS `user.married`, 
    `user`.`comment` AS `user.comment`, 
    `user`.`created_at` AS `user.created_at` 
  FROM 
    `comments` AS `comment`
  INNER JOIN 
    `users` AS `user` 
  ON 
    `comment`.`commenter` = `user`.`id`
  AND 
    `user`.`id` = '1';
*/