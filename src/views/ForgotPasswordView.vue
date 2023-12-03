<template>
  <!-- Form -->
  <div class="container content-space-2 content-space-lg-3">
    <div class="flex-grow-1 mx-auto" style="max-width: 28rem">
      <transition name="fade">
        <div v-if="errorMessage" class="alert alert-danger" role="alert">
          {{ errorMessage }}
        </div>
      </transition>
      <!-- Heading -->
      <div class="text-center mb-5 mb-md-7">
        <h1 class="h2">Forgot password?</h1>
        <p>Enter your email address below and we'll get you back on track.</p>
      </div>
      <!-- End Heading -->

      <!-- Form -->
      <form
        class="js-validate needs-validation"
        @submit="handleForm"
        novalidate
      >
        <div class="mb-3">
          <div class="d-flex justify-content-between align-items-center">
            <label
              class="form-label"
              for="signupSimpleResetPasswordEmail"
              tabindex="0"
              >Your email</label
            >
            <router-link to="/" class="form-label-link"
              ><i class="bi-chevron-left small ms-1"></i> Back to Log
              in</router-link
            >
          </div>

          <input
            type="email"
            class="form-control form-control-lg"
            name="email"
            id="signupSimpleResetPasswordEmail"
            tabindex="1"
            placeholder="Enter your email address"
            aria-label="Enter your email address"
            required
            v-model="email"
          />
          <span class="invalid-feedback"
            >Please enter a valid email address.</span
          >
        </div>

        <div class="d-grid mb-3">
          <button
            type="submit"
            class="btn btn-primary btn-lg"
            :disabled="loading"
          >
            <span v-if="loading"
              ><i class="bi bi-arrow-repeat"></i> Loading...</span
            >
            <span v-else>Submit</span>
          </button>
        </div>
      </form>
      <!-- End Form -->
    </div>
  </div>
  <!-- End Form -->
</template>

<script setup>
import { ref } from "vue";
// import axios from "axios";
import { submitForm } from "@/utils/api.js"; // adjust the path according to your project structure
import { useRouter } from "vue-router";

const router = useRouter();

const email = ref("");
const errorMessage = ref("");
const loading = ref(false);

const closeAlert = () => {
  errorMessage.value = "";
};

const handleForm = async (event) => {
  event.preventDefault();
  if (email.value === "" || email.value === undefined) {
    errorMessage.value = "Please enter email address!";
    setTimeout(closeAlert, 5000);
    return;
  }

  let formData = new FormData();
  formData.append("email", email.value);

  loading.value = true;

  const { data, error } = await submitForm(
    "http://127.0.0.1:7800/api/v1/auth/reset-password/",
    formData
  );

  if (!error) {
    errorMessage.value = error;
    setTimeout(closeAlert, 5000);
  } else {
    console.log(data);
    errorMessage.value = "";
    router.push("/reset-password");
  }

  loading.value = false;
};
</script>

<style scoped></style>
