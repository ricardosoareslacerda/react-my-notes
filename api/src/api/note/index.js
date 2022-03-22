import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Note, { schema } from './model'

const router = new Router()
const { name, description, board, tags } = schema.tree

/**
 * @api {post} /notes Create note
 * @apiName CreateNote
 * @apiGroup Note
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam name Note's name.
 * @apiParam description Note's description.
 * @apiParam board Note's board.
 * @apiParam tags Note's tags.
 * @apiSuccess {Object} note Note's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Note not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ name, description, board, tags }),
  create)

/**
 * @api {get} /notes Retrieve notes
 * @apiName RetrieveNotes
 * @apiGroup Note
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} notes List of notes.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: true }),
  query(),
  index)

/**
 * @api {get} /notes/:id Retrieve note
 * @apiName RetrieveNote
 * @apiGroup Note
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} note Note's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Note not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /notes/:id Update note
 * @apiName UpdateNote
 * @apiGroup Note
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam name Note's name.
 * @apiParam description Note's description.
 * @apiParam board Note's board.
 * @apiParam tags Note's tags.
 * @apiSuccess {Object} note Note's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Note not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ name, description, board, tags }),
  update)

/**
 * @api {delete} /notes/:id Delete note
 * @apiName DeleteNote
 * @apiGroup Note
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Note not found.
 * @apiError 401 user access only.
 */
router.delete('/:id',
  token({ required: true }),
  destroy)

export default router
