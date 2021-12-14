import { Either, Entity, GenericAppError, GenericErrors, Guard, left, right, UniqueEntityID } from 'ddd-utils';

interface IBookProps {
    name: string;
}

export default class Book extends Entity<IBookProps> {
    constructor(props: IBookProps, id?: UniqueEntityID) {
        super(props, id);
    }

    get id(): UniqueEntityID {
        return this._id;
    }

    get name(): string {
        return this.props.name;
    }

    static create(props: IBookProps, id?: UniqueEntityID): Either<GenericAppError, Book> {
        const guardedProps = Guard.againstNullOrUndefinedBulk([
            {
                argument: props.name,
                argumentName: 'name',
            },
        ]);

        if (!guardedProps.succeeded) {
            return left(new GenericErrors.InvalidParam(guardedProps.message));
        }

        return right(new Book(props, id));
    }
}
