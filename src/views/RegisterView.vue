<template>
  <!-- Form -->
  <div class="container content-space-2 content-space-lg-3">
    <div
      class="flex-grow-1 mx-auto"
      style="max-width: 28rem; padding-top: 1rem; padding-bottom: 1rem"
    >
      <transition name="fade">
        <div v-if="errorMessage" class="alert alert-danger" role="alert">
          {{ errorMessage }}
        </div>
      </transition>
      <!-- Heading -->
      <div class="text-center mb-5 mb-md-7">
        <h1 class="h2">Welcome to Front</h1>
        <p>Fill out the form to get started.</p>
      </div>
      <!-- End Heading -->

      <!-- Form -->
      <form
        class="js-validate needs-validation"
        @submit="handleForm"
        novalidate
      >
        <!-- Form -->
        <div class="mb-3">
          <label class="form-label" for="signupFirstName">First name</label>
          <input
            type="text"
            class="form-control form-control-lg"
            name="first_name"
            id="signupFirstName"
            placeholder="First name"
            aria-label="First name"
            v-model="firstName"
            required
          />
          <span class="invalid-feedback">Please enter your first name.</span>
        </div>
        <!-- End Form -->

        <!-- Form -->
        <div class="mb-3">
          <label class="form-label" for="signupLastName">Last name</label>
          <input
            type="text"
            class="form-control form-control-lg"
            name="last_name"
            id="signupLastName"
            placeholder="Last name"
            aria-label="Last name"
            v-model="lastName"
            required
          />
          <span class="invalid-feedback">Please enter your last name.</span>
        </div>
        <!-- End Form -->

        <!-- Form -->
        <div class="mb-3">
          <label class="form-label" for="signupEmail">Email</label>
          <input
            type="email"
            class="form-control form-control-lg"
            name="email"
            id="signupEmail"
            placeholder="email@site.com"
            aria-label="email@site.com"
            v-model="email"
            required
          />
          <span class="invalid-feedback"
            >Please enter a valid email address.</span
          >
        </div>
        <!-- End Form -->

        <!-- Form -->
        <div class="mb-3">
          <label class="form-label" for="signupPassword">Password</label>
          <input
            type="password"
            class="form-control form-control-lg"
            name="password"
            id="signupPassword"
            placeholder="8+ characters required"
            aria-label="8+ characters required"
            v-model="password"
            required
          />
          <span class="invalid-feedback"
            >Your password is invalid. Please try again.</span
          >
        </div>
        <!-- End Form -->

        <div class="d-grid mb-3">
          <div class="d-grid mb-3">
            <button
              type="submit"
              class="btn btn-primary btn-lg"
              :disabled="loading"
            >
              <span v-if="loading"
                ><i class="bi bi-arrow-repeat"></i> Loading...</span
              >
              <span v-else>Sign Up</span>
            </button>
          </div>
        </div>

        <div class="text-center">
          <p>
            Already have an account?
            <router-link to="/" class="form-label-link">
              Log in here</router-link
            >
          </p>
        </div>
      </form>
      <!-- End Form -->
    </div>
  </div>
  <!-- End Form -->
</template>

<script setup>
import { ref } from "vue";
import { submitForm } from "@/utils/api.js"; // adjust the path according to your project structure

const firstName = ref("");
const lastName = ref("");
const email = ref("");
const password = ref("");
const errorMessage = ref("");
const loading = ref(false);

const closeAlert = () => {
  errorMessage.value = "";
};

const handleForm = async (event) => {
  event.preventDefault();

  let formData = new FormData();
  formData.append("first_name", firstName.value);
  formData.append("last_name", lastName.value);
  formData.append("email", email.value);
  formData.append("password", password.value);

  loading.value = true;

  const { data, error } = await submitForm(
    "http://127.0.0.1:7800/api/v1/auth/register/",
    formData
  );

  if (error) {
    errorMessage.value = error;
    setTimeout(closeAlert, 5000);
  } else {
    console.log(data);
    errorMessage.value = "";
  }

  loading.value = false;
};
</script>

<style scoped>
/* Add your styles here */
</style>
