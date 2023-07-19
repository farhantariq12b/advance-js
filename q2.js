const express = require('express');
const ExpressBrute = require('express-brute');

const bruteForceMap = new Map();

function createBruteForce(namespace, freeRetries, minWait) {
  if (bruteForceMap.has(namespace)) {
    return bruteForceMap.get(namespace);
  } else {
    const store = new ExpressBrute.MemoryStore();
    const bruteforce = new ExpressBrute(store, {
      freeRetries,
      minWait,
    });

    bruteForceMap.set(namespace, bruteforce);
    return bruteforce;
  }
}

function bruteforce(namespace, freeRetries, minWait) {
  const bruteforce = createBruteForce(namespace, freeRetries, minWait);

  return function (req, res, next) {
    bruteforce.prevent(req, res, next, (err, data) => {
      if (err) {
        const waitTime = Math.ceil(data.nextValidRequest.getTime() / 1000 / 60);
        return res.status(429).send(
          `Too many requests for the ${namespace} namespace. Please retry in ${waitTime} minutes`
        );
      }
      next();
    });
  };
}

const app = express();

app.use(bruteforce('global', 100, 5));

const router = express.Router();

router.get('/v1/users', bruteforce('users', 50, 1), function (req, res) {

  res.send({ message: "send resource"})
});

router.get('/v1/apps', async function (req, res) {
  try {
    await bruteforce('apps', 30, 2)(req, res, () => {});
  } catch (err) {
    res.status(err.code).send(err.message);
  }
});

app.use('/api', router);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
