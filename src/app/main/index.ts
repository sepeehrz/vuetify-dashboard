import {createApp, h} from 'vue';
import {RouterView} from 'vue-router';
import {startApplication} from '@app/application';

createApp({
  render() {
    return h(RouterView);
  }
})
  .use(startApplication)
  .mount('#app');
