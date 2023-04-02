import errors from "../errors/index.js";


export function schemaValidation(schema) {
    return (req, _, next) => {
        const { error } = schema.validate(req.body, { abortEarly: false });

        if (error)
        {
            const messageError = error.details.map(detail => detail.message);
            throw errors.validationError(messageError);
        }

        next();
    }
}