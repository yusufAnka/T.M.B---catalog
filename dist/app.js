"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const dotenv = require('dotenv').config();
const { connectDB } = require('./mongoose/db');
connectDB();
const { errorHandler } = require('./middlewares/errorHandler');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const pagesRouter = require('./routes/pages');
const app = express();
// view engine setup
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "ejs");
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../public")));
app.use(methodOverride('_method'));
app.use('/', pagesRouter);
app.use('/api/products', indexRouter);
app.use('/users', usersRouter);
app.use(errorHandler);
app.use((req, res, next) => {
    res.status(404).render("404", {
        title: "Error",
        token: req.cookies.Token || "0",
        uid: req.cookies.Uid || "0",
        user: req.cookies.Username || "0",
        Type: req.cookies.Type || "none",
        message: "OOPS, page not found :)",
    });
    next();
});
exports.default = app;
