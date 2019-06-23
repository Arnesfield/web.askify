<template>
  <v-content>
    <slot v-if="$slots.default"/>
    <router-view v-else/>
  </v-content>
</template>
