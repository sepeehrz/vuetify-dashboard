import {createApp, h} from 'vue';
import {RouterView} from 'vue-router';
import {startApplication} from '@app/application';
export {startApplication, defineModule, get} from './setup';

createApp({
  render() {
    return h(RouterView);
  }
})
  .use(startApplication)
  .mount('#app');
