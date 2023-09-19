const moment = require("moment");

const formattedMessage = (message, user) => {
    return {
        sender: user,
        message,
        time: moment().format("h:mm a, D-MM-YY")
    };
};

module.exports = {
    formattedMessage
};