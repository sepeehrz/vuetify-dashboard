import {Axios} from '@dashboard/utils';

export class DashboardService {
  constructor(public axios: Axios) {}

  adminDashboard() {
    return this.axios.get(`/Dasboard`);
  }
  organizationLoans() {
    return this.axios.get(`/reports/LoansReport/organization/loans`);
  }
  organizationInstallments() {
    return this.axios.get(`/reports/LoansReport/organization/installments`);
  }
  bankLoans() {
    return this.axios.get(`/reports/LoansReport/Bank/loans`);
  }
  bankInstallments() {
    return this.axios.get(`/reports/LoansReport/bank/installments`);
  }
  bankOrganizationsLoans() {
    return this.axios.get(`/reports/LoansReport/Bank/organizations_loans`);
  }
}
