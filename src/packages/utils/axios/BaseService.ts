import {AxiosResponse} from 'axios';
import {Iparams, IListOption, RequestAxiosInstance} from './types/AxiosTypes';
export class BaseService {
  path;
  constructor(public $axios: RequestAxiosInstance, path: string) {
    this.path = path;
  }
  $get(id: number | string | string[]): Promise<AxiosResponse> {
    return this.$axios.get(this.path + '/' + id);
  }
  $save(obj: any): Promise<AxiosResponse> {
    return this.$axios.post(this.path, obj);
  }
  // Promise<IListOption<AxiosResponse>> jaygozin e type paEn
  $query(params?: Iparams): Promise<AxiosResponse> {
    return this.$axios.get(this.path, {params});
  }
  $update(id: number | string, obj: any): Promise<AxiosResponse> {
    return this.$axios.put(this.path + '/' + id, obj);
  }
  $delete(id: number | string): Promise<AxiosResponse> {
    return this.$axios.delete(this.path + '/' + id);
  }
  $restore(id: number) {
    return this.$axios.put(this.path + '/restore' + '/' + id);
  }
  $logs(id: number) {
    return this.$axios.get(`/Logs/${id}`);
  }
  $excel(params: any) {
    return this.$axios.get(this.path, {
      responseType: 'arraybuffer',
      params
    });
  }
}
