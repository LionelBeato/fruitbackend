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


// middleware for express to ready body of POST methods etc 
let bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))



// app.get('/', (req, res) => res.send('hello there!'))
// // app.get('/index', (req, res) => res.sendFile('index.html', {root:__dirname}))


// app.use(express.static('./'))
// app.listen(port, () => console.log(`Example port on port ${port}`))


// apples database (this is simply an array)
let apples = [
  {
    name:"honeycrisp"
  }
]

// this is my get method
app.get('/data', (req, res) => res.json(apples))


// this is my post method
// using relational mapping to put values that the server gets back where I want them
app.post('/', function (req, res) {
  res.send('POST request to homepage')

  // as a request, this takes in my name and uses it as a value for a new object in my array database
  let name = req.body.name;
  apples.push({name:`${name}`})
  // this sends back the value of name as a res 
  res.send(name)
})

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type User {
    id: ID
    name: String
  }

  type Fruit {
    fruitId: ID
    fruitName: String
  }

  type FruitType {
    fruitTypeId: ID
    type: String
    fruitRepo: [Fruit]
  }

  type Query {
    hello: String

    fruittype(id: ID):FruitType

    fruittypes:[FruitType]

    user(id: ID):User
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

let fruitDB = [
  {
    fruitTypeId:0,
    type:"Citrus",
    fruitRepo:[
      {
        fruitId:0,
        fruitName:"Mandarin"
      },
      {
        fruitId:1,
        fruitName:"Tangerine"
      },
      {
        fruitId:2,
        fruitName:"Orange"
      }
    ]
  },
  {
    fruitTypeId:1,
    type:"Apple",
    fruitRepo:[
      {
        fruitId:0,
        fruitName:"Cosmic Crisp"
      },
      {
        fruitId:1,
        fruitName:"Honeycrisp"
      },
      {
        fruitId:2,
        fruitName:"Gala"
      }
    ]
  }

]



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
},
fruittype: ({id}) => {
  return fruitDB[id]
},
fruittypes: () => {
  return fruitDB
},
};

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

app.listen(port, () => console.log('Now browse to localhost:3000/graphql'));