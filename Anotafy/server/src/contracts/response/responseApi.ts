import { Response } from "express";
import FieldError from "../fieldError";

interface IRes {
    res: Response;
}

interface IOk extends IRes {
    message: string;
    data?: object;
}

interface ICreated extends IRes {
    message: string;
    data?: object;
}

export default class ResponseApi {
    private statusCode: number = 200;
    private responseSuccess: boolean = true;
    private responseData: any = null;
    private responseMessage: string | null = null;
    private responseErrors: FieldError[] | null = null;

    constructor(
        statusCode: number,
        responseData: any,
        responseMessage: string | null,
        responseErrors: FieldError[] | null
    ) {
        this.statusCode = statusCode;
        this.responseData = responseData;
        this.responseMessage = responseMessage;
        this.responseErrors = responseErrors;
    }

    public static Ok({ res, message, data }: IOk) {
        return res.status(200).json({
            status: 200,
            success: true,
            message: message ?? null,
            data: data ?? null,
        });
    }

    public static Created({ res, message, data }: ICreated) {
        return res.status(201).json({
            status: 201,
            success: true,
            message: message ?? null,
            data: data ?? null,
        });
    }

    public static NoContent({ res }: IRes) {
        return res.status(204);
    }
}
