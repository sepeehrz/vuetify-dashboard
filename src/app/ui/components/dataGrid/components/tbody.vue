<template>
  <slot name="data" :item="item" />
  <td>
    <slot name="actions">
      <v-menu v-if="actions && actions.length !== 0" location="right">
        <template v-slot:activator="{props: menu}">
          <v-tooltip text="عملیات ها" location="bottom">
            <template v-slot:activator="{props: tooltip}">
              <v-btn
                color="#000"
                v-bind="mergeProps(menu, tooltip)"
                variant="text"
                icon="mdi-dots-vertical"></v-btn>
            </template>
          </v-tooltip>
        </template>
        <v-list>
          <v-list-item
            v-for="(action, index) in actions"
            :key="index"
            @click="action.cb(item)">
            <v-list-item-title>
              <v-icon>{{ action.icon }}</v-icon>
              {{ action.title }}
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <slot name="edit">
        <v-tooltip v-if="withEdit" text="ویرایش" location="bottom">
          <template v-slot:activator="{props}">
            <v-btn
              color="#000"
              v-bind="props"
              class="create-btn"
              @click="_edit"
              variant="text"
              icon="mdi-pencil"></v-btn>
          </template>
        </v-tooltip>
      </slot>

      <slot name="delete">
        <v-tooltip v-if="withDelete" text="حذف" location="bottom">
          <template v-slot:activator="{props}">
            <v-btn
              color="#000"
              v-bind="props"
              class="create-btn"
              @click="_delete"
              variant="text"
              icon="mdi-delete"></v-btn>
          </template>
        </v-tooltip>
      </slot>
      <slot name="extend_action"></slot>
    </slot>
  </td>
</template>
<script lang="ts" setup>
  import {inject, mergeProps} from 'vue';
  import {useRouter, useRoute} from 'vue-router';

  interface Props {
    item: {[key: string]: any};
    withEdit: boolean;
    withDelete: boolean;
    editUrl?: (items: object) => void;
    actions?: any;
  }
  const props = withDefaults(defineProps<Props>(), {
    withEdit: true,
    withDelete: true
  });
  const emits = defineEmits<{
    (e: 'delete', items: string): void;
  }>();
  const $dialog: any = inject('dialog');
  const $router = useRouter();
  const $route = useRoute();

  function _edit() {
    if (props.editUrl) {
      props.editUrl(props.item);
    } else {
      const url = $route.path + '/' + props.item.id;
      $router.push(url);
    }
  }
  async function _delete() {
    const confirm = await $dialog.confirm({
      title: 'آیا از انجام این کار مطمئن میباشید ؟',
      ok_txt: 'بله',
      cancel_txt: 'خیر'
    });
    if (confirm) {
      emits('delete', props.item.id);
    }
  }
</script>
<style lang="scss" scoped></style>
