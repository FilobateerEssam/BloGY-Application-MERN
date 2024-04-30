const mongoose = require("mongoose");

function validateObjectId(req, res, next) { 

    if( !mongoose.Types.ObjectId.isValid(req.params.id)) {
        // 400 Bad Request
        return res.status(400).json({message: "Invalid ID"});
    }

    next();
};

module.exports = {
    validateObjectId 
}