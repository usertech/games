export class AxiosResponse {
  status: number;
  data: any;
}

export default class Axios {
  public async get(url: string, options: any): Promise<AxiosResponse> {
    return {
      status: 200,
      data: [],
    };
  }
}
