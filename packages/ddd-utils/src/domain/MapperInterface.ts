export interface MapperInterface<Domain, Interface extends Record<string | number | symbol, any>> {
    toDomain(raw: Interface): Promise<Domain> | Domain;
    toPersistence(raw: Domain): Promise<Interface> | Interface;
}
