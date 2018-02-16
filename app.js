// Mongo Demon is stored at
// C:\Program Files\MongoDB\Server\3.6\bin
//and execute mongod.exe
//Mongo Shell is at same location with mongo.exe
//To set the environment variable use $env:DBURL= "mongodb://localhost/YelpCamp"

var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var posts = require("./models/post");
var comments = require("./models/comment");
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

var mongoObjectId = function() {
  var timestamp = (new Date().getTime() / 1000 | 0).toString(16);
  return timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, function() {
    return (Math.random() * 16 | 0).toString(16);
  }).toLowerCase();
};
var url = process.env.DBURL || "mongodb://localhost/Socialize" ;

var app = express();
var postsArr = [{
    uname: "dexuiz",
    img: "http://www.intrawallpaper.com/static/images/HD-Wallpapers-C76.jpg",
    caption: "Lorem ipsum donec id elit non mi porta gravida at eget metus.",
    comments: [{
      _id: mongoObjectId(),
      text: "nice place",
      uname: "abc"
    }, {
      _id: mongoObjectId(),
      text: "great place",
      uname: "ssc"
    }]
  },
  {
    uname: "vik_98",
    img: "http://hdbackgroundspic.com/wp-content/uploads/2016/06/nice-background-hd-desktop.jpeg",
    caption: "Lorem ipsum donec id elit non mi porta gravida at eget metus.",
    comments: [{
      _id: mongoObjectId(),
      text: "nice place",
      uname: "abc"
    }, {
      _id: mongoObjectId(),
      text: "great place",
      uname: "ssc"
    }]
  },
  {
    uname: "dexuiz",
    img: "http://www.firsthdwallpapers.com/uploads/2013/05/hd-wallpapers-1080p.jpg",
    caption: "Lorem ipsum donec id elit non mi porta gravida at eget metus.",
    comments: [{
      _id: mongoObjectId(),
      text: "nice place",
      uname: "abc"
    }, {
      _id: mongoObjectId(),
      text: "great place",
      uname: "ssc"
    }]
  },
  {
    uname: "vik_98",
    img: "http://www.intrawallpaper.com/static/images/HD-Wallpapers-C76.jpg",
    caption: "Lorem ipsum donec id elit non mi porta gravida at eget metus.",
    comments: [{
      _id: mongoObjectId(),
      text: "nice place",
      uname: "abc"
    }, {
      _id: mongoObjectId(),
      text: "great place",
      uname: "ssc"
    }]
  },
  {
    uname: "dexuiz",
    img: "http://hdbackgroundspic.com/wp-content/uploads/2016/06/nice-background-hd-desktop.jpeg",
    caption: "Lorem ipsum donec id elit non mi porta gravida at eget metus.",
    comments: [{
      _id: mongoObjectId(),
      text: "nice place",
      uname: "abc"
    }, {
      _id: mongoObjectId(),
      text: "great place",
      uname: "ssc"
    }]
  },
  {
    uname: "vik_98",
    img: "http://www.firsthdwallpapers.com/uploads/2013/05/hd-wallpapers-1080p.jpg",
    caption: "Lorem ipsum donec id elit non mi porta gravida at eget metus.",
    comments: [{
      _id: mongoObjectId(),
      text: "nice place",
      uname: "abc"
    }, {
      _id: mongoObjectId(),
      text: "great place",
      uname: "ssc"
    }]
  }
];

var userArr = [{
    name: "Vikram Rathod",
    uname: "vik_98",
    password: "asdfg",
    img: "http://www.britishcastle.club/wp-content/uploads/2017/06/sample-customer-photo2.jpg",
    posts: []
  },
  {
    name: "Deval Srivastava",
    uname: "dexuiz",
    password: "asdfg",
    img: "http://www.renewablecities.ca/rc-wp/wp-content/uploads/Scott-Sinclair-150x150.jpg",
    posts: []
  },
  {
    name: "Sapna Rathod",
    uname: "sapna",
    password: "asdfg",
    img: "https://www.mainewomensnetwork.com/Resources/Pictures/vicki%20aqua%20headshot-smallmwn.jpg",
    posts: []
  },
];

