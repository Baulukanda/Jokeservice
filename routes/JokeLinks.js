
const controller = require('../controllers/controller');

module.exports = function (express) {
    const router = express.Router()

    router.route('/:link').get(async(req,res) =>{
        let jokes = await controller.getServerJokes(req.params.link).then(jokes=>{
            res.json(jokes)
        })

        
       
    })
    return router
}