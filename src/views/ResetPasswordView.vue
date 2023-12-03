<script setup>
import { ref, computed } from "vue";
import { submitForm } from "@/utils/api.js"; // adjust the path according to your project structure

const confirmNewPassword = ref("");
const newPassword = ref("");
const passwordVisible = ref(false);
const errorMessage = ref("");
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

const handleForm = async (event) => {
  event.preventDefault();

  if (newPassword.value === "" || confirmNewPassword.value === "") {
    errorMessage.value = "Enter new password";
    setTimeout(closeAlert, 5000);
    return;
  }
  if (newPassword.value !== confirmNewPassword.value) {
    errorMessage.value = "Confirm password don't match";
    setTimeout(closeAlert, 5000);
    return;
  }

  loading.value = true;

  let formData = new FormData();
  formData.append("password", newPassword.value);

  const { data, error } = await submitForm(
    "http://127.0.0.1:7800/api/v1/auth/password-reset/complete/InBoaWxpcG9raW9raW9AZ21haWwuY29tIg.Y9_Baw.cPx39LzldMWhFjUb9JeQVrUgAJ4/",
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
          <h1 class="h2">Reset password</h1>
          <p>Reset your account password.</p>
        </div>
        <!-- End Heading -->

        <!-- Form -->
        <form
          class="js-validate needs-validation"
          @submit="handleForm"
          novalidate
        >
          <!-- Form -->
          <div class="mb-4">
            <div class="d-flex justify-content-between align-items-center">
              <label class="form-label" for="signupSimpleLoginPassword"
                >New Password</label
              >
            </div>

            <div
              class="input-group input-group-merge"
              data-hs-validation-validate-class
            >
              <input
                v-model="newPassword"
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

          <!-- Form -->
          <div class="mb-4">
            <div class="d-flex justify-content-between align-items-center">
              <label class="form-label" for="signupSimpleLoginPassword"
                >Confirm New Password</label
              >
            </div>

            <div
              class="input-group input-group-merge"
              data-hs-validation-validate-class
            >
              <input
                v-model="confirmNewPassword"
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
              <span v-else> Reset </span>
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
