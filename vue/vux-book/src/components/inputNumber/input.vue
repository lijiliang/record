<template>
  <div class="input-number">
    <input type="text" :value="currentValue" @change="handleChange">
    <button @click="handleDown" :disabled="currentValue <= min">-</button>
    <button @click="handleUp" :disabled="currentValue >= max">+</button>
  </div>
</template>
<script>
// function isValueNumber (value) {
//   return (/(^-?[0-9]+\.{1}\d+$)|(^->[1-9]*$)|(^-?0{1}$)/).test(value + '')
// }

export default {
  props: {
    max: {
      type: Number,
      default: Infinity
    },
    min: {
      type: Number,
      default: -Infinity
    },
    value: {
      type: Number,
      default: 0
    },
    step: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      currentValue: this.value
    }
  },
  watch: {
    currentValue: function (val) {
      this.$emit('input', val)
      this.$emit('on-change', val)
    },
    value: function (val) {
      this.updateValue(val)
    }
  },
  methods: {
    updateValue (val) {
      if (val > this.max) val = this.max
      if (val < this.min) val = this.min
      this.currentValue = val
    },
    handleChange (event) {
      var val = event.target.value.trim()
      var max = this.max
      var min = this.min
      // if (isValueNumber(val)) {
      val = Number(val)
      this.currentValue = val
      if (val > max) {
        this.currentValue = max
      } else if (val < min) {
        this.currentValue = min
      } else {
        event.target.value = this.currentValue
      }
      // }
    },
    handleDown () {
      if (this.currentValue <= this.min) return
      this.currentValue -= this.step
    },
    handleUp () {
      if (this.currentValue >= this.max) return
      this.currentValue += this.step
    }
  },
  mounted () {
    this.updateValue(this.value)
  }
}
</script>
