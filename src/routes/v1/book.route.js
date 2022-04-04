const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const bookValidation = require('../../validations/book.validation');
const bookController = require('../../controllers/book.controller');

const router = express.Router();

router
    .route('/')
    .post(auth('manageBooks'), validate(bookValidation.createBook), bookController.createBook)
    .get(validate(bookValidation.getBooks), bookController.getBooks);

router
    .route('/:bookId')
    .get(auth('getBooks'), validate(bookValidation.getBook), bookController.getBook)
    .patch(auth('manageBooks'), validate(bookValidation.updateBook), bookController.updateBook)
    .delete(auth('manageBooks'), validate(bookValidation.deleteBook), bookController.deleteBook);

module.exports = router;
