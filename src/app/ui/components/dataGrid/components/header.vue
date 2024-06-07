<template>
  <div class="table-header" v-if="withHeader">
    <slot name="header">
      <div class="table-title">
        <h3>
          <v-icon :icon="title.icon"></v-icon>
          <span>
            {{ title.text }}
          </span>
        </h3>
      </div>
      <div class="table-actions" v-if="withActionBar">
        <v-tooltip
          v-if="withRefresh"
          text="تازه کردن اطلاعات"
          location="bottom">
          <template v-slot:activator="{props}">
            <v-btn
              v-bind="props"
              @click="_reset"
              variant="text"
              icon="mdi-refresh"></v-btn>
          </template>
        </v-tooltip>
        <slot name="toollbar_right"></slot>
        <slot name="header_add">
          <v-btn
            size="large"
            prepend-icon="mdi-plus"
            variant="outlined"
            v-if="withAdd"
            class="create-btn"
            @click="create">
            <span>افزودن</span>
          </v-btn>
        </slot>
      </div>
    </slot>
  </div>
</template>
<script lang="ts" setup>
  import {useRouter, useRoute} from 'vue-router';

  interface Props {
    withHeader?: boolean;
    withActionBar?: boolean;
    withRefresh?: boolean;
    withAdd?: boolean;
    title: {text?: string; icon?: string};
    createUrl?: string;
  }
  const props = withDefaults(defineProps<Props>(), {
    withHeader: true,
    withActionBar: true,
    withRefresh: true,
    withAdd: true
  });

  const emits = defineEmits<{
    (e: 'resetTable'): void;
  }>();

  const $router = useRouter();
  const $route = useRoute();

  function create() {
    if (props.createUrl) {
      $router.push(props.createUrl);
    } else {
      $router.push($route.path + '/create');
    }
  }
  function _reset() {
    emits('resetTable');
  }
</script>
<style lang="scss" scoped>
  .table-header {
    margin-bottom: 30px;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #ebedf2;
    min-height: 80px;
    align-items: center;
    @include media(sm) {
      padding: 0 25px;
    }
    h3 {
      font-weight: 500;
      span {
        margin-right: 10px;
      }
    }
    .create-btn {
      font-size: 14px;
    }
  }
</style>
