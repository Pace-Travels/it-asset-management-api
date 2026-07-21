const validationMiddleware = (schema) => {
    return async (req, res, next) => {
        try {
            const { error, value } = schema.validate(req.body, {
                abortEarly: false,
                stripUnknown: true
            });

            if (error) {
                return res.status(400).json({
                    success: false,
                    message: "Validation Failed",
                    errors: error.details.map(item => ({
                        field: item.path.join("."),
                        message: item.message
                    }))
                });
            }
            req.body = value;
            next();
        } catch (err) {
            next(err);
        }
    };
};

export default validationMiddleware;