const Joke = require('../models/joke')
const fetch = require('node-fetch')

// fuction for create joke
exports.createJoke = function (setup, punchline) {
    console.log("Joke Creation")
    const joke = new Joke({
        setup: setup,
        punchline: punchline
    })
    console.log("Joke Created")
    return joke.save()
}

// function for getJokes

exports.getJoke = function (id) {
    return Joke.findOne({
        _id: id
    })
}

// function for getJokes
exports.getJokes = function () {
    return Joke.find()

}

exports.getlinks = async function (link) {
    let liste = []
    liste = await fetch(link)
        .then(resultat => {
            if (resultat.status >= 400)
                throw new Error(resultat.status);
            else
                return resultat.json();
        })
        .then(result => {
            for (res of result) {
                let useAddress = res.address
                if (useAddress != undefined) {
                    if (useAddress.indexOf("herokuapp.com") != -1) {
                        if (useAddress.charAt(useAddress.length - 1) != "/") {
                            useAddress += "/"
                        }
                        liste.push({
                            name: res.name,
                            address: useAddress
                        })
                    }
                }
            }
            return liste
        })
    return liste

}

exports.getServerJokes = async function (link) {
    let liste = []
    liste = await fetch(link + 'api/jokes')
        .then(resultat => {
            return resultat.json();
        })
        .then(result => {
            for (res of result) {
                liste.push(res)
            }
            return liste
        })
        .catch(err => {
            console.error(err)
            throw err
        })

    return liste



}