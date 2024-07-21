<template>
  <div class="w-full min-h-screen flex items-center justify-center">
    <div class="w-1/2 border rounded-lg border-gray-500 shadow-2xl p-10">
      <p class="text-5xl text-center mb-10 font-bold">Sign In</p>
      <div class="mb-5">
        <label for="username" class="block mb-2">username</label>
        <input
            v-model="username"
            id="username"
            class="border w-full py-2 px-3 rounded-lg"
        >
      </div>

      <div class="mb-10">
        <label for="password" class="block mb-2">Password</label>
        <input
            v-model="password"
            id="password"
            type="password"
            class="border w-full py-2 px-3 rounded-lg"
        >
      </div>

      <button
          @click="signin"
          class="w-full border py-2 px-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-300"
      >
        Sign In
      </button>
      <div class="flex justify-center mt-5" @click="navigateTo('/signup')">
        <a class="text-blue-400">Create Account</a>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue';

const username = ref('');
const password = ref('');

async function signin() {
  const formData = new FormData();
  formData.append('username', username.value);
  formData.append('password', password.value);

  try {
    await $fetch('/api/signin', {
      method: 'POST',
      body: formData,
    });
  } catch (error) {
    console.error('Error during sign-in:', error);
  }
}

definePageMeta({
  middleware: 'public',
})

</script>
