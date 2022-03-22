import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Note } from '.'

const app = () => express(apiRoot, routes)

let userSession, anotherSession, note

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const anotherUser = await User.create({ email: 'b@b.com', password: '123456' })
  userSession = signSync(user.id)
  anotherSession = signSync(anotherUser.id)
  note = await Note.create({ user })
})

test('POST /notes 201 (user)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession, name: 'test', description: 'test', board: 'test', tags: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.name).toEqual('test')
  expect(body.description).toEqual('test')
  expect(body.board).toEqual('test')
  expect(body.tags).toEqual('test')
  expect(typeof body.user).toEqual('object')
})

test('POST /notes 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /notes 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
  expect(typeof body[0].user).toEqual('object')
})

test('GET /notes 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /notes/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${note.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(note.id)
  expect(typeof body.user).toEqual('object')
})

test('GET /notes/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${note.id}`)
  expect(status).toBe(401)
})

test('GET /notes/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /notes/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${note.id}`)
    .send({ access_token: userSession, name: 'test', description: 'test', board: 'test', tags: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(note.id)
  expect(body.name).toEqual('test')
  expect(body.description).toEqual('test')
  expect(body.board).toEqual('test')
  expect(body.tags).toEqual('test')
  expect(typeof body.user).toEqual('object')
})

test('PUT /notes/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${note.id}`)
    .send({ access_token: anotherSession, name: 'test', description: 'test', board: 'test', tags: 'test' })
  expect(status).toBe(401)
})

test('PUT /notes/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${note.id}`)
  expect(status).toBe(401)
})

test('PUT /notes/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: anotherSession, name: 'test', description: 'test', board: 'test', tags: 'test' })
  expect(status).toBe(404)
})

test('DELETE /notes/:id 204 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${note.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(204)
})

test('DELETE /notes/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${note.id}`)
    .send({ access_token: anotherSession })
  expect(status).toBe(401)
})

test('DELETE /notes/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${note.id}`)
  expect(status).toBe(401)
})

test('DELETE /notes/:id 404 (user)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: anotherSession })
  expect(status).toBe(404)
})
