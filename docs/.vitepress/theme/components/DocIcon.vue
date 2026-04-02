<script setup lang="ts">
import {
  BookOpen,
  Boxes,
  Cable,
  Code2,
  Compass,
  FlaskConical,
  GalleryVerticalEnd,
  House,
  LayoutTemplate,
  Map,
  Package,
  PlugZap,
  ServerCog,
  ShieldCheck,
  SquareDashedMousePointer,
  Telescope,
  Wrench,
} from "lucide-vue-next";
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    name: string;
    size?: number;
    strokeWidth?: number;
  }>(),
  {
    size: 20,
    strokeWidth: 1.9,
  },
);

const icons = {
  api: Cable,
  architecture: Map,
  charts: LayoutTemplate,
  code: Code2,
  compass: Compass,
  contributing: FlaskConical,
  core: Boxes,
  development: Code2,
  docs: BookOpen,
  enterprise: GalleryVerticalEnd,
  home: House,
  operation: ServerCog,
  plan: Telescope,
  plugins: PlugZap,
  pointer: SquareDashedMousePointer,
  portal: Compass,
  product: Package,
  security: ShieldCheck,
  settings: Wrench,
} as const;

const iconComponent = computed(
  () => icons[props.name as keyof typeof icons] ?? BookOpen,
);
</script>

<template>
  <component
    :is="iconComponent"
    :size="size"
    :stroke-width="strokeWidth"
    class="doc-icon"
  />
</template>
