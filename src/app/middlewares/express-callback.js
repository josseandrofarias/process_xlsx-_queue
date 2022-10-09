module.exports = (controller) => async (req, res) => {
    const httpRequest = {
        body: req.body,
        query: req.query,
        params: req.params,
        ip: req.ip,
        method: req.method,
        path: req.path,
        file: req.file,
        headers: {
            'Content-Type': req.get('Content-Type'),
            Authorization: req.get('Authorization'),
            'User-Agent': req.get('User-Agent'),
        },
    };
    try {
        const httpResponse = await controller(httpRequest);
        if (httpResponse.headers) res.set(httpResponse.headers);
        return res.status(httpResponse.code || 200).send(httpResponse.body);
    } catch (error) {
        res.status(error.code || 500).json({ error: error.message || 'Internal Error' });
    }


};
