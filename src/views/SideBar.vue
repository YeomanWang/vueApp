<template>
  <n-space vertical>
    <n-switch v-model:value="collapsed" />
    <n-layout has-sider>
      <n-layout-sider
        bordered
        collapse-mode="width"
        :collapsed-width="64"
        :width="240"
        :collapsed="collapsed"
        show-trigger
        @collapse="collapsed = true"
        @expand="collapsed = false"
      >
        <n-menu
          v-model:value="activeKey"
          @update:value="navTo(activeKey)"
          :collapsed="collapsed"
          :collapsed-width="64"
          :collapsed-icon-size="22"
          :options="menuOptions"
        />
      </n-layout-sider>
      <n-layout>
        <span>内容</span>
      </n-layout>
    </n-layout>
  </n-space>
</template>

<script lang="ts">
import { defineComponent, ref, toRefs } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  props: {
    menuOptions: {
      type: Array,
      default: () => [], // 设置默认值为空数组
    },
  },
  emits: ['selectOption'],
  setup(props, ctx) {
    const { menuOption } = toRefs(props)
    const router = useRouter()
    const navTo = (key) => {
      ctx.emit('selectOption', key)
      router.push(`/dashboard/${key}/`)
    }
    return {
      activeKey: ref<string | null>(null),
      collapsed: ref(true),
      menuOption,
      navTo,
    }
  },
})
</script>
