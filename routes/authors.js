var express = require('express');
var router = express.Router();
var Author = require('../models/author');
const upload = require('../middlewares/imageUpload')
const authUser = require('../middlewares/authMWare')



router.get('/', async(req, res) => {
    try {
        let authors = await Author.find({}).populate('author');
        res.json({
            message: "Authors list",
            data: authors
        });
    } catch (err) {
        return res.status(403).send({ message: 'can not get all authors' })
    }
});


router.post('/', authUser, async(req, res) => {
    if (!req.user.isAdmin) {
        return res.status(401).send({ message: "you can not do this only admins" })
    }
    try {
        upload(req, res, async(err) => {
            try {
                if (req.file == undefined) {
                    return res.status(400).send({ message: "Enter author image" })
                } else {
                    const image = req.file.filename
                    const { firstName, lastName, dob } = req.body
                    let author = await Author.create({ firstName, lastName, dob, image });
                    res.json({
                        message: "author added successfully",
                        data: author
                    });
                }
            } catch (err) {
                return res.status(403).send({ message: 'Failed, check entered data !!' });
            }
        })
    } catch (err) {
        return res.status(403).send({ message: 'Failed, check entered data !!' })
    }
});


router.get('/:id', async(req, res) => {
    try {
        let author = await Author.findOne({ _id: req.params.id }).populate('books');
        res.json({
            message: "authors details",
            data: author
        });
    } catch (err) {
        return res.status(404).send({ message: 'can not get author !!' })
    }
});


router.patch('/:id', authUser, async(req, res) => {
    if (!req.user.isAdmin) {
        return res.status(401).send({ message: "you can not do this only admins" })
    }
    try {
        const author = await Author.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true });
        res.json({
            message: "author updated successfully",
            data: author
        });

    } catch (err) {
        res.status(403).send({ message: 'author Updated Failed' });
    }
});


router.delete('/:id', authUser, async(req, res) => {
    if (!req.user.isAdmin) {
        return res.status(401).send({ message: "you can not do this only admins" })
    }
    try {
        let author = await Author.findByIdAndRemove(req.params.id);
        res.json({
            message: "author removed successfully",
            data: author
        });
    } catch (err) {
        res.status(403).send({ message: 'author removed Failed' });
    }
});





module.exports = router;