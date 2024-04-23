import type {App} from 'vue';
import DataGrid from './presentation/components/dataGrid/dataGrid.vue';
import FormGenerator from './presentation/components/formGenerator/formGenerator.vue';
import {DialogPlugin} from '@dashboard/utils/dialog/index';
import {ToastPlugin} from '@dashboard/utils/toast/index';
import {LoaderPlugin} from '@dashboard/utils/loader/index';

export function setupComponents(app: App) {
  [DataGrid, FormGenerator].forEach(component => {
    app.component(component.name, component);
  });
  app.use(DialogPlugin);
  app.use(ToastPlugin);
  app.use(LoaderPlugin);
}
