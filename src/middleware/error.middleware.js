import httpStatus from "http-status";

export default function handleApplicationErrors(err, req, res, next) {
    if (err.name === "UnprocessableContent")
    {
        return res.status(httpStatus.UNPROCESSABLE_ENTITY).send({ message: err.message });
    }
    if (err.name === "DuplicatedData")
    {
        return res.status(httpStatus.CONFLICT).send({ message: err.message, data: err.data });
    }
    if (err.name === "InternalError")
    {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: err.message });
    }
    if (err.name === "invalidCredentials")
    {
        return res.status(httpStatus.UNAUTHORIZED).send({ message: err.message });
    }
}