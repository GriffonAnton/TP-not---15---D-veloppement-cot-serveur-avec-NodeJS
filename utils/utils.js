exports.sendJson = (res, status, data) => {
    res.writeHead(status, { "Content-Type": "application/json" });
    res.end(JSON.stringify(data));
};

exports.parseBody = (req, callback) => {
    let body = "";
    req.on("data", chunk => body += chunk);
    req.on("end", () => {
        try {
            callback(null, JSON.parse(body));
        } catch {
            callback(new Error("Invalid JSON"));
        }
    });
};
