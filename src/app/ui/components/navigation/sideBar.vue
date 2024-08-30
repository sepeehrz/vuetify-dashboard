<template>
  <v-navigation-drawer v-model="drawer" :rail="rail" permanent>
    <v-list-item class="menu-details" :class="{'fix-icon': rail}">
      <template v-slot:append>
        <v-btn
          color="#000"
          :icon="rail ? 'mdi-chevron-left' : 'mdi-chevron-right'"
          variant="text"
          @click.stop="rail = !rail"></v-btn>
      </template>
      <template v-if="!rail" v-slot:prepend>
        <v-avatar size="36px">
          <v-img
            alt="Avatar"
            src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460"></v-img>
        </v-avatar>
      </template>
      <template v-if="!rail" v-slot:title>لندرول</template>
    </v-list-item>
    <v-divider></v-divider>

    <railMenuItems v-if="rail" :menuItems="railMenu" />
    <navigationItems v-else :menuItems="menuItems" />
  </v-navigation-drawer>
</template>
<script lang="ts" setup>
  import {ref, watch, computed} from 'vue';
  import navigationItems from './navigationItems.vue';
  import railMenuItems from './railsMenuItems.vue';
  import {NavigationMenu} from '@app/utils';
  import {getInstance} from '@app/utils';

  interface Props {
    drawerState: boolean;
  }
  const props = withDefaults(defineProps<Props>(), {
    drawerState: true
  });

  const drawer = ref(props.drawerState);
  const rail = ref(false);
  const menuItems = getInstance(NavigationMenu).get();

  watch(
    () => props.drawerState,
    (value: boolean) => {
      drawer.value = value;
    },
    {immediate: true}
  );
  const railMenu = computed(() => {
    let menu = [];
    for (const item of menuItems) {
      if (item.child) {
        for (const child of item.child) {
          menu.push(child);
        }
      }
    }
    return menu;
  });
</script>
<style lang="scss" scoped>
  .menu-details {
    &.fix-icon {
      padding: 0;
    }
  }
</style>
