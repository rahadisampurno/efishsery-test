  const data = (data, description = null, code = 200) => {return { err: null, data: data, code: code, message: description }};
  const success = (data, totalData = 0, description = '', code = 0) => ( { err: null, message: description, data, totalData, code });
  const fail = (data, description = '', code = 0) => ( { err: null, message: description, data, code });
  const error = (err, description, code = 500) => {
    return { err: err, data: null, code: code, message: description };
  };

  const handler = (res, result) => {
    res.send(
      {
        resultCode: result.code,
        resultDesc: result.message,
        data: result.data,
        totalData: result.totalData,
        timeStamp: new Date()
      }
    );
  };

  const handlerError = (res, result) => {
    res.send(
      {
        resultCode: result.code,
        resultDesc: result.message,
        data: result.data,
        timeStamp: new Date()
      }
    );
  };

const response = (res, type, result, message = null, code = null) => {
    result = {};
    result.message = message;
    let status = false;
    switch (type) {
    case 'fail':
      status = false;
      result.code = 500;
      break;
    case 'success':
      status = true;
      result.code = 200;
      break;
    }
    res.send(
      {
        success: status,
        data: result.data,
        message: result.message,
        code: result.code
      }
    );
  };

  const responseToken = (res, type, result, message = null, code = null) => {
    if (message) {
      result.message = message;
    }
    if (code) {
      result.code = code;
    }
    let status = false;
    switch (type) {
    case 'fail':
      status = false;
      break;
    case 'success':
      status = true;
      break;
    }
    res.send(
      {
        success: status,
        data: result.data,
        resultDesc: result.message,
        resultCode: result.code
      }
    );
  };

  module.exports = {
    data,
    success,
    fail,
    response,
    error,
    handler,
    handlerError,
    responseToken
  };