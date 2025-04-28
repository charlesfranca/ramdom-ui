const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.urlencoded())
app.use(bodyParser.json())

const port = 3000

const users = [
    
];

app.get('/users', (req, res) => {
  res.json(users);
})

app.get('/users/:id', (req, res) => {
    const user = users.find(u => u.id == req.params.id);
    if (user) {
        res.json(user);
    } else {
        res.status(404).send('user not found');
    }
  })

app.post('/users', (req, res) => {
    if (!req.body.email || !req.body.name) {
        res.status(400).send('Id, Name and Email are required to create a user');
    }

    if (users.find(u => u.email === req.body.email)) {
        res.status(400).send(`Teh Email: ${req.body.email} is already being used`);
    }

    let newId = 1;
    if(users.length > 0) {
        newId = users[users.length - 1].id + 1;
    }

    users.push({
        ...req.body,
        id: newId
    });

    res.send('user added');
});

app.put('/users/:id', (req, res) => {
    const userToUpdate = users.find(u => u.id == req.params.id);
    if(!userToUpdate) {
        res.status(404).send('user not found');
        return;
    }

    if (!req.body.email || !req.body.name) {
        res.status(400).send('Id, Name and Email are required to create a user');
    }

    if (users.find(u => u.email === req.body.email && u.id != req.params.id)) {
        res.status(400).send(`Teh Email: ${req.body.email} is already being used`);
    }

    users.push({
        email: req.body.email,
        name: req.body.name
    });

    res.send('user updated');
});

app.delete('/users/:id', (req, res) => {
    const userIndex = users.findIndex(u => u.id == req.params.id);

    if (userIndex != -1) {
        users.splice(userIndex, 1);
        res.send('user removed');
    } else {
        res.status(404).send('user not found');
    }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})