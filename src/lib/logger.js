const log = (channel, message) => {
    const messageLog = `${channel} : ${message}`;
    console.log(messageLog);
    return messageLog;
};

module.exports = {
    log,
};
