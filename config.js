module.exports = {
    mongoDBhost: 'mongodb+srv://jokeserviceDB:2711@cluster0.a4qos.mongodb.net/<dbname>?retryWrites=true&w=majority',
    PORT: process.env.PORT || 3000,
    registry: {name: "jokeservice001",address:"https://jokeservice001.herokuapp.com/",secret:"bananpeanutmilkshake"}
}