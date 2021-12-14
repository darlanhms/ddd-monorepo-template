import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('book')
export default class BookEntity {
    @PrimaryColumn('uuid')
    id: string;

    @Column({ length: 255 })
    name: string;
}
