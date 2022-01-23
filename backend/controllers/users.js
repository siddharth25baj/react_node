// const db = require('../models')
const Message = require('../constants/error-message')
const MessageCode = require('../constants/status-message')
const { Response } = require('../constants/common-response')
const db = require('../db')

module.exports.createUser = async (req, res) => {
     try {
          let info = req.body
          await db.user.createUser(info)
          return Response.commonResponse(res, MessageCode.HTTP_CREATED, Message.SUCCESS)
     } catch (e) {
          return Response.commonResponse(res, MessageCode.INTERNAL_ERROR, Message.INTERNAL_SERVER)
     }
}

module.exports.getAllUsers = async (req, res) => {
     try {
          let allUsers = await db.user.getAllUser()
          return Response.commonResponse(res, MessageCode.HTTP_CREATED, Message.SUCCESS, allUsers)
     } catch (e) {
          return Response.commonResponse(res, MessageCode.INTERNAL_ERROR, Message.INTERNAL_SERVER)
     }
}

module.exports.getUserDetails = async (req, res) => {
     try {
          let id = req.params.id
          let userDeatils = await db.user.getUser(id)
          return Response.commonResponse(res, MessageCode.HTTP_CREATED, Message.SUCCESS, userDeatils)
     } catch (e) {
          return Response.commonResponse(res, MessageCode.INTERNAL_ERROR, Message.INTERNAL_SERVER)
     }
}

module.exports.updateUserDetails = async (req, res) => {
     try {
          let id = req.params.id
          let info = req.body
          await db.user.updateUser(id, info)
          return Response.commonResponse(res, MessageCode.HTTP_CREATED, Message.SUCCESS)
     } catch (e) {
          return Response.commonResponse(res, MessageCode.INTERNAL_ERROR, Message.INTERNAL_SERVER)
     }
}

module.exports.deteleUser = async (req, res) => {
     try {
          let id = req.params.id
          await db.user.removeUser(id)
          return Response.commonResponse(res, MessageCode.HTTP_CREATED, Message.SUCCESS)
     } catch (e) {
          return Response.commonResponse(res, MessageCode.INTERNAL_ERROR, Message.INTERNAL_SERVER)
     }
}