const { TokenChecker } = require("./helper")

exports.TokenCheckerMiddleware = async (req, res, next) => {
    const token = req?.headers?.authorization.split(" ")[1]
    console.log('tokeeen',req?.headers)

    if(!token){
        res.status(401).send({ message: "No Token provided!" })
        return "No Token provided!"
    }

    const secret = "lol123"
    const result = await TokenChecker({token, secret})

    if(result === "Expired Token"){
        res.status(401).send({ message: "Your token is expired!" })
        return "Your token is expired!"
    } else if(result.uid) {
        next()
        return "you may come in"
    }   
}