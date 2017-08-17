const expect = require('expect');
const request = require('supertest');
var {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

const todos = [{
  _id: new ObjectID(),
  text: 'First test todo'
}, {
  _id: new ObjectID(),
  text: 'Second test todo',
  completed: true,
  completedAt: 333
}];

beforeEach((done) => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos);
  }).then(() => done());
});

describe('POST /todos', () => {
  it('should create a new todo', (done) => {
    var text = 'Test todo text';
    request(app)
      .post('/todos')
      .send({text})
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        Todo.find({text}).then((todos) => {
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch((e) => {done(e)});
    });
  });

  it('should not create todo with invalid body data', (done) => {
    request(app)
    .post('/todos')
    .send({})
    .expect(400)
    .end((err, res) => {
      if (err) {
        return done(err)
      }
      Todo.find().then((todos) => {
        expect(todos.length).toBe(2);
        done();
        }).catch((e) => {done(e)});
      });
    });
});

describe('GET /todos', () => {
  it('should get all todos', (done) => {
    request(app)
    .get('/todos')
    .expect(200)
    .expect((res) => {
      expect(res.body.todos.length).toBe(2);
    })
    .end(done);
  });
});

describe('GET /todos/:id', () => {
  it('should return a todo doc by id', (done) => {
    var hexId = todos[0]._id.toHexString();
    request(app)
    .get(`/todos/${hexId}`)
    .expect(200)
    .expect((res) => {
      expect(res.body.todo.text).toBe(todos[0].text);
    })
    .end(done);
  });

  it('should return 404 when todo not found using valid id', (done) => {
      var id= new ObjectID().toHexString();
      request(app)
      .get(`/todos/${id}`)
      .expect(404)
      .end(done);
  });

  it('should return 404 when todo not found using invalid id', (done) => {
      request(app)
      .get(`/todos/123`)
      .expect(404)
      .end(done);
  });
});

describe('DELETE /todos/:id', () => {
  it('should delete a todo doc by id', (done) => {
    var hexId = todos[0]._id.toHexString();
    request(app)
    .delete(`/todos/${hexId}`)
    .expect(200)
    .expect((res) => {
      expect(res.body.todo._id).toBe(hexId);
    })
    .end((err, res) => {
      if (err) {
        return done(err)
      }
      Todo.findById(hexId).then((todo) => {
        expect(todo).toNotExist();
        done();
        }).catch((e) => {done(e)});
    });
  });

  it('should return 404 when todo not found using valid id', (done) => {
      var id= new ObjectID().toHexString();
      request(app)
      .delete(`/todos/${id}`)
      .expect(404)
      .end(done);
  });

  it('should return 404 when todo not found using invalid id', (done) => {
      request(app)
      .delete(`/todos/123`)
      .expect(404)
      .end(done);
  });
});

describe('PATCH /todos/:id', () => {
  it('should update a todo, set it to completed and update text', (done) => {
    var hexId = todos[0]._id.toHexString();
    var text = "First test todo UPDATED";
    var completed = true;

    request(app)
    .patch(`/todos/${hexId}`)
    .send({
      text,
      completed
    })
    .expect(200)
    .expect((res) => {
      expect(res.body.todo.text).toBe(text);
      expect(res.body.todo.completed).toBe(completed);
      expect(res.body.todo.completedAt).toBeA('number');
    })
    .end((err, res) => {
      if (err) {
        return done(err)
      }
      Todo.findById(hexId).then((todo) => {
        expect(todo.text).toBe(text);
        expect(todo.completed).toBe(completed);
        expect(todo.completedAt).toNotBe(null);
        done();
        }).catch((e) => {done(e)});
    });
  });

  it('should clear completedAt when todo is not completed', (done) => {
    var hexId2 = todos[1]._id.toHexString();
    var text = "Second test todo UPDATD";
    var completed = false;
    request(app)
    .patch(`/todos/${hexId2}`)
    .send({
      text,
      completed
    })
    .expect(200)
    .expect((res) => {
      expect(res.body.todo.text).toBe(text);
      expect(res.body.todo.completed).toBe(completed);
      expect(res.body.todo.completedAt).toBe(null);
    })
    .end((err, res) => {
      if (err) {
        return done(err)
      }
      Todo.findById(hexId2).then((todo) => {
        expect(todo.text).toBe(text);
        expect(todo.completed).toBe(completed);
        expect(todo.completedAt).toNotExist();
        done();
        }).catch((e) => {done(e)});
    });
  });


});
