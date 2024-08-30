import {Axios} from './axios';
import {AxiosResponse} from 'axios';
import {Iparams} from './types';

export class BaseService extends Axios {
  path;
  constructor(path: string) {
    super();
    this.path = path;
  }
  $get(id: number | string | string[]): Promise<AxiosResponse> {
    return this.$axios.get(this.path + '/' + id);
  }
  $save(obj: any): Promise<AxiosResponse> {
    return this.$axios.post(this.path, obj);
  }
  $query(params?: Iparams): Promise<AxiosResponse> {
    return this.$axios.get(this.path, {params});
  }
  $update(id: number | string, obj: any): Promise<AxiosResponse> {
    return this.$axios.put(this.path + '/' + id, obj);
  }
  $delete(id: number | string): Promise<AxiosResponse> {
    return this.$axios.delete(this.path + '/' + id);
  }

  $list(headers?: object, params?: object) {
    return this.$axios.get(this.path + '/list', {headers, params});
  }
  $export(headers: object, path?: string) {
    return this.$axios.get(path ? path : this.path + '/export', {
      headers,
      responseType: 'arraybuffer'
    });
  }
  $queryWithHeader(headers: object, params?: object) {
    return this.$axios.get(this.path, {headers, params});
  }
  $updateWithHeader(obj: any, headers?: object): Promise<AxiosResponse> {
    return this.$axios.put(this.path, obj, {headers});
  }
  $deleteWithHeader(headers?: object): Promise<AxiosResponse> {
    return this.$axios.delete(this.path, {headers});
  }
  $deleteListWithHeader(headers?: object): Promise<AxiosResponse> {
    return this.$axios.get(this.path + '/deleted/list', {headers});
  }
  $restoreWithHeader(headers?: object): Promise<AxiosResponse> {
    return this.$axios.put(this.path + '/deleted/restore', {}, {headers});
  }
}
