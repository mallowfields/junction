<template>
  <div class="loading-container">
    <v-progress-circular
      :indeterminate="true"
      :size="inline ? 32 : 128"
      :width="inline ? 4 : 8"
      color="main"
    ></v-progress-circular>
  </div>
</template>

<script>
export default {
  props: {
    inline: {
      type: Boolean,
      default: false
    }
  }
}
</script>
