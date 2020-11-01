const controller = require('../controllers/controller')

module.exports = function (express) {
    const router = express.Router()
    router.route('/').get(async (req, res) => {
        let links = []
        links = await controller.getlinks('https://krdo-joke-registry.herokuapp.com/api/services')

        controller.getJokes().then(jokes => {
            res.render('index', {
                jokesList: jokes,
                linklist: links
            })
        })
    })

    router.route('/:link').get(async (req, res) => {
        let links = []
        links = await controller.getlinks('https://krdo-joke-registry.herokuapp.com/api/services')
        jokeliste = []
        let endLink
        for (link of links) {
            if (req.params.link === link.name) {
                endLink = link.address
            }
        }
        console.log("Endlink: " + endLink)
        controller.getServerJokes(endLink).then(result => {
            res.render('server', {
                jokesList: result
            })
        }).catch(err => {
            res.render('errors', {
                errorName: err.name,
                errors: [err]
            })
        })



    })
    return router
}