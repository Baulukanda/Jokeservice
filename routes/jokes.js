const controller = require('../controllers/controller');

module.exports = function (express) {
    const router = express.Router();

    router.route('/').get((req, res) => {
        controller.getJokes().then((jokes) => {
            res.json(jokes)
        })
    })

    router.route('/:id').get((req, res) => {
        controller.getJoke(req.params.id).then((joke) => {
            res.json(joke)
        })
    })

    router.route('/').post((req, res) => {
        const setup = req.body.setup
        const punchline = req.body.punchline
        controller.createJoke(setup, punchline).then(result => {
            //res.write(`Inserted the joke: ${result}`)
            res.redirect('/')
            //res.end()
        }).catch(err => {
            res.render('errors', {errorName: err.name, errors: err.errors})
        })
    })

    return router
}