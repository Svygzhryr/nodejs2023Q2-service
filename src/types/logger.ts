export interface IRequest {
  originalUrl: string;
  body: string;
  query: string;
}

export interface IResponse {
  statusCode: number;
}
