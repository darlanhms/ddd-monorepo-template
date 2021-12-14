import { Entity } from '../domain/Entity';
import { MapperInterface } from '../domain/MapperInterface';
import { UniqueEntityID } from '../domain/UniqueEntityID';
import { BaseRepositoryMethods } from '../infra/BaseRepositoryMethods';
import { Repository } from '../infra/Repository';
import { AllOptional, GenericEntity } from '../utils/types';

export abstract class BaseFakeRepo<Domain extends Entity<any>, Interface extends GenericEntity>
    extends BaseRepositoryMethods
    implements Repository<Domain>
{
    protected _items: Interface[];

    protected abstract mapper: MapperInterface<Domain, Interface>;

    constructor() {
        super();
        this._items = [];
    }

    get items(): Interface[] {
        return this._items;
    }

    protected addFakeItem(rawItem: Interface): Interface {
        let found = false;

        for (const item of this.items) {
            if (this.compareFakeItems(item, rawItem)) {
                found = true;
            }
        }

        if (!found) {
            this.items.push(rawItem);
        }

        return rawItem;
    }

    protected updateFakeItem(rawUpdate: AllOptional<Interface>): Interface {
        let updatedItem: Interface | null = null;

        this._items = this.items.map(item => {
            if (item.id === this.getId(rawUpdate.id as UniqueEntityID)) {
                updatedItem = this.assignDefined(item, rawUpdate);
                return updatedItem;
            }
            return item;
        });

        if (!updatedItem) {
            throw new Error('Item para atualizar não encontrado');
        }

        return updatedItem;
    }

    protected removeFakeItem(id: UniqueEntityID | string): boolean {
        const oldItems = this.items;
        this._items = this.items.filter(item => item.id !== this.getId(id));

        return Boolean(oldItems.length - this.items.length);
    }

    protected abstract compareFakeItems(a: Interface, b: Interface): boolean;

    public async save(item: Domain): Promise<Domain> {
        const persistedItem = (await this.mapper.toPersistence(item)) as Interface;

        const newItem = this.addFakeItem(persistedItem);

        return this.mapper.toDomain(newItem);
    }

    public delete(): boolean {
        return true;
    }

    public async findById(id: UniqueEntityID | string): Promise<Domain | null> {
        const item = this.items.find(it => it.id === this.getId(id));

        return item ? this.mapper.toDomain(item) : null;
    }

    protected assignDefined(target: Interface, source: AllOptional<Interface>): Interface {
        Object.keys(source).forEach(key => {
            const val = source[key];
            if (val !== undefined) {
                (target as any)[key] = val;
            }
        });

        return target;
    }
}
