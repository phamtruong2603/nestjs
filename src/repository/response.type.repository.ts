export class ResponseTypeRepository<T> {
  code: string;
  status: number;
  message: string;
  data: T;
}
