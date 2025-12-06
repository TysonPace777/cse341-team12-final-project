const express = require("express");
const cors = require("cors");
const mongodb = require("./data/database");
const bodyParser = require("body-parser");
const passport = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger-output.json");
const session = require("express-session");
const MongoStore = require('connect-mongo').default;

const app = express();

const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URL,
        ttl: 14 * 24 * 60 * 60 // 14 days
    }),
    cookie: {
        maxAge: 14 * 24 * 60 * 60 * 1000  // 14 days in ms
    }
}));
// Express session initialization
app.use(passport.initialize());
// Init passport on every route call
app.use(passport.session());
//Allow passport to use express-session
// Rest Api
app.use((req, res, next) => {
  res.setHeader('Access-control-Allow-Origin', '*');
  res.setHeader("Access-Control-Allow-Methods",
    "POST, GET, PUT, PATCH, OPTIONS, DELETE"
  );
  next();
})

app.use(cors({methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']}))
app.use(cors({origin: '*'}))

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.CALLBACK_URL
},
async(accessToken, refreshToken, profile, done) => {
  const usersCollection = mongodb.getDatabase().db().collection("user");

      // Check if user already exists
      let user = await usersCollection.findOne({ githubId: profile.id });

      if (!user) {
        // Create new user
        const newUser = {
          githubId: profile.id,
          username: profile.username,
          displayName: profile.displayName,
          profileUrl: profile.profileUrl,
        };

        const result = await usersCollection.insertOne(newUser);
        newUser._id = result.insertedId;
        return done(null, newUser);
      }
    return done(null, user);
  } 
));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    // const user = await User.findById(id);
    done(null, user);
});

app.get('/', (req, res) => {
  res.send(req.session.user != undefined ? `Logged in as ${req.session.user.username}`: "Logged Out")
})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/', require('./routes'));

// mongodb.initDb((err) => {
//     if (err) {
//         console.log(err);
//     } else {
//         app.listen(port, () =>
//             console.log(`Database is listening and Running on port ${port}`)
//         );
//     }
// });

if (process.env.NODE_ENV !== "test") {
  mongodb.initDb((err) => {
    if (err) {
      console.log(err);
    } else {
      app.listen(port, () =>
        console.log(`Database is listening and Running on port ${port}`)
      );
    }
  });
}

module.exports = app;
