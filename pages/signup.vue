<template>
  <div class="w-full min-h-screen flex items-center justify-center">
    <div class="w-1/2 border rounded-lg border-gray-500 shadow-2xl p-10">
      <p class="text-5xl text-center mb-10 font-bold">Sign Up</p>

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
          @click="signup"
          class="w-full border py-2 px-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-300"
      >
        Create
      </button>
      <div class="pt-5 cursor-pointer" @click="navigateTo('/signin')">
        <a class="text-black">if you already have an account <span class="text-blue-400">sign in</span></a>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue';

const username = ref('');
const password = ref('');

async function signup() {
  const formData = new FormData();
  formData.append('username', username.value);
  formData.append('password', password.value);

  try {
    await $fetch('/api/signup', {
      method: 'POST',
      body: formData,
    });
    username.value = ''
    password.value = ''
    alert('Add User Success')
  } catch (error) {
    console.error('Error during sign-up:', error);
  }
}

definePageMeta({
  middleware: 'public',
})

</script>
