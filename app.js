//jshint esversion:6
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const _ = require('lodash');
mongoose.connect("mongodb+srv://aalekh:<password>@cluster0-5e5lo.mongodb.net/todolistDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});
const app = express();


const itemsSchema = {
  name: String
};

const Item = mongoose.model('Item', itemsSchema); //collection name will be (i)tem(s)


app.set('view engine', 'ejs');
app.use(bodyParser.json({
  extended: true
}));
app.use(express.static('public'));

const item1 = new Item({
  name: "Eat"
});

const item2 = new Item({
  name: "Sleep"
});

const item3 = new Item({
  name: "Code"
});

const defaultArr = [item1, item2, item3];


app.get('/', (req, res) => {
  res.render('list');
});

const listSchema = {
  name: String,
  items: [itemsSchema]
}

const List = mongoose.model("List", listSchema);

app.post("/dataItems", (req, res) => {
  try {
    const myPromise = () => {
      return new Promise((resolve, reject) => {
        const itemName = req.body.newItem;
        const listName = req.body.list;
        const item = new Item({
          name: itemName
        });
        if (listName === "Today") {
          item.save((err) => {
            if (err) {
              reject("Error!!");
            } else {
              resolve("Success");
            }
          });
        }
      });
    };
    const callPromise = async () => {
      const result = await myPromise();
      return result;
    };

    callPromise()
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        console.log(err);
        res.send(err);
      })
  } catch (e) {
    console.log(e);
  }
});



app.get("/allItems", (req, res) => {

  try {
    var myPromise = () => {
      return new Promise((resolve, reject) => {
        Item.find({}, (err, items) => {
          if (err) {
            reject("error!!");
          } else {
            const output = JSON.stringify(items);
            resolve(output);
          }
        });
      });
    };

    const callPromise = async () => {
      const result = await (myPromise());
      return result;
    };

    callPromise()
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        console.log(err);
        res.send(err);
      })

  } catch (e) {
    console.log(e);
  }
});



app.post("/deleteDataItems", (req, res) => {

  try {
    const myPromise = () => {
      return new Promise((resolve, reject) => {
        const checkedId = req.body.checkBox;
        const listName = req.body.listName;

        if (listName === "Today") {
          Item.findByIdAndRemove(checkedId, (err) => {
            if (err) {
              reject(err);
            } else {
              resolve("success");
            }
          });
        }
      });
    };

    const callPromise = async () => {
      const result = await (myPromise());
      return result;
    };

    callPromise()
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        console.log(err);
        res.send(err);
      });
  } catch (e) {
    console.log(e);
  }

});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, () => {
  console.log('server started at port 3000');
})
