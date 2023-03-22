const moment = require("moment");

const formattedMessage = (message, user) => {
    return {
        user,
        message,
        date: moment().format("h:mm:ss a, D MM YY")
    };
};

module.exports = {
    formattedMessage
};