<template>
  <n-space vertical>
    <!-- <n-layout has-sider>
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
 
      </n-layout-sider>
      <n-layout>
        <span>&nbsp; &nbsp;</span>
      </n-layout> 
    </n-layout>-->
    <n-menu
      v-model:value="activeKey"
      @update:value="navTo(activeKey)"
      :collapsed-icon-size="22"
      :options="menuOptions"
    />
  </n-space>
</template>

<script lang="ts">
import { defineComponent, ref, toRefs } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  props: {
    menuOptions: {
      type: Array<object>,
      default: () => [], // 设置默认值为空数组
    },
  },
  emits: ['selectOption'],
  setup(props, ctx) {
    const menuOptionRef  = toRefs(props)
    const router = useRouter()
    const navTo = (key: string | null) => {
      ctx.emit('selectOption', key)
      router.push(`/dashboard/${key}/`)
    }
    return {
      activeKey: ref<string | null>(null),
      collapsed: ref(true),
      menuOptionRef,
      navTo,
    }
  },
})
</script>
