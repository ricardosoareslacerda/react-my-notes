import mongoose, { Schema } from 'mongoose'

const boardSchema = new Schema({
  owner: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String
  },
  tags: [{
    type: String
  }]
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

boardSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      owner: this.owner.view(full),
      name: this.name,
      tags: this.tags,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Board', boardSchema)

export const schema = model.schema
export default model
