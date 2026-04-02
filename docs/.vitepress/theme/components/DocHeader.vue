<script setup lang="ts">
defineProps<{
  icon: string;
  title: string;
  lead?: string;
  logoSrc?: string;
  logoAlt?: string;
}>();
</script>

<template>
  <div class="doc-header">
    <div class="doc-header__badge">
      <img
        v-if="logoSrc"
        :src="logoSrc"
        :alt="logoAlt || title"
        class="doc-header__logo"
      />
      <DocIcon v-else :name="icon" :size="22" />
    </div>
    <div class="doc-header__content">
      <h1>{{ title }}</h1>
      <p v-if="lead">{{ lead }}</p>
    </div>
  </div>
</template>
