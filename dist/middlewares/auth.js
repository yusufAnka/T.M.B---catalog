"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Model = require('../models/users');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const protect = asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let token = req.cookies.Token;
    if (token) {
        try {
            // Verify token
            if (process.env.JWT_SECRET) {
                yield jwt.verify(token, process.env.JWT_SECRET);
                next();
            }
        }
        catch (error) {
            res.status(401);
            throw new Error('Not authorized');
        }
    }
    else if (req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1];
            // Verify token
            yield jwt.verify(token, process.env.JWT_SECRET);
            next();
        }
        catch (error) {
            res.status(401);
            throw new Error('Not authorized');
        }
    }
    if (!token) {
        res.status(401);
        throw new Error('Not authorized, no token');
    }
}));
const adminProtect = asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let token = req.cookies.Token;
    if (token) {
        try {
            if (process.env.JWT_SECRET) {
                yield jwt.verify(token, process.env.JWT_SECRET);
                const user = yield Model.find({ _id: req.cookies.Uid });
                if (req.cookies.Type === 'Admin' && user[0].Admin) {
                    next();
                }
            }
        }
        catch (error) {
            res.status(401);
            throw new Error('Not authorized as Admin');
        }
    }
    else if (req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            yield jwt.verify(token, process.env.JWT_SECRET);
            if (req.cookies.Type === 'Admin') {
                next();
            }
        }
        catch (error) {
            res.status(401);
            throw new Error('Not authorized  as Admin');
        }
    }
    if (!token) {
        res.status(401);
        throw new Error('Not authorized, no token');
    }
}));
module.exports = { protect, adminProtect };
