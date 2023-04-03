function validationError(message) {
    return {
        name: "UnprocessableContent",
        message
    };
}

function duplicatedData(data) {
    return {
        name: "DuplicatedData",
        message: "Duplicated data entry. The data you are trying to save already exists.",
        data
    };
}

function invalidCredentials() {
    return {
        name: "invalidCredentials",
        message: "Email or password are incorrect"
    };
}

function internalError() {
    return {
        name: "InternalError",
        message: "Something went wrong, sorry :("
    }
}

function unauthorized() {
    return {
        name: "Unauthorized",
        message: "You must be signed in to continue"
    };
}

export default { validationError, duplicatedData, internalError, invalidCredentials, unauthorized };