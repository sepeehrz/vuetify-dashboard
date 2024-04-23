import {setLocale, addMethod, string} from 'yup';

import fa from './ind';

setLocale(fa);

addMethod(string, 'creditCardLength', function (errorMessage) {
  return this.test(`test-card-length`, errorMessage, function (value) {
    const {path, createError} = this;
    return (
      (value && value.length === 16) ||
      createError({path, message: errorMessage})
    );
  });
});
