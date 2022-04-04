const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { bookService } = require('../services');

const createBook = catchAsync(async(req, res) => {
    //Use the name of the input field (i.e. "image") to retrieve the uploaded file
    let photo = req.files.image;

    let name = +Math.floor(Math.random() * 1000000000) + photo.name

    //Use the mv() method to place the file in upload directory (i.e. "uploads")
    photo.mv('./uploads/' + name);

    var obj = {
        image: name,
        title: req.body.title,
        isbn: req.body.isbn,
        published: req.body.published,
        publisher: req.body.publisher,
        category: req.body.category,
        description: req.body.description,
        author: req.body.author
    }

    const book = await bookService.createBook(obj);
    res.status(httpStatus.CREATED).send({
        status: true,
        message: 'Book created successfully',
        data: book
    });
});

const getBooks = catchAsync(async(req, res) => {
    const filter = pick(req.query, ['title']);
    const options = pick(req.query, ['sortBy', 'limit', 'page']);
    const result = await bookService.queryBooks(filter, { limit: 20, sortBy: 'createdAt:desc' });
    res.send({
        status: true,
        message: 'Books fetched successfully',
        data: result
    });
});

const getBook = catchAsync(async(req, res) => {
    const book = await bookService.getBookById(req.params.bookId);
    if (!book) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Book not found');
    }
    res.send({
        status: true,
        message: 'Book fetched successfully',
        data: book
    });
});

const updateBook = catchAsync(async(req, res) => {
    const book = await bookService.updateBookById(req.params.bookId, req.body);
    res.send({
        status: true,
        message: 'Book updated successfully',
        data: book
    });
});

const deleteBook = catchAsync(async(req, res) => {
    await bookService.deleteBookById(req.params.bookId);
    res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
    createBook,
    getBooks,
    getBook,
    updateBook,
    deleteBook,
};