// MongoClient.connect(url, function(err, db){
//   if(err){
//     console.log(err);
//   }
//   var query = {uname: "gov"};
//   var dbo = db.db("Socialize");
//   dbo.collection("posts").find(query).toArray(function(err, newF){
//     if (err) throw err;
//     // post = newF[0];
//     console.log(newF);
//
//     dbo.collection("users").find(query).toArray(function(err, newU){
//       if(err) throw err;
//       console.log(newU);
//       var user=newU[0];
//       for (var i = 0; i < newF.length; i++) {
//         user.posts.push(newF[i]);
//       }
//       console.log(user);
//       dbo.collection("users").replaceOne(query, user, function(err, newU){
//         if(err) throw err;
//         console.log("scuucessful");
//       });
//     });
//
//     // post.comments.push(obj);
//     // console.log(post);
//
//   });
// });

// MongoClient.connect(url, function(err, db){
//   if(err){
//     console.log(err);
//   }else{
//     var dbo = db.db("Socialize");
//     dbo.collection("users").insertMany(userArr, function(err, newP){
//       if(err){
//         console.log(err);
//       }else{
//         console.log(newP);
//       }
//     })
//   }
// });

// for (var i = 0; i < postsArr.length; i++) {
// var obj = postsArr[0];
// posts.create(obj, function(err, newP){
//   if(err){
//     console.log(err);
//   }else{
//     console.log(newP);
//   }
// })
// }
// var sample;
// comments.create({text: "Excellent Place To visit",
//  uname: "vik_98"
// }, function(err, newC){
//   if(err){
//     console.log(err);
//   }else{
//     sample = newC;
//     console.log(newC);
//   }
// })
//
// var obj = {
//   uname:"fibjik",
//   img: "http://www.firsthdwallpapers.com/uploads/2013/05/hd-wallpapers-1080p.jpg",
//   caption: "Nice place to visit",
//   comments: []
// }
// obj.comments.push(sample);
// var sampleC;

//
// console.log(sampleC);
//

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(methodOverride("_method"));
app.use(express.static("public"))

mongoose.connect(url);

app.get("/", function(req, res) {
  res.render("index");
});

app.get("/posts", function(req, res) {
  posts.find({}, function(err, postsR) {
    if (err) {
      console.log(err);
    } else {
      res.render("posts/posts", {
        arr: postsR
      });
    }
  });
});

app.get("/posts/new", function(req, res) {
  res.render("posts/new");
});

app.post("/posts", function(req, res) {
  posts.create(req.body.posts, function(err, newP) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/posts");
    }
  });
});

app.get("/posts/:id/edit", function(req, res) {
  posts.findById(req.params.id, function(err, newF) {
    if (err) {
      console.log(err);
    } else {
      res.render("posts/edit", {
        post: newF
      });
    }
  });
});

app.put("/posts/:id", function(req, res) {
  posts.findByIdAndUpdate(req.params.id, req.body.posts, function(err, newU) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/posts");
    }
  });
});

app.get("/posts/:id", function(req, res) {
  MongoClient.connect(url, function(err, db) {
    if (err) {
      console.log(err);
    }
    var dbo = db.db("Socialize");
    console.log(req.params.id);
    var query = {
      _id: ObjectId(req.params.id)
    };
    dbo.collection("posts").find(query).toArray(function(err, newF) {
      if (err) throw err;
      var post = newF[0];
      res.render("posts/show", {
        post: post
      });
    })
  })
  // posts.findById(req.params.id, function(err, newF){
  //   if(err){
  //     console.log(err);
  //   }else{
  //     res.render("posts/show", {post: newF});
  //   }
  // });
});

