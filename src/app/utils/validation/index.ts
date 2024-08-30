import {setLocale, addMethod, string} from 'yup';

import fa from './locale';

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
