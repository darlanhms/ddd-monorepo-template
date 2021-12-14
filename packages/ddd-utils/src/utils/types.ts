/* eslint-disable @typescript-eslint/ban-types */
import { UniqueEntityID } from '../domain/UniqueEntityID';

export type UpdateDTO<T> = {
    [P in keyof T]?: T[P] extends Record<any, any> ? Partial<T[P]> : T[P];
} & {
    id: string;
};

export type AllOptional<T> = {
    [P in keyof T]?: T[P] | undefined;
};

export type GenericId = string | UniqueEntityID;

export type GenericEntity = Record<string | number | symbol, any> & { id: UniqueEntityID | string };

export type GenericTokenPayload = string | object | Buffer;

export type OmitDefault<T extends GenericEntity, OtherFields extends keyof T = 'id'> = Omit<
    T,
    'id' | 'createdAt' | 'updatedAt' | 'deletedAt' | OtherFields
>;
