const User = require('../models/user');
const Message = require('../models/message');
const Img = require('../models/image');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

User.hasMany(Message, {foreignKey: 'msg_id'});
User.hasMany(Img, {foreignKey: 'img_id'});

exports.signup = (req, res) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            User.create({
                image_url: req.body.image_url,
                pseudo: req.body.pseudo,
                email: req.body.email,
                is_admin: req.body.is_admin,
                likes: 0,
                dislikes: 0,
                usersLiked: [],
                usersDisliked: [],
                password: hash
            })
            .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
            .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

exports.signin = async (req, res, next) => {
    await User.findOne({ 
      where: {
          email: req.body.email
      }
    }).then(user => {
        if (!user) {
          return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
        bcrypt.compare(req.body.password, user.password)
          .then(valid => {
      console.log(req.body.password);

            if (!valid) {
              return res.status(401).json({ error: 'Mot de passe incorrect !' });
            }
            res.status(200).json({
                user_id: user.id,
                is_admin: user.is_admin,
                token: jwt.sign(
                    { user_id: user.id },
                    process.env.JWT_SECRET_KEY,
                    { expiresIn: '24h' }
                )});  
          }).catch(error => res.status(401).json({ error }))
      }).catch(error => res.status(500).json({ error }));
};

exports.getOneUser = (req, res) => {
    User.findOne({
        where: {
            id: req.params.id
        }
    })
    .then(
        (user) => {
            res.status(200).json(user);
        })
    .catch(
        (error) => {
            res.status(404).json({
                error: error
            });
        });
};

exports.getAllUsers = (req, res) => {
    User.findAll({})
    .then((users) => res.status(200).json(users))
    .catch(error => res.status(400).json(error));
};

exports.modifyUser = async (req, res, next) => {
    const id = req.params.id;
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userId = decodedToken.user_id;
  
    if(id === userId) {
      User.findOne({
        where: {id: req.params.id}
      }).then(
        user => {
          if (req.file) {
            if (user.image_url !== null) {
              const fileName = user.image_url.split('/images/')[1]
              false.unlink(`images/${fileName}`, (err => {
                if (err) {console.log(err)};
              }))
            }
            req.body.image_url = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
          }
          delete(req.body.is_admin);
          user.update({
            ...req.body,
            where: {
              id: req.params.id
            }
          }).then(
            (user) => {res.status(200).json(user), console.log(user)}
          ).catch(
            error => res.status(400).json({error})
          )
        }
      ).catch(
        error => res.status(404).json({error})
      )
    }
};

exports.deleteUser = async (req, res, next) => {
    await User.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(() => res.status(201).json({ message: 'User deleted !' }))
    .catch(error => res.status(400).json({ error }));
};