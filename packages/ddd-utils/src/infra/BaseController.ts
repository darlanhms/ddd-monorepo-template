import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { GenericAppError } from '../logic/GenericAppError';
import { GenericErrors } from '../logic/GenericErrors';
import { sanitizeObject } from '../utils/textHelpers';

export default abstract class BaseController {
    protected abstract executeImplementation(req: Request, res: Response): Promise<void | any>;

    public async execute(req: Request, res: Response): Promise<void> {
        try {
            await this.executeImplementation(req, res);
        } catch (error: any) {
            console.log(`[BaseController]: Uncaught controller error`);
            console.log(error);

            this.fail(res, error);
        }
    }

    /**
     * returns an object with merged props from req body and params
     */
    public payload(req: Request): any {
        if (Array.isArray(req.body)) {
            return req.body.map(item => ({ ...sanitizeObject(item), ...req.query, ...req.params }));
        }

        return { ...sanitizeObject(req.body), ...req.query, ...req.params };
    }

    public static jsonResponse(res: Response, code: number, message: string): Response {
        return res.status(code).json({ message });
    }

    public ok<T>(res: Response, dto?: T): Response {
        if (dto) {
            return res.status(StatusCodes.OK).json(dto);
        }
        return res.sendStatus(StatusCodes.OK);
    }

    public fail(res: Response, error?: Error | string | unknown): Response {
        console.error(error);

        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: 'Não foi possível realizar a requisição',
        });
    }

    public clientError(res: Response, message?: string): Response {
        return BaseController.jsonResponse(res, StatusCodes.BAD_REQUEST, message || 'Unauthorized');
    }

    public unauthorized(res: Response, message?: string): Response {
        return BaseController.jsonResponse(res, StatusCodes.UNAUTHORIZED, message || 'Unauthorized');
    }

    public paymentRequired(res: Response, message?: string): Response {
        return BaseController.jsonResponse(res, StatusCodes.PAYMENT_REQUIRED, message || 'Payment required');
    }

    public forbidden(res: Response, message?: string): Response {
        return BaseController.jsonResponse(res, StatusCodes.FORBIDDEN, message || 'Forbidden');
    }

    public notFound(res: Response, message?: string): Response {
        return BaseController.jsonResponse(res, StatusCodes.NOT_FOUND, message || 'Not found');
    }

    public conflict(res: Response, message?: string): Response {
        return BaseController.jsonResponse(res, StatusCodes.CONFLICT, message || 'Conflict');
    }

    public tooMany(res: Response, message?: string): Response {
        return BaseController.jsonResponse(res, StatusCodes.TOO_MANY_REQUESTS, message || 'Too many requests');
    }

    public genericErrorResponse(res: Response, error: GenericAppError): Response {
        const statusCode = GenericErrors.getStatusCode(error);

        return BaseController.jsonResponse(res, statusCode, error.message);
    }
}
