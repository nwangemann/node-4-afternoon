const swag = require('../models/swag');

module.exports = {
    add: (req, res, next) => {
        const {id} = req.params
        const index = swag.findIndex(swag => swag.id == id);
        if(index !== -1){
            let item = swag[index];
            req.session.user.cart.push(item)
            req.session.user.total += item.price
        }
        res.status(200).send(req.session.user)
    },
    delete: (req, res, next) => {
        const {id} = req.params
        const index = req.session.user.cart.findIndex(swag => swag.id == id)
        const item = swag.find(swag => swag.id == id);
        if (index !== -1){
            req.session.user.cart.splice(index, 1);
            req.session.user.total -= item.price
        }
        res.status(200).send(req.session.user)
    },
    checkout: (req, res, next) => {
        req.session.user.cart = []
        req.session.user.total = 0
        res.status(200).send(req.session.user)
    }
}