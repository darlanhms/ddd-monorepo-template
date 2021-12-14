export interface InitReturn {
    commit: () => Promise<void>;
    rollback: () => Promise<void>;
}

export interface ITransactionManager {
    init(): Promise<InitReturn>;
}
