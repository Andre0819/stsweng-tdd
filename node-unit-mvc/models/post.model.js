const mongoose = require('./connection');

const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    date: { type: Date, default: Date.now },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true }
  }
);

const Post = mongoose.model('posts', postSchema);

exports.createPost = (obj, next) => {
    const post = new Post(obj);

    post.save(function(err, post) {
        next(err, post)
    }) 
}

exports.updatePost = (postId, updatedData, next) => {
    Post.findByIdAndUpdate(postId, updatedData, { new: true }, (err, post) => {
    if (err) {
        return next(err);
    }
    return next(null, post);
    });
};

exports.findPost = (postId, next) => {
    Post.findById(postId, (err, post) => {
        if (err) {
            return next(err);
        }
        return next(null, post);
    });
}