import DataGrid from "./presentation/dataGrid/DataGrid.vue";
import FormGenerator from "./presentation/components/formGenerator/formGenerator.vue";

declare module "@vue/runtime-core" {
  export interface GlobalComponents {
    DataGrid: typeof DataGrid;
    FormGenerator: typeof FormGenerator;
  }
}
