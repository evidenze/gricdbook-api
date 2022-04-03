const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createBook = {
    body: Joi.object().keys({
        title: Joi.string().required(),
        isbn: Joi.string().required(),
        published: Joi.number().required(),
        publisher: Joi.string().required(),
        description: Joi.string().required(),
        author: Joi.string().required(),
        category: Joi.string().required(),
    }),
};

const getBooks = {
    query: Joi.object().keys({
        title: Joi.string(),
        sortBy: Joi.string(),
        limit: Joi.number().integer(),
        page: Joi.number().integer(),
    }),
};

const getBook = {
    params: Joi.object().keys({
        bookId: Joi.string().custom(objectId),
    }),
};

const updateBook = {
    params: Joi.object().keys({
        bookId: Joi.required().custom(objectId),
    }),
    body: Joi.object()
        .keys({
            title: Joi.string().required(),
            isbn: Joi.string().required(),
            published: Joi.number().required(),
            publisher: Joi.string().required(),
            description: Joi.string().required(),
            author: Joi.string().required(),
            category: Joi.string().required(),
            image: Joi.required()
        })
        .min(1),
};

const deleteBook = {
    params: Joi.object().keys({
        bookId: Joi.string().custom(objectId),
    }),
};

module.exports = {
    createBook,
    getBooks,
    getBook,
    updateBook,
    deleteBook,
};