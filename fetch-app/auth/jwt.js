const jwt =require('jsonwebtoken')
const wrapper = require('../helpers/utils/wrapper');
const config = require('../infra/global_config');


const getToken = (headers) => {
    if (headers && headers.authorization && headers.authorization.includes('Bearer')) {
      const parted = headers.authorization.split(' ');
      if (parted.length === 2) {
        return parted[1];
      }
    }
    return undefined;
  };

const verifyToken = async (req,res,next) =>{
  let dbAuth = require(config.get('/database'))
    const token = getToken(req.headers);
    if (!token) {
        return wrapper.responseToken(res, 'fail', [], 'Invalid token!', 403);
      }
      let decodedToken;
      try {
        decodedToken = jwt.verify(token, config.get('/secretKey'));
      } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
          return wrapper.responseToken(res, 'fail', [], 'Access token expired!', 401);
        }
        return wrapper.responseToken(res, 'fail', [], 'Token is not valid!', 401);
      }
      
      let notValid = true
      dbAuth.map(e=>{
        if (e.phone == decodedToken.phone) {
          notValid = false}});
        if (notValid) {
          return wrapper.responseToken(res, 'fail', [], 'Account User Not Exist', 404);
        }

      req.username =  decodedToken.username;
      req.phone =  decodedToken.phone;
      req.role =  decodedToken.role;
      next();
}

module.exports = {
    verifyToken,
  };
  