export class NavigationMenu {
  get() {
    return [
      {
        title: 'داشبرد',
        icon: 'mdi-home',
        value: 'dashboard',
        to: '/'
      },
      {
        title: 'بانک ها',
        icon: 'mdi-home',
        value: 'banks',
        child: [
          {
            to: '/test',
            title: 'مدیریت بانک ها',
            icon: 'mdi-home',
            module: ''
          },
          {
            to: '/accounts',
            title: 'مدیریت حساب ها',
            icon: 'mdi-home',
            module: ''
          }
        ]
      },
      {
        title: 'سازمان ها',
        icon: 'mdi-home',
        value: 'organizations',
        child: [
          {
            to: '/organizations',
            title: 'مدیریت سازمان ها',
            icon: 'mdi-home',
            module: ''
          },
          {
            to: '/contracts',
            title: 'مدیریت قراردادها',
            icon: 'mdi-home',
            module: ''
          }
        ]
      },
      {
        title: 'کارکنان',
        icon: 'mdi-home',
        value: 'employees',
        child: [
          {
            to: '/employees',
            title: 'مدیریت اطلاعات',
            icon: 'mdi-home',
            module: 'employees'
          },
          {
            to: '/employees-loan-requests',
            title: 'مدیریت درخواست‌ها ',
            icon: 'mdi-home',
            module: ''
          },
          {
            to: '/employees-withdraw-request',
            title: 'درخواست برداشت',
            icon: 'mdi-home',
            module: ''
          },
          {
            to: '/employees-valuation-assets',
            title: 'ارزش گذاری دارایی‌ها',
            icon: 'mdi-home',
            module: ''
          },
          {
            to: '/employees-financial-goal',
            title: 'اهداف مالی',
            icon: 'mdi-home',
            module: ''
          },
          {
            to: '/employees-retirement-plan',
            title: 'بازنشستگی',
            icon: 'mdi-home',
            module: ''
          },
          {
            to: '/employees-budget',
            icon: 'mdi-home',
            title: 'بودجه بندی',
            module: ''
          }
        ]
      }
    ];
  }
}
