const sinon = require('sinon');
const PostModel = require('../models/post.model');
const PostController = require('../controllers/post.controller');

describe('Post controller', () => {
    // Setup the responses
    let req = {
        body: {
            author: 'stswenguser',
            title: 'My first test post',
            content: 'Random content'
        }
    };

    let error = new Error({ error: 'Some error message' });

    let res = {};

    let expectedResult;

    
    describe('create', () => {
        var createPostStub;

        beforeEach(() => {
            // before every test case setup first
            res = {
                json: sinon.spy(),
                status: sinon.stub().returns({ end: sinon.spy() })
            };
        });

        afterEach(() => {
            // executed after the test case
            createPostStub.restore();
        });


        it('should return the created post object', () => {
            // Arrange
            expectedResult = {
                _id: '507asdghajsdhjgasd',
                title: 'My first test post',
                content: 'Random content',
                author: 'stswenguser',
                date: Date.now()
            };

            createPostStub = sinon.stub(PostModel, 'createPost').yields(null, expectedResult);

            // Act
            PostController.create(req, res);

            // Assert
            sinon.assert.calledWith(PostModel.createPost, req.body);
            sinon.assert.calledWith(res.json, sinon.match({ title: req.body.title }));
            sinon.assert.calledWith(res.json, sinon.match({ content: req.body.content }));
            sinon.assert.calledWith(res.json, sinon.match({ author: req.body.author }));

        });


        // Error Scenario
        it('should return status 500 on server error', () => {
            // Arrange
            createPostStub = sinon.stub(PostModel, 'createPost').yields(error);

            // Act
            PostController.create(req, res);

            // Assert
            sinon.assert.calledWith(PostModel.createPost, req.body);
            sinon.assert.calledWith(res.status, 500);
            sinon.assert.calledOnce(res.status(500).end);
        });
    });

    describe('update', () => {
        var updatePostStub;
    
        beforeEach(() => {
            // Before every test case, setup stub and request object
            res = {
                json: sinon.spy(),
                status: sinon.stub().returns({ end: sinon.spy() })
            };
    
            // Stub the updatePost method
            updatePostStub = sinon.stub(PostModel, 'updatePost');
        });
    
        afterEach(() => {
            // After each test case, restore stub
            updatePostStub.restore();
        });
    
        it('should return the updated post object', () => {
            // Arrange
            const postId = '507asdghajsdhjgasd'; // ID of the post to be updated
            const updatedPostData = {
                title: 'Updated title',
                content: 'Updated content',
                author: 'updatedAuthor',
                date: Date.now()
            };
            const updatedResult = {
                _id: postId,
                ...updatedPostData
            };
    
            // Stub the updatePost method to yield the updated result
            updatePostStub.withArgs(postId, updatedPostData).yields(null, updatedResult);
    
            // Set up the request object
            req = {
                params: {
                    id: postId
                },
                body: updatedPostData
            };
    
            // Act
            PostController.update(req, res);
    
            // Assert
            sinon.assert.calledWith(PostModel.updatePost, postId, updatedPostData);
            sinon.assert.calledWith(res.json, sinon.match(updatedResult));
        });
    
        // Error scenario
        it('should return status 500 on server error', () => {
            // Arrange
            const postId = '507asdghajsdhjgasd'; // ID of the post to be updated
            const updatedPostData = {
                title: 'Updated title',
                content: 'Updated content',
                author: 'updatedAuthor',
                date: Date.now()
            };
            const error = new Error('Some error occurred while updating post.');
    
            // Stub the updatePost method to yield an error
            updatePostStub.withArgs(postId, updatedPostData).yields(error);
    
            // Set up the request object
            req = {
                params: {
                    id: postId
                },
                body: updatedPostData
            };
    
            // Act
            PostController.update(req, res);
    
            // Assert
            sinon.assert.calledWith(PostModel.updatePost, postId, updatedPostData);
            sinon.assert.calledWith(res.status, 500);
            sinon.assert.calledOnce(res.status(500).end);
        });
    });
    

    describe('findPost', () => {

    })
});