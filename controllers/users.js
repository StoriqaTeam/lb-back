const User = require('../models').User;

module.exports = {
    list(req, res) {
        return User
            .all()
            .then(users => res.status(200).send(users))
            .catch(error => res.status(400).send(error));
    },
    get(req, res) {
        return User
            .findById(req.params.id)
            .then(user => {
                if (!user) {
                    return res.status(404).send({
                        message: 'User Not Found',
                    });
                }
                return res.status(200).send(product);
            })
            .catch(error => res.status(400).send(error));
    },
    // create(req, res) {
    //     return User
    //         .create({
    //             name: req.body.name,
    //             price: req.body.price,
    //         })
    //         .then(product => {
    //             let clients = req.app.scServer.clients;
    //             Object.keys(clients).forEach(function (key) {
    //                 clients[key].emit('productChanges', {action: 'create', data: product});
    //             });
    //             res.status(201).send(product);
    //         })
    //         .catch(error => res.status(400).send(error));
    // },
    // update(req, res) {
    //     return Product
    //         .findById(req.params.id)
    //         .then(product => {
    //             if (!product) {
    //                 return res.status(404).send({
    //                     message: 'Product Not Found',
    //                 });
    //             }
    //             return product
    //                 .update({
    //                     name: req.body.name || product.name,
    //                     price: req.body.price || product.price,
    //                 })
    //                 .then(() => {
    //                     let clients = req.app.scServer.clients;
    //                     Object.keys(clients).forEach(function (key) {
    //                         clients[key].emit('productChanges', {action: 'update', data: product});
    //                     });
    //                     res.status(200).send(product);
    //                 })
    //                 .catch((error) => res.status(400).send(error));
    //         })
    //         .catch((error) => res.status(400).send(error));
    // },
    destroy(req, res) {
        return User
            .findById(req.params.id)
            .then(user => {
                if (!user) {
                    return res.status(400).send({
                        message: 'User Not Found',
                    });
                }
                return user
                    .destroy()
                    .then(() => res.status(200).send({ message: 'User deleted.' }))
                    .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error));
    }
};