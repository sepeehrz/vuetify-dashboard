import DataGrid from './components/dataGrid/DataGrid.vue';
import FormGenerator from './components/formGenerator/formGenerator.vue';

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    DataGrid: typeof DataGrid;
    FormGenerator: typeof FormGenerator;
  }
}
