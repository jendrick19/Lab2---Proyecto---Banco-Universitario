<script setup>
import logoImg from '@/assets/logo-no-background.png'

const socialLinks = [
  {
    name: 'Facebook',
    href: 'https://facebook.com/bancouniversitariove',
    path: 'M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.5-3.9 3.78-3.9 1.1 0 2.25.2 2.25.2v2.47h-1.27c-1.25 0-1.64.78-1.64 1.57V12h2.8l-.45 2.89h-2.35v6.99A10 10 0 0 0 22 12Z'
  },
  {
    name: 'Instagram',
    href: 'https://instagram.com/bancouniversitariove',
    path: 'M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm8.5 1.75h-8.5A4 4 0 0 0 3.75 7.75v8.5a4 4 0 0 0 4 4h8.5a4 4 0 0 0 4-4v-8.5a4 4 0 0 0-4-4Zm-4.25 3.5a4.75 4.75 0 1 1 0 9.5 4.75 4.75 0 0 1 0-9.5Zm0 1.75a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm5.25-.88a1.13 1.13 0 1 1-2.25 0 1.13 1.13 0 0 1 2.25 0Z'
  },
  {
    name: 'Twitter',
    href: 'https://twitter.com/bancouniversitariove',
    path: 'M18.9 2H22l-6.8 7.78L23 22h-6.1l-4.78-6.24L6.66 22H3.55l7.27-8.31L1 2h6.25l4.32 5.68L18.9 2Zm-1.08 18h1.69L6.33 3.9H4.52L17.82 20Z'
  }
]
</script>

<template>
  <footer class="bg-[#085163] text-white">
    <div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div class="flex flex-col items-center justify-between gap-6 md:flex-row">
        <div class="flex flex-col items-center gap-4 md:flex-row">
          <a href="/" class="flex items-center">
            <img :src="logoImg" alt="Banco Universitario" class="h-10 w-auto brightness-0 invert" />
          </a>
          <p class="text-sm text-white">© 2026 Banco Universitario</p>
        </div>

        <div class="flex items-center gap-4">
          <div class="flex gap-3">
            <a
              v-for="social in socialLinks"
              :key="social.name"
              :href="social.href"
              target="_blank"
              rel="noopener noreferrer"
              class="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-[#49beb7]"
              :aria-label="social.name"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="h-5 w-5"
                aria-hidden="true"
              >
                <path :d="social.path" />
              </svg>
            </a>
          </div>
          <span class="text-sm text-white/80">@bancouniversitariove</span>
        </div>
      </div>
    </div>
  </footer>
</template>
