const User = require('../modules/registerSchema')

exports.checkAuth = async ( req, res ) => {
    try {
        const user = await User.findById(req.user.id)
        
        if(!user) {
            return res.status(404).json({ success: false, message: "No user was found" })
        }

        return res.status(200).json({ success: true,  user: user, message: `user: {user}` })
    } catch (error) {
        console.log(error)
    }
}

