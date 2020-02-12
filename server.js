// const http = require('http');
// const PORT = 8080

// const server = http.createServer((req, res) => {
//     res.writeHead(200, { 'Content-Type': 'text/html' }); 
//     res.end('Hello!')
// })

// server.listen(PORT, () => console.log(`Server is listening on port ${PORT}`))


const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');
let cors = require('cors')

// let apples = {name:'apples', amount:4}


// middleware to use cors and allow everything
app.use(cors());



// app.get('/', (req, res) => res.send('hello there!'))
// // app.get('/index', (req, res) => res.sendFile('index.html', {root:__dirname}))
// app.get('/data', (req, res) => res.json(apples))
// app.use(express.static('./'))
// app.listen(port, () => console.log(`Example port on port ${port}`))


// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type User {
    id: ID
    name: String
  }

  type Query {
    hello: String

    user(id: Int):User
    users:[User]
  }
`);


let users = [

   {
    id:"0",
    name:"mike",
  },
   {
    id:"1",
    name:"al",
  },
   {
    id:"2",
    name:"jen",
  }
]

let fruitDB = {
  {
    id:0
  }

}



// The root provides a resolver function for each API endpoint
let root = {
  hello: () => {
    return 'Hello world!';
  },
  users: () => {
    return users;
},
user: ({id}) => {
  return users[id];
}
};

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

app.listen(port, () => console.log('Now browse to localhost:3000/graphql'));