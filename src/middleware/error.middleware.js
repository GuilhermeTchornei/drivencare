import httpStatus from "http-status";

export default function handleApplicationErrors(err, req, res, next) {
    switch (err.name)
    {
        case "UnprocessableContent":
            return res.status(httpStatus.UNPROCESSABLE_ENTITY).send({ message: err.message });
        case "DuplicatedData":
            return res.status(httpStatus.CONFLICT).send({ message: err.message, data: err.data });
        case "InternalError":
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: err.message });
        case "invalidCredentials":
            return res.status(httpStatus.UNAUTHORIZED).send({ message: err.message });
        case "Unauthorized":
            return res.status(httpStatus.UNAUTHORIZED).send({ message: err.message });
        default:
            return res.status(httpStatus.UNAUTHORIZED).send({ message: err.message });
    }
}