const express = require('express')

const UserModel = require('../models/user')
const AuthorModel = require('../models/author')
const BookModel = require('../models/book')
const RatingModel = require('../models/rating')
const ReviewModel = require('../models/review')
const CategoryModel = require('../models/category')

const mongoose = require('mongoose')   

const Router = express.Router()