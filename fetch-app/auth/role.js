const wrapper = require('../helpers/utils/wrapper');


const roleAdmin = async (req,res,next) =>{
    if (req.role !== 'admin') {
        return wrapper.responseToken(res, 'fail', [], 'Invalid Access Role!', 403);
    }
    next()
}

module.exports = {
    roleAdmin,
  };
  