<template>
  <router-view />
  <CmFilters />
</template>

<script setup lang="ts">
import CmFilters from "glass-studio-ui-pro";
import "glass-studio-ui-pro/style.css";
</script>

<style>
/* No scoped styles here to allow router-view to take full space */
</style>
