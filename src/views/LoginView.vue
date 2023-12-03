<script setup>
import { ref, computed } from "vue";
import axios from "axios";

const email = ref("");
const password = ref("");
const errorMessage = ref("");
const passwordVisible = ref(false);
const loading = ref(false);

const closeAlert = () => {
  errorMessage.value = "";
};

const passwordFieldType = computed(() =>
  passwordVisible.value ? "text" : "password"
);

const togglePasswordVisibility = () => {
  passwordVisible.value = !passwordVisible.value;
};

const submitForm = async (event) => {
  event.preventDefault();

  loading.value = true;

  let formData = new FormData();
  formData.append("username", email.value);
  formData.append("password", password.value);

  try {
    const response = await axios.post(
      "https://click.emailflow.ai/login",
      formData,
      {
        maxBodyLength: Infinity,
      }
    );

    console.log(response.data);
    errorMessage.value = "";
  } catch (error) {
    errorMessage.value = error?.response?.data?.message || "An error occurred";
    console.error(error);
    setTimeout(closeAlert, 5000);
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <main style="width: 100%">
    <!-- Form -->
    <div class="container content-space-2 content-space-lg-3" style="">
      <div class="flex-grow-1 mx-auto" style="max-width: 28rem">
        <transition name="fade">
          <div v-if="errorMessage" class="alert alert-danger" role="alert">
            {{ errorMessage }}
          </div>
        </transition>
        <!-- Heading -->
        <div class="text-center mb-5 mb-md-7">
          <h1 class="h2">Welcome back</h1>
          <p>Login to manage your account.</p>
        </div>
        <!-- End Heading -->

        <!-- Form -->
        <form
          class="js-validate needs-validation"
          @submit="submitForm"
          novalidate
        >
          <!-- Form -->
          <div class="mb-4">
            <label class="form-label" for="signupSimpleLoginEmail"
              >Your email</label
            >
            <input
              v-model="email"
              type="email"
              class="form-control form-control-lg"
              name="email"
              id="signupSimpleLoginEmail"
              placeholder="email@site.com"
              aria-label="email@site.com"
              required
            />
            <span class="invalid-feedback"
              >Please enter a valid email address.</span
            >
          </div>
          <!-- End Form -->

          <!-- Form -->
          <div class="mb-4">
            <div class="d-flex justify-content-between align-items-center">
              <label class="form-label" for="signupSimpleLoginPassword"
                >Password</label
              >

              <router-link to="/forgot-password" class="form-label-link"
                >Forgot Password?</router-link
              >
            </div>

            <div
              class="input-group input-group-merge"
              data-hs-validation-validate-class
            >
              <input
                v-model="password"
                :type="passwordFieldType"
                class="form-control form-control-lg"
                name="password"
                id="signupSimpleLoginPassword"
                placeholder="8+ characters required"
                aria-label="8+ characters required"
                required
                minlength="8"
              />
              <button
                type="button"
                class="input-group-append input-group-text"
                @click="togglePasswordVisibility"
              >
                <i :class="passwordVisible ? 'bi-eye' : 'bi-eye-slash'"></i>
              </button>
            </div>

            <span class="invalid-feedback">Please enter a valid password.</span>
          </div>
          <!-- End Form -->

          <div class="d-grid mb-3">
            <button
              type="submit"
              class="btn btn-primary btn-lg"
              :disabled="loading"
            >
              <span v-if="loading">
                <i class="bi bi-arrow-repeat"></i> Loading...
              </span>
              <span v-else> Log in </span>
            </button>
          </div>

          <div class="text-center">
            <p>
              Don't have an account yet?
              <router-link to="/register" class="form-label-link"
                >Sign up here</router-link
              >
            </p>
          </div>
        </form>
        <!-- End Form -->
      </div>
    </div>
    <!-- End Form -->
  </main>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
