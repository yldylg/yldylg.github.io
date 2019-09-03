<template>
  <!-- <div class="hello">
    <mt-button type="default">default</mt-button>
    <mt-button type="primary">primary</mt-button>
    <mt-button type="danger">danger</mt-button>
  </div>-->
  <div>
    <div ref="term" class="term"></div>
  </div>
</template>

<script>
import { Terminal } from 'xterm'
import * as fit from 'xterm/lib/addons/fit/fit'

export default {
  name: 'Term',
  data () {
    return {
        terminal: new Terminal({
            // cols: 80,
            // rows: 120,
            // cursorBlink: true, // 光标闪烁
            // cursorStyle: "block", // 光标样式  null | 'block' | 'underline' | 'bar'
            // scrollback: 800, //回滚
            // tabStopWidth: 8, //制表宽度
            // screenKeys: true,
            // textarea: false
        })
    }
  },
  methods: {
    openTerminal () {
      this.terminal.open(this.$refs.term)
      this.terminal.fit()
      this.terminal.prompt = () => {
        this.terminal.write('\r\n$ ')
      }
      this.terminal.write('Hello from \x1B[1;3;31mxterm.js\x1B[0m $ ')
    }
  },
  created () {
    Terminal.applyAddon(fit)
    this.openTerminal()
  }
}
</script>

<style scoped>
</style>
