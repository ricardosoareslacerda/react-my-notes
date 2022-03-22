import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Board } from '.'

const app = () => express(apiRoot, routes)

let userSession, anotherSession, board

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const anotherUser = await User.create({ email: 'b@b.com', password: '123456' })
  userSession = signSync(user.id)
  anotherSession = signSync(anotherUser.id)
  board = await Board.create({ owner: user })
})

test('POST /boards 201 (user)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession, name: 'test', tags: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.name).toEqual('test')
  expect(body.tags).toEqual('test')
  expect(typeof body.owner).toEqual('object')
})

test('POST /boards 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /boards 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
  expect(typeof body[0].owner).toEqual('object')
})

test('GET /boards 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /boards/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${board.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(board.id)
  expect(typeof body.owner).toEqual('object')
})

test('GET /boards/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${board.id}`)
  expect(status).toBe(401)
})

test('GET /boards/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /boards/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${board.id}`)
    .send({ access_token: userSession, name: 'test', tags: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(board.id)
  expect(body.name).toEqual('test')
  expect(body.tags).toEqual('test')
  expect(typeof body.owner).toEqual('object')
})

test('PUT /boards/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${board.id}`)
    .send({ access_token: anotherSession, name: 'test', tags: 'test' })
  expect(status).toBe(401)
})

test('PUT /boards/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${board.id}`)
  expect(status).toBe(401)
})

test('PUT /boards/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: anotherSession, name: 'test', tags: 'test' })
  expect(status).toBe(404)
})

test('DELETE /boards/:id 204 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${board.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(204)
})

test('DELETE /boards/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${board.id}`)
    .send({ access_token: anotherSession })
  expect(status).toBe(401)
})

test('DELETE /boards/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${board.id}`)
  expect(status).toBe(401)
})

test('DELETE /boards/:id 404 (user)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: anotherSession })
  expect(status).toBe(404)
})
