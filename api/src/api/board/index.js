import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Board, { schema } from './model'

const router = new Router()
const { name, tags } = schema.tree

/**
 * @api {post} /boards Create board
 * @apiName CreateBoard
 * @apiGroup Board
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam name Board's name.
 * @apiParam tags Board's tags.
 * @apiSuccess {Object} board Board's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Board not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ name, tags }),
  create)

/**
 * @api {get} /boards Retrieve boards
 * @apiName RetrieveBoards
 * @apiGroup Board
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} boards List of boards.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: true }),
  query(),
  index)

/**
 * @api {get} /boards/:id Retrieve board
 * @apiName RetrieveBoard
 * @apiGroup Board
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} board Board's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Board not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /boards/:id Update board
 * @apiName UpdateBoard
 * @apiGroup Board
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam name Board's name.
 * @apiParam tags Board's tags.
 * @apiSuccess {Object} board Board's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Board not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ name, tags }),
  update)

/**
 * @api {delete} /boards/:id Delete board
 * @apiName DeleteBoard
 * @apiGroup Board
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Board not found.
 * @apiError 401 user access only.
 */
router.delete('/:id',
  token({ required: true }),
  destroy)

export default router
