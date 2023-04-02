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

export default { validationError, duplicatedData };