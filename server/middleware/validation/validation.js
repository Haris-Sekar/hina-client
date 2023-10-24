
const validateAPI =  (validator) => {
    return async (req, res, next) => {
        try{

            await validator.validate(req.body);

            next();
        } catch (e) {
            res.status(409).json({
                message: e.message,
                type: e.name,
                code: 409
            })
        }
    }
}
export default validateAPI;