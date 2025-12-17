import { ZodType, ZodError } from "zod"

export const validateBody = (schema) => {
    return (req, res, next) => {
        try{
            if(schema instanceof ZodType){
                req.body = schema.parse(req.body)
                next()
            }
        }catch(err){
            if(err instanceof ZodError){
                return res.status(400).send({
                    error: 'Invalid body',
                    details: err.issues,
                })
            }
            console.error(err)
            res.status(500).send({
                error: 'Internal Server error',
            })
        }
    }
}

export const validateParams = (schema) => {
    return (req, res, next) => {
        try{
            if(schema instanceof ZodType){
                schema.parse(req.params)
                next()
            }
        }catch(err){
            if(err instanceof ZodError){
                return res.status(400).send({
                    error: 'Invalid body',
                    details: err.issues.map((issue)=>{
                        return issue.message
                    }),
                })
            }
            console.error(err)
            res.status(500).send({
                error: 'Internal Server error',
            })
        }
    }
}