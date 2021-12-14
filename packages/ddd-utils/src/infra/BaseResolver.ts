import { ApolloError, ForbiddenError, AuthenticationError } from 'apollo-server-express';
import { GenericAppError } from '../logic/GenericAppError';
import { GenericErrors } from '../logic/GenericErrors';

type GqlError = ApolloError;

export abstract class BaseResolver<D = any, R = any> {
    public abstract execute(payload: D): Promise<R>;

    public static fail(error?: Error | string): GqlError {
        if (error) {
            console.error(error);
        } else {
            console.error('Erro inesperado ao executar resolver');
        }

        return new ApolloError('Não foi possível realizar a requisição', 'UNEXPECTED_ERROR');
    }

    public static clientError(message?: string): GqlError {
        return new ApolloError(message || 'Verifique os campos da requisição', 'INVALID_PARAM');
    }

    public static unauthorized(message?: string): GqlError {
        return new AuthenticationError(message || 'Sem permissão para executar essa ação.');
    }

    public static paymentRequired(message?: string): GqlError {
        return new ApolloError(
            message || 'É necessário fazer o pagamento para executar essa ação',
            'PAYMENT_REQUIRED',
        );
    }

    public static forbidden(message?: string): GqlError {
        return new ForbiddenError(message || 'Ação rejeitada');
    }

    public static notFound(message?: string): GqlError {
        return new ApolloError(message || 'Conteúdo não encontrado no momento', 'NOT_FOUND');
    }

    public static conflict(message?: string): GqlError {
        return new ApolloError(message || 'Conflito entre ações', 'CONFLICT');
    }

    public static tooMany(message?: string): GqlError {
        return new ApolloError(message || 'Muitas requisições', 'TOO_MANY');
    }

    public static genericErrorResponse(error: GenericAppError): GqlError {
        switch (error.constructor) {
            case GenericErrors.NotFound:
                return this.notFound(error.message);
            case GenericErrors.NotCreated:
                return this.forbidden(error.message);
            case GenericErrors.NotAuthorized:
                return this.unauthorized(error.message);
            case GenericErrors.Unexpected:
                return this.fail(error.message);
            case GenericErrors.InvalidParam:
                return this.clientError(error.message);
            default:
                return this.fail(error.message);
        }
    }
}
