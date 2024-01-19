<template>
  <nav>
    <router-link to="/dashboard">Dashboard</router-link>
    <div>
      <div class="user-profile-icon">
        <font-awesome-icon icon="fa-solid fa-user" />
      </div>
    </div>
  </nav>
</template>

<script>
export default {};
</script>

<style scoped lang="less">
@import '../variables.less';

nav {
  margin: 0;
  padding: 0;
  display: flex;
  background-color: @navbar-background;
  height: 80px;

  a {
    margin: auto;
    padding: 16px;
    color: @white;
    font-size: 24px;
    text-decoration: none;
  }

  div {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
}

.user-profile-icon {
  display: flex;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  transform: translateX(-50%);
  background-color: @gray;
  cursor: pointer;

  :first-child {
    color: @white;
  }
}
</style>
