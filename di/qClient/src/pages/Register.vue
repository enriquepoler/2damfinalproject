<template>
  <q-page
    class="window-height window-width row justify-center items-center"
    style="background: linear-gradient(#7c7c7c, #c1c1c1)"
  >
    <div class="column q-pa-lg">
      <div class="row">
        <q-card square class="shadow-24" style="width: 360px; height: 600px">
          <q-card-section class="bg-blue">
            <h4 class="text-h5 text-black q-my-md">Register</h4>
          </q-card-section>
          <q-card-section>
            <q-form class="q-px-sm q-pt-xl">
              <q-input
                square
                clearable
                v-model="username"
                type="username"
                label="Nom d'usuari"
              >
                <template v-slot:prepend>
                  <q-icon name="person" />
                </template>
              </q-input>
              <q-input
                square
                clearable
                v-model="dni"
                type="dni"
                label="DNI">
                <template v-slot:prepend>
                  <q-icon name="recent_actors" />
                </template>
              </q-input>
              <q-input
                square
                clearable
                v-model="full_name"
                type="name"
                label="Nom complet"
              >
                <template v-slot:prepend>
                  <q-icon name="recent_actors" />
                </template>
              </q-input>
              <q-input
                square
                clearable
                v-model="password"
                type="password"
                label="Contrasenya"
                :rule="[
                  (val) => val != '' || 'La contrasenya no pot ser buida',
                ]"
              >
                <template v-slot:prepend>
                  <q-icon name="lock" />
                </template>
              </q-input>
              <q-input
                square
                clearable
                v-model="password2"
                type="password"
                label="Confirma contrasenya"
                :rule="[
                  (val) => val == this.password || 'Les contrasenyes no coincideixen',
                  (val) => this.password2 != '' || 'Inserta contrasenya de confirmacio'
                ]"
              >
                <template v-slot:prepend>
                  <q-icon name="lock" />
                </template>
              </q-input>
            </q-form>
          </q-card-section>
          <q-card-section> </q-card-section>
          <q-card-actions class="q-px-lg">
            <q-btn
              unelevated
              size="lg"
              color="blue"
              class="full-width text-black"
              label="Sign In"
            />
          </q-card-actions>
          <q-card-section class="text-center q-pa-sm">
            <p class="text-black">
              Ja estàs registrat? <router-link to="/">Logueja't.</router-link>
            </p>
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
      dni: '',
      full_name: '',
      password: '',
      password2: ''
    }
  },
  computed: {
    fullNameWords () {
      function checkSize (size) {
        return size.length > 1
      }
      var names = this.fullName.split(' ')
      return names.length >= 3 & names.filter(checkSize).length === names.length
    },
    isValidDNI () {
      const regExp = new RegExp('[0-9]{8}[A-Z]')
      return regExp.test(this.dni)
    }
    // onChange () {
    //  for (var key in this.$refs) {
    //    this.$refs[key].validate().then(console.log('valid'))
    //  }
    //  return console.log(this.$refs)
    // }
  }
}
</script>
