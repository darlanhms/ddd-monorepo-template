import { UniqueEntityID } from '../domain/UniqueEntityID';

export type SingleEntityResponse<T> = Promise<T | null> | T | null;

export type MultiEntityResponse<T> = Promise<T[]> | T[];

export interface Repository<Domain> {
    save(entity: Domain): SingleEntityResponse<Domain>;
    delete(id: UniqueEntityID | string): Promise<boolean> | boolean;
    findById(id: UniqueEntityID | string): SingleEntityResponse<Domain>;
}
