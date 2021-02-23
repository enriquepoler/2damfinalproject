<template>
  <q-page
    class="window-height window-width row justify-center items-center"
    style="background: linear-gradient(#7C7C7C, #C1C1C1);"
  >
    <div class="column q-pa-lg">
      <div class="row">
        <q-card square class="shadow-24" style="width:360px;height:410px;">
          <q-card-section class="bg-blue">
            <h4 class="text-h5 text-black q-my-md">Login</h4>
          </q-card-section>
          <q-card-section>
            <q-form class="q-px-sm q-pt-xl">
              <q-input square clearable v-model="username" type="username" label="Username">
                <template v-slot:prepend>
                  <q-icon name="person" />
                </template>
              </q-input>
              <q-input square clearable v-model="password" type="password" label="Password">
                <template v-slot:prepend>
                  <q-icon name="lock" />
                </template>
              </q-input>
            </q-form>
          </q-card-section>
          <q-card-section>
          </q-card-section>
          <q-card-actions class="q-px-lg">
            <q-btn unelevated size="lg" color="blue" class="full-width text-black" label="Sign In" />
          </q-card-actions>
          <!--<q-card-section class="text-center q-pa-sm">
            <p class="text-grey-6">Forgot your password?</p>
          </q-card-section>-->
          <q-card-section class="text-center q-pa-sm">
            <p class="text-black"><router-link to="/register">Registra't.</router-link></p>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      username: '',
      password: ''
    }
  }
}
</script>