app.delete("/posts/:id", function(req, res) {
  MongoClient.connect(url, function(err, db) {
    if (err) {
      console.log(err);
    }
    var dbo = db.db("Socialize");
    var query = {
      _id: ObjectId(req.params.id)
    };
    dbo.collection("posts").deleteOne(query, function(err, obj) {
      if (err) throw err;
      res.redirect("/posts");
    })
  });
});

app.get("/posts/:id/comments/new", function(req, res) {
  MongoClient.connect(url, function(err, db) {
    if (err) {
      console.log(err);
    }
    var dbo = db.db("Socialize");
    var query = {
      _id: ObjectId(req.params.id)
    };
    dbo.collection("posts").find(query).toArray(function(err, newF) {
      if (err) throw err;
      var post = newF[0];
      res.render("comments/new", {
        post: post
      });
    })
  })
});

app.post("/posts/:id/comments", function(req, res) {
  MongoClient.connect(url, function(err, db) {
    if (err) {
      console.log(err);
    }
    var post;
    var query = {
      _id: ObjectId(req.params.id)
    };
    var dbo = db.db("Socialize");
    dbo.collection("posts").find(query).toArray(function(err, newF) {
      if (err) throw err;
      post = newF[0];
      //console.log(post);
      var obj = {
        uname: req.body.uname,
        text: req.body.text,
        _id: mongoObjectId()
      }
      post.comments.push(obj);
      console.log(post);
      dbo.collection("posts").replaceOne(query, post, function(err, newU) {
        if (err) throw err;
        res.redirect("/posts/" + req.params.id);
      });
    });
  });
});

app.delete("/posts/:id/comments/:cid", function(req, res) {
  MongoClient.connect(url, function(err, db) {
    if (err) {
      console.log(err);
    }
    var dbo = db.db("Socialize");
    var query = {
      _id: ObjectId(req.params.id)
    };
    dbo.collection("posts").find(query).toArray(function(err, newF) {
      if (err) throw err;
      var post = newF[0];
      console.log(typeof req.params.cid);
      for (var i = 0; i < post.comments.length; i++) {
        if (post.comments[i]._id === req.params.cid) {
          post.comments.splice(i, 1);
          dbo.collection("posts").replaceOne(query, post, function(err, newU) {
            if (err) throw err;
            res.redirect("/posts/" + req.params.id);
          });
        }
      }
    })
  })
});

app.get("/users", function(req, res) {
  MongoClient.connect(url, function(err, db) {
    if (err) {
      console.log(err);
    }
    var dbo = db.db("Socialize");
    dbo.collection("users").find({}).toArray(function(err, newF) {
      if (err) throw err;
      res.render("users/index", {
        user: newF
      });
    })
  })
});

app.get("/users/register", function(req, res) {
  res.render("users/register");
});

app.get("/users/login", function(req, res) {
  res.render("users/login");
});

app.get("/users/:id", function(req, res) {
  MongoClient.connect(url, function(err, db) {
    if (err) {
      console.log(err);
    }
    var dbo = db.db("Socialize");
    var query = {
      _id: ObjectId(req.params.id)
    };
    dbo.collection("users").find(query).toArray(function(err, newF) {
      if (err) throw err;
      console.log(newF);
      var obj = newF[0];
      res.render("users/show", {
        user: obj
      });
    });
  });
});

app.post("/users/register", function(req, res) {
  MongoClient.connect(url, function(err, db) {
    if (err) {
      console.log(err);
    }
    var dbo = db.db("Socialize");
    var query = {
      uname: req.body.uname
    };
    var userObj = {
      name: req.body.name,
      uname: req.body.uname,
      img: req.body.img,
      password: req.body.password,
      posts: []
    };
    dbo.collection("users").find(query).toArray(function(err, newF) {
      if (err) throw err;
      var post = newF[0];
      if (post) {
        res.render("users/register");
      } else {
        dbo.collection("users").insertOne(userObj, function(err, newU) {
          if (err) throw err;
          console.log(newU);
          res.redirect("/users");
        });
      }
    });
  });
});

var port = process.env.PORT || 3000;
app.listen(port);
