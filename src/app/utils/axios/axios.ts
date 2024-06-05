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
    this.defaults.headers.common.Authorization = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJhYTdlZThlNy0xNDJhLTRjNDAtODYwMy05NWZlMjRiYzFkOWIiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoibGVuZHJvbGwiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjhiMGVkMDRmLTQ4MDktNDhhYS04OGMzLTg0MzBkNTZjZTRmZCIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJGaXJzdG5hbWUiOiJsZW5kcm9sbCBsZW5kcm9sbCIsIklkIjoiOGIwZWQwNGYtNDgwOS00OGFhLTg4YzMtODQzMGQ1NmNlNGZkIiwiVXNlcm5hbWUiOiJsZW5kcm9sbCIsImV4cCI6MTcxODYxMDQ2MSwiaXNzIjoiQWthIElkZW50aXR5IiwiYXVkIjoiQWthIElkZW50aXR5In0.CJexh5CZDq1W10wNPpHDNoZIU_r0CZFWTAtW6vMM2rE`;
    this.defaults.validateStatus = () => true;
  }
}
