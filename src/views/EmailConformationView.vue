<template>
  <div class="container">
    <h2>Email Verification</h2>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="email">Email</label>
        <input
          type="email"
          id="email"
          v-model="email"
          class="form-control"
          required
        />
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
    <transition name="fade">
      <div v-if="errorMessage" class="alert alert-danger" role="alert">
        {{ errorMessage }}
      </div>
    </transition>
    <router-link to="/login">Back to Log in</router-link>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { submitForm } from "../utils/api";

const email = ref("");
const errorMessage = ref("");

const handleSubmit = async () => {
  const formData = new FormData();
  formData.append("email", email.value);

  const { data, error } = await submitForm(
    "http://127.0.0.1:7800/api/v1/auth/account-verification/",
    formData
  );

  if (error) {
    errorMessage.value = error;
    setTimeout(() => {
      errorMessage.value = "";
    }, 5000);
  } else {
    console.log(data);
  }
};
</script>

<style scoped></style>
