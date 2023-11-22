type Concurrent = <T>(cbs: Array<() => Promise<T>>) => Promise<Array<T>>;

export const concurrent: Concurrent = async (callbacks) => {
    return Promise.all(callbacks.map((each) => each()));
};
