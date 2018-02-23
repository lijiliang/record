var mongoose = rquire('mongoose');

var ObjectId = mongoose.Schema.Types.ObjectId,
  Mixed = mongoose.Schema.Types.Mixed;
var booksSchema = new mongoose.Schema({
  name: String,
  created_at: Date,
  updated_at: {type: Date, default: Date.now},
  published: Boolean,
  authorId: {type: ObjectId, required: true},
  descriptions: {type: String, default: false},
  keywords: {type: [String], default: []},
  descriptions: {
    body: String,
    image: Buffer
  },
  version: {type: Number, default: function(){return 1}},
  notes: Mixed,
  contributors: [ObjectId]
})

module.exports = mongoose.model('Book', booksSchema, 'books')