import { IEventParams } from "./IEvent";

export interface IBaseParams {
  limit?: number;
  offset?: number;
  userId?: bigint;
  adminId?: bigint;
}

export interface IParams extends IEventParams { }