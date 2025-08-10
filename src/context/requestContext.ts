import { AsyncLocalStorage } from "async_hooks";

interface RequestContext {
  payload: any;
}

const asyncLocalStorage = new AsyncLocalStorage<RequestContext>();

export const requestContext = {
  run: (context: RequestContext, callback: () => Promise<any>) => {
    return asyncLocalStorage.run(context, callback);
  },
  get: (): RequestContext | undefined => {
    return asyncLocalStorage.getStore();
  },
}