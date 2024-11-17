import { defineStore } from 'pinia'

// export const useCounterStore = defineStore('counter', () => {
//   const count = ref(0)
//   const doubleCount = computed(() => count.value * 2)
//   function increment() {
//     count.value++
//   }
//   function decrement() {
//     count.value--
//   }

//   async function incrementAsync() {
//     await new Promise(resolve => setTimeout(resolve, 1000));
//     increment();
//   }

//   return { count, doubleCount, increment, decrement, incrementAsync}
// })

export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0
  }),
  getters: {
    // 计算属性 doubleCount，返回 count 的两倍
    doubleCount: (state) => state.count * 2
  },
  actions: {
    increment() {
      this.count++
    },
    decrement() {
      this.count--
    },
    async incrementAsync() {
      await new Promise(resolve => setTimeout(resolve, 1000));
      this.increment();
    }
  }
})
