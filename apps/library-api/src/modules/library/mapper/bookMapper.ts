import BookEntity from '@infra/TypeORM/entities/book';
import { UniqueEntityID } from 'ddd-utils';
import Book from '@library/domain/book';
import BookDTO from '@library/dtos/book';

export default class BookMapper {
    static toDomain(book: BookEntity): Book {
        return Book.create(
            {
                name: book.name,
            },
            new UniqueEntityID(book.id),
        ).value as Book;
    }

    static toPersistence(book: Book): BookEntity {
        return {
            id: book.id.toValue(),
            name: book.name,
        };
    }

    static toDTO(book: Book): BookDTO {
        return {
            id: book.id.toValue(),
            name: book.name,
        };
    }
}
