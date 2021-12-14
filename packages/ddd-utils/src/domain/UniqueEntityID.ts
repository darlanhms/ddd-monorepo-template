import { v4 as uuid } from 'uuid';
import { Identifier } from './Identifier';

export class UniqueEntityID extends Identifier<string> {
    constructor(id: string) {
        super(id);
    }

    public static create(id?: string): UniqueEntityID {
        return new UniqueEntityID(id || uuid());
    }

    /**
     * if a valid ID is informed it will return a UniqueEntityID instance, if not, returns undefined
     */
    public static createOrUndefined(id?: string): UniqueEntityID | undefined {
        return id ? new UniqueEntityID(id) : undefined;
    }
}
