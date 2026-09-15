const bcrypt = require("bcrypt");
const { createHmac } = require("crypto");
exports.DoHash = async (value) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashing = await bcrypt.hash(value, salt);
        return hashing;
    } catch (error) {
        console.log(error)
    }
    
}

exports.hmacProcess = (value, key) => {
    const result = createHmac('sha256', key).update(value).digest('hex')
    return result
}