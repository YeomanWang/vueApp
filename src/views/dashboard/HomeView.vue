<script setup lang="ts">
import { onMounted } from 'vue'
import SideBar from './SideBar.vue'
import type { MenuOption } from 'naive-ui'
// import {
//   BookOutline as BookIcon
// } from '@vicons/ionicons5'
// function renderIcon(icon: Component) {
//   return () => h(NIcon, null, { default: () => h(icon) })
// }
const menuOptions: MenuOption[] = [
  {
    label: '王一一的照片',
    key: 'photos',
  },
  {
    key: 'divider-1',
    type: 'divider',
    props: {
      style: {
        marginLeft: '32px'
      }
    }
  },
  {
    label: '杂七杂八',
    key: 'test',
    // icon: renderIcon(BookIcon)
  },
  {
    label: '王一一的视频',
    key: 'video',
    // icon: renderIcon(BookIcon)
  },
]
onMounted(() => {})

</script>

<template>
  <div class="content">
    <aside>
      <SideBar :menuOptions="menuOptions" @select-option="handleSelectOption" />
    </aside>
    <main style="width:100%; overflow-y: auto; padding: 2rem;">
      <RouterView />
    </main>
  </div>
</template>
<style>
.content {
  display: flex;
  width: 100%;
  height: 100%;
}
</style>
