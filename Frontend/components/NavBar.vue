<template>
  <nav>
    <router-link to="/dashboard">Dashboard</router-link>
    <div>
      <span>Hello, {{ userFullName }}!</span>
      <input v-model="dropdownOpen" class="dropdown" type="checkbox" />
      <div class="user-profile-icon">
        <font-awesome-icon icon="fa-solid fa-user" />
      </div>
      <div class="section-dropdown">
        <router-link to="/account">Account</router-link>
        <a @mouseup="handleSignOut">Log out</a>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { useUserStore } from '../stores/store';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const userStore = useUserStore();
    const router = useRouter();
    const dropdownOpen = ref(false);

    onMounted(() => {
      document.addEventListener('click', handleBodyClick);
    });

    onUnmounted(() => {
      document.removeEventListener('click', handleBodyClick);
    });

    router.beforeEach(() => {
      dropdownOpen.value = false;
      return true;
    });

    const handleSignOut = async () => {
      await userStore.signOutUser();
      router.push('/login');
    };

    const handleBodyClick = (event: MouseEvent) => {
      if (
        dropdownOpen.value &&
        !(event.target as HTMLElement).closest('.section-dropdown')
      ) {
        dropdownOpen.value = false;
      }
    };

    const userFullName = computed(() => {
      return `${userStore.user.firstName} ${userStore.user.lastName}`;
    });

    return {
      dropdownOpen,
      handleSignOut,
      userFullName,
    };
  },
};
</script>

<style scoped lang="less">
@import '../variables.less';

nav {
  margin: 0;
  padding: 0;
  display: flex;
  background-color: @navbar-background;
  height: 80px;
  user-select: none;

  a {
    margin: auto 16px;
    color: @white;
    font-size: 24px;
    text-decoration: none;
  }

  div {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;

    span {
      color: @white;
    }
  }
}

.user-profile-icon {
  margin: 0;
  display: flex;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  transform: translateX(-50%);
  background-color: @gray;
  cursor: pointer;

  svg {
    color: @white;
  }
}

.dropdown {
  appearance: none;
  -webkit-appearance: none;
  margin: 0;
  z-index: 1;
  width: 40px;
  height: 40px;
  background-color: transparent;
  border-radius: 50%;
  transform: translateX(50%);
  cursor: pointer;

  &:active,
  &:checked:active {
    box-shadow: inset 0 0 5px 2px rgb(36, 36, 36);
  }

  &:checked {
    border: 1px solid @white;

    ~ .section-dropdown {
      opacity: 1;
      pointer-events: auto;
      transform: translateY(0);
    }
  }
}

.section-dropdown {
  display: flex;
  flex-direction: column;
  position: absolute;
  background-color: @charcoal;
  top: 90px;
  right: 8px;
  width: auto;
  border-radius: 4px;
  opacity: 0;
  pointer-events: none;
  transform: translateY(20px);
  transition: all 200ms linear;
  box-shadow: 0 14px 35px 0 rgba(9, 9, 12, 0.4);
  padding: 16px 32px;
  gap: 16px;

  a {
    margin: 0;
    display: flex;
    color: @white;
    font-size: 16px;
    cursor: pointer;
  }

  &:after {
    content: '';
    position: absolute;
    top: -20px;
    right: 18px;
    border-left: 16px solid transparent;
    border-right: 16px solid transparent;
    border-bottom: 20px solid @charcoal;
    display: block;
    z-index: 2;
    transition: all 200ms linear;
  }
}
</style>
