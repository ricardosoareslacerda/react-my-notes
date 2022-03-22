import { Note } from '.'
import { User } from '../user'

let user, note

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  note = await Note.create({ user, name: 'test', description: 'test', board: 'test', tags: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = note.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(note.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.name).toBe(note.name)
    expect(view.description).toBe(note.description)
    expect(view.board).toBe(note.board)
    expect(view.tags).toBe(note.tags)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = note.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(note.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.name).toBe(note.name)
    expect(view.description).toBe(note.description)
    expect(view.board).toBe(note.board)
    expect(view.tags).toBe(note.tags)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
