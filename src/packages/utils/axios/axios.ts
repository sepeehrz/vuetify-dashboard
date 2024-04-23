import axios, {Axios as AxiosClass} from 'axios';

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const getApiUrl = () => {
  let isDev = urlParams.get('dev');
  if (isDev) {
    return 'https://localhost:5001/api';
  }
  if (window.location.host === 'admin.lendroll.ir') {
    return 'https://admin.api.lendroll.ir/api';
  } else if (window.location.host === 'org.lendroll.ir') {
    return 'https://org.api.lendroll.ir/api';
  } else if (window.location.host === 'emp.lendroll.ir') {
    return 'https://emp.api.lendroll.ir/api';
  } else if (window.location.host === 'bank.lendroll.ir') {
    return 'https://bank.api.lendroll.ir/api';
  } else {
    return 'https://test.api.lendroll.ir/api';
  }
};
export class Axios extends AxiosClass {
  constructor() {
    super();
    this.defaults = axios.defaults;
    this.defaults.baseURL = getApiUrl();
    this.defaults.headers.common.tenant = 'root';
    this.defaults.headers.common['accept-language'] = 'fa';
    this.defaults.headers.common.Authorization = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI1OGIwMzIxNC1iZTExLTQ3NGUtYmQ2NS0zODg5MWE4ZjM1N2YiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoibGVuZHJvbGwiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjhiMGVkMDRmLTQ4MDktNDhhYS04OGMzLTg0MzBkNTZjZTRmZCIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJGaXJzdG5hbWUiOiIgIiwiSWQiOiI4YjBlZDA0Zi00ODA5LTQ4YWEtODhjMy04NDMwZDU2Y2U0ZmQiLCJVc2VybmFtZSI6ImxlbmRyb2xsIiwiZXhwIjoxNzE1OTI3OTM4LCJpc3MiOiJBa2EgSWRlbnRpdHkiLCJhdWQiOiJBa2EgSWRlbnRpdHkifQ.0kNguOfJSei7F6AVU2xjUSVu1u2-SklQEUdB4TGOLUY`;
    this.defaults.validateStatus = () => true;
  }
}
