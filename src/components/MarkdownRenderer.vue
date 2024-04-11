<template>
  <div v-html="markdown.render(source)" />
</template>

<script setup lang="ts">
import MarkdownIt from 'markdown-it'
import highlightjs from 'markdown-it-highlightjs'
import 'highlight.js/styles/github-dark.css'

const markdown = new MarkdownIt().use(highlightjs)

defineProps({
  source: {
    type: String,
    default: ''
  }
})
</script>
