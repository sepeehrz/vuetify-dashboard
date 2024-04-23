import theme from './theme';
import {createVuetify} from 'vuetify';
import {md3} from 'vuetify/blueprints';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

const vuetify = createVuetify({
  components,
  directives,
  blueprint: md3,
  theme,
  defaults: {
    VTextField: {
      color: 'primary'
    }
  }
});

export default vuetify;
