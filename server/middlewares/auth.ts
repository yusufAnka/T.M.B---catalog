import { NextFunction, Request, Response } from "express";
const Model = require('../models/users')
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')


const protect = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  let token = req.cookies.Token

  if (token) {
    try {
      // Verify token
      if (process.env.JWT_SECRET){
        await jwt.verify(token, process.env.JWT_SECRET);
        next();
      }
    } catch (error) {
      res.status(401)
      throw new Error('Not authorized')
    }

  } else if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1]

      // Verify token
      await jwt.verify(token, process.env.JWT_SECRET)
      next()
    } catch (error) {
      res.status(401)
      throw new Error('Not authorized')
    }
  }

  if (!token) {
    res.status(401)
    throw new Error('Not authorized, no token')
  }
})

const adminProtect = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  let token = req.cookies.Token

  if (token) {
    try {
      if (process.env.JWT_SECRET){
        await jwt.verify(token, process.env.JWT_SECRET);
        const user = await Model.find({_id: req.cookies.Uid})
        if (req.cookies.Type === 'Admin' && user[0].Admin) {
          next();
        } 
      }
    } catch (error) {
      res.status(401)
      throw new Error('Not authorized as Admin')
    }

  } else if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1]
      await jwt.verify(token, process.env.JWT_SECRET)
      if (req.cookies.Type === 'Admin') {
        next();
      }
    } catch (error) {
      res.status(401)
      throw new Error('Not authorized  as Admin')
    }
  }

  if (!token) {
    res.status(401)
    throw new Error('Not authorized, no token')
  }
})

module.exports = { protect, adminProtect }