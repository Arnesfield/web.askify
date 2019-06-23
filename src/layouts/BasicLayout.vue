<template>
  <v-content>
    <slot name="prepend"/>

    <slot v-if="$slots.default"/>
    <router-view v-else/>

    <slot name="append"/>
  </v-content>
</template>
