
function validPasswordCheck(req, res, next) {
    const password = req.body.password;
    let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    let result = regex.test(password);
    if (result) {
        next(); // continue to the route handler function
    } else {
        return res.status(403).json({
            message: "Password does not meet the requirements. \
            It should contains at least 8 characters. \
            It should contains at least one digit. \
            It should contains at least one upper case alphabet. \
            It should contains at least one lower case alphabet. \
            It should contains at least one special character which includes !@#$%&*()-+=^."
        })
    }
}

export default validPasswordCheck;

