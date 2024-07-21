<template>
  <div>
    <h1>Hi, {{ userAuth.username }}!</h1>
    <p>Your user ID is {{ userAuth.id }}.</p>
    <button
        @click="signout()"
        class="w-40 border py-2 px-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-300"
    >
      Sign Out
    </button>
  </div>
</template>

<script lang="ts" setup>
const userAuth = useAuthenticatedUser();
const user = useUser()

async function signout() {
  try {
    await $fetch('/api/signout', {
      method: 'POST'
    });
    user.value = null
    navigateTo('/signin');
  }catch (error) {
    console.error('Error during sign-up:', error);
  }
}

definePageMeta({
  middleware: 'protected',
})

</script>
