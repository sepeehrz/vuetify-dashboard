import type {App} from 'vue';
import DataGrid from './components/dataGrid/dataGrid.vue';
import FormGenerator from './components/formGenerator/formGenerator.vue';
import {DialogPlugin} from '@app/utils/dialog/index';
import {ToastPlugin} from '@app/utils/toast/index';
import {LoaderPlugin} from '@app/utils/loader/index';

export function setupComponents(app: App) {
  [DataGrid, FormGenerator].forEach((component: {name: string}) => {
    app.component(component.name, component);
  });
  app.use(DialogPlugin);
  app.use(ToastPlugin);
  app.use(LoaderPlugin);
}
