<template>
  <v-row class="auth-wrapper">
    <v-col md="5" lg="4" class="form" align-self="center">
      <v-card class="form-card" elevation="3" color="#fff">
        <div class="logo">
          <v-img max-width="100%" src="/logo.png"></v-img>
        </div>
        <!-- <transition
          mode="out-in"
          enter-active-class="animated flipInX"
          leave-active-class="animated fadeOut leave"
        > -->

        <Login />
        <!-- </transition> -->
      </v-card>
    </v-col>
    <v-col md="7" lg="8" class="image-cover d-none d-md-flex">
      <div>
        <h3>لورم ایپسوم متن ساختگی</h3>
        <span>
          لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده
          از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و
          سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای
          متنوع با هدف بهبود ابزارهای کاربردی می باشد.
        </span>
      </div>
    </v-col>
  </v-row>
</template>
<script lang="ts" setup>
  import Login from './login.vue';
</script>
<style lang="scss" scoped>
  .auth-wrapper {
    height: 100vh;
    &.v-row {
      margin: 0;
    }
    .form {
      .form-card {
        margin: 0 auto;
        max-width: 500px;
        width: 100%;
        padding: 30px 20px;
        .logo {
          width: 160px;
          margin: 0 auto;
        }
      }
    }
  }
  .image-cover {
    display: flex;
    flex: 1;
    background: url('../assets/images/bg-4.jpg');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    align-items: center;
    justify-content: center;
    > div {
      width: 600px;
      color: #fff;
    }
    h3 {
      font-weight: 500;
      font-size: 48px;
      margin-bottom: 28px;
    }
    span {
      line-height: 28px;
    }
  }
</style>
