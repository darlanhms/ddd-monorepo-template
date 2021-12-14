import { UniqueEntityID } from '../domain/UniqueEntityID';

export abstract class BaseRepositoryMethods {
    /**
     * @method getId
     * @description função que auxilia a pegar o valor raw do ID
     */
    getId(id: string | UniqueEntityID): string {
        if (id instanceof UniqueEntityID) {
            return id.toValue();
        }

        return id;
    }
}
