<script setup lang="ts">
import { RouterView } from 'vue-router'
import CHeader from '../components/header.vue'
import SideBar from './SideBar.vue'
import type { MenuOption } from 'naive-ui'
const menuOptions: MenuOption[] = [
  {
    label: '且听风吟',
    key: 'profile',
  },
  {
    label: '1973年的弹珠玩具',
    key: 'pinball-1973',
    children: [
      {
        label: '鼠',
        key: 'posts',
      },
    ],
  },
  {
    label: '寻羊冒险记',
    key: 'a-wild-sheep-chase',
  },
  {
    label: '舞，舞，舞',
    key: 'dance-dance-dance',
    children: [
      {
        type: 'group',
        label: '人物',
        key: 'people',
        children: [
          {
            label: '叙事者',
            key: 'narrator',
          },
          {
            label: '羊男',
            key: 'sheep-man',
          },
        ],
      },
      {
        label: '饮品',
        key: 'beverage',
        children: [
          {
            label: '威士忌',
            key: 'whisky',
          },
        ],
      },
      {
        label: '食物',
        key: 'food',
        children: [
          {
            label: '三明治',
            key: 'sandwich',
          },
        ],
      },
      {
        label: '过去增多，未来减少',
        key: 'the-past-increases-the-future-recedes',
      },
    ],
  },
]

const handleSelectOption = (key: string) => {
  console.log('Received key from child:', key)
}
</script>

<template>
  <div class="container"></div>
  <header style="grid-area: header">
    <CHeader />
  </header>
  <aside style="grid-area: sidebar">
    <SideBar :menuOptions="menuOptions" @select-option="handleSelectOption" />
  </aside>
  <main style="grid-area: main">
    <RouterView />
  </main>
  <footer style="grid-area: footer">This is a site footer</footer>
</template>

<style scoped>
.container {
  display: grid;
  grid-template-rows: 50px calc(100vh - 100px) 50px;
  grid-template-columns: 25% 25% 25% 25%;
  grid-template-areas:
    'header header header header'
    'sidebar main main main '
    'footer footer footer footer';
  padding: 0 2rem;
}

header {
  display: flex;
  place-items: center;
  height: 50px;
  box-shadow: 0 -6px 10px 5px rgba(0, 0, 0, 0.5);
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    height: 50px;
    box-shadow: 0 -6px 10px 5px rgba(0, 0, 0, 0.5);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
