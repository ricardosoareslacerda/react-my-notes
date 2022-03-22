import { Board } from '.'
import { User } from '../user'

let user, board

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  board = await Board.create({ owner: user, name: 'test', tags: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = board.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(board.id)
    expect(typeof view.owner).toBe('object')
    expect(view.owner.id).toBe(user.id)
    expect(view.name).toBe(board.name)
    expect(view.tags).toBe(board.tags)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = board.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(board.id)
    expect(typeof view.owner).toBe('object')
    expect(view.owner.id).toBe(user.id)
    expect(view.name).toBe(board.name)
    expect(view.tags).toBe(board.tags)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
