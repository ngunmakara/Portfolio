// ============================================================
// useTyping — types and deletes a list of words in a loop.
// Used by the hero title in HomeView.
// ============================================================

import { ref, onMounted, onBeforeUnmount } from 'vue'

export function useTyping(words = [], { typeSpeed = 85, deleteSpeed = 40, pause = 1600 } = {}) {
  const typed = ref('')
  const wordIndex = ref(0)
  const isDeleting = ref(false)

  let timeoutId = null
  let currentWords = words

  function tick() {
    const word = currentWords[wordIndex.value]
    const currentText = typed.value

    if (!isDeleting.value) {
      // Keep adding the next character until the word is complete.
      if (currentText.length < word.length) {
        typed.value = word.slice(0, currentText.length + 1)
        timeoutId = setTimeout(tick, typeSpeed)
      } else {
        // Word finished -> pause, then start deleting.
        isDeleting.value = true
        timeoutId = setTimeout(tick, pause)
      }
    } else {
      if (currentText.length > 0) {
        typed.value = word.slice(0, currentText.length - 1)
        timeoutId = setTimeout(tick, deleteSpeed)
      } else {
        // Word fully deleted -> move to the next word.
        isDeleting.value = false
        wordIndex.value = (wordIndex.value + 1) % currentWords.length
        timeoutId = setTimeout(tick, 250)
      }
    }
  }

  // Restart the animation, optionally with new words. Used by the
  // hero to swap typing words when the language changes.
  function restart(nextWords) {
    if (nextWords) currentWords = nextWords
    clearTimeout(timeoutId)
    wordIndex.value = 0
    isDeleting.value = false
    typed.value = ''
    if (currentWords.length) tick()
  }

  function stop() {
    clearTimeout(timeoutId)
    timeoutId = null
  }

  onMounted(() => {
    if (currentWords.length) tick()
  })

  onBeforeUnmount(() => {
    stop()
  })

  return { typed, restart }
}