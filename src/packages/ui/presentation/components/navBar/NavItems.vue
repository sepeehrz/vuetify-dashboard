<template>
  <div class="Lr--navbar">
    <ul>
      <li v-for="(item, index) in items" :key="index">
        <router-link :to="item.to">{{ item.title }}</router-link>
      </li>
    </ul>
  </div>
</template>
<script lang="ts" setup>
  import {IItems} from './types';
  interface Props {
    items: IItems[];
  }
  defineProps<Props>();
</script>
<style lang="scss" scoped>
  .Lr--navbar {
    padding: 0 16px 10px;
    border-bottom: 1px solid #ccae2c80;
    ul {
      list-style-type: none;
      display: flex;
      align-items: center;
      padding: 0;
      margin: 0;
      li {
        a {
          margin-left: 24px;
          color: #000;
          font-size: 16px;
          font-weight: 500;
          text-decoration: none;
          position: relative;
          display: block;
          @include media(md) {
            width: 200px;
          }
          &::before {
            content: '';
            position: absolute;
            bottom: -10px;
            left: 0;
            width: 100%;
            border: 4px solid #d9d9d9;
            border-radius: 100px 100px 0 0;
          }
          &.router-link-exact-active {
            &::before {
              border-color: #c9a703;
            }
          }
        }
      }
    }
  }
</style>
