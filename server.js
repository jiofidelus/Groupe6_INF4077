const express= require('express');
const http= require('http');
const path= require('path');
const mongoose= require('mongoose');
const bodyParser= require('body-parser');
const MongoClient = require('mongodb').MongoClient;

const ToDo = require('./models/todo');
const Messg = require('./models/message');

const port = process.env.port || 3000;
const app = express();
const server = http.createServer(app);

const connectionstring='mongodb+srv://nkgroup_4077:nkgroup_4077@episurvey.jsw95.mongodb.net/epiderm?retryWrites=true&w=majority&ssl=true';
const connectionParams={
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true 
}

const client = new MongoClient(connectionstring, connectionParams);
// client.connect(()=>{
//     console.log('connected');
// });



app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 
app.use(express.static(path.join(__dirname,'dist/Epiderm')));
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'dist/Epiderm', 'index.html'));
})

     // The database to use
 const dbName = "epiderm";
                      
 async function run() {
    try {
         await client.connect();
         console.log("Connected correctly to server");
         const db = client.db(dbName);

         // Use the collection "people"
         const col = db.collection("epidemicsurvey");

         // Construct a document                                                                                                                                                              
         let personDocument = {
             "name": { "first": "Alan", "last": "Turing" },
             "birth": new Date(1912, 5, 23), // June 23, 1912                                                                                                                                 
             "death": new Date(1954, 5, 7),  // June 7, 1954                                                                                                                                  
             "contribs": [ "Turing machine", "Turing test", "Turingery" ],
             "views": 1250000
         }

         // Insert a single document, wait for promise so we can read it back
         const p = await col.insertOne(personDocument);
         // Find one document
         const myDoc = await col.findOne();
         // Print to the console
         console.log(myDoc);

        } catch (err) {
         console.log(err.stack);
     }
 
     finally {
        await client.close();
    }
}

run().catch(console.dir);


server.listen(port);


// mongoose full dirver code example

// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://nkgroup_4077:<password>@episurvey.jsw95.mongodb.net/<dbname>?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });




 




// app.post('/message',(req,res)=>{
//   const msg = new Messg({
//       sujet : 'palo',
//       contenu : 'pe'
//   });

//   var createAndSavePerson = async function(done) {

//     var msg = new Messg({
//       sujet : 'palo',
//       contenu : 'pe'
//     });
    
//     await msg.save(function(err, data) {
//       if (err) return console.error(err);
//       done(null, data)
//     });
    
//   }

// });