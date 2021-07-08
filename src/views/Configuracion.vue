<template>
  <div class="d-flex justify-content-center">
    <b-form @submit="onSubmit" @reset="onReset">
      <b-alert v-model="showDismissibleAlert" variant="danger" dismissible>
        Error en la base de datos
      </b-alert>
      <b-form-group
        id="input-group-1"
        label="Monto de cuota fija:"
        label-for="input-1"
        description="Tenga en cuenta que este monto se asd!!!."
      >
        <b-form-input
          id="input-1"
          v-model="form.cuota"
          placeholder="Ingrese el valor de la cuota"
          :state="validationCuota"
          required
        ></b-form-input>
        <b-form-invalid-feedback :state="validationCuota">
          Ingrese solo numeros
        </b-form-invalid-feedback>
        <b-form-valid-feedback :state="validationCuota">
          Muy bien!
        </b-form-valid-feedback>
      </b-form-group>

      <b-form-group id="input-group-2" label="Codigo 1:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.codigo1"
          :state="validationCodigo1"
          required
        ></b-form-input>
        <b-form-invalid-feedback :state="validationCodigo1">
          Ingrese solo numeros
        </b-form-invalid-feedback>
        <b-form-valid-feedback :state="validationCodigo1">
          Muy bien!
        </b-form-valid-feedback>
      </b-form-group>

      <b-form-group id="input-group-3" label="Codigo 2:" label-for="input-3">
        <b-form-input
          id="input-3"
          v-model="form.codigo2"
          :state="validationCodigo2"
          required
        ></b-form-input>
        <b-form-invalid-feedback :state="validationCodigo2">
          Ingrese solo numeros
        </b-form-invalid-feedback>
        <b-form-valid-feedback :state="validationCodigo2">
          Muy bien!
        </b-form-valid-feedback>
      </b-form-group>

      <b-button
        @click="estoySeguro"
        variant="success"
        :disabled="habilitarGuardar"
        class="mr-2"
        >Guardar</b-button
      >
      <b-button type="reset" variant="danger">Resetear</b-button>
      <b-progress
        :value="value"
        :max="max"
        show-progress
        animated
        class="mt-2"
      ></b-progress>
    </b-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        cuota: '',
        codigo1: '',
        codigo2: '',
      },
      value: 0,
      max: 100,
      showDismissibleAlert: false,
    }
  },
  computed: {
    validationCuota() {
      return /^[0-9]+$/.test(this.form.cuota)
    },
    validationCodigo1() {
      return /^[0-9]+$/.test(this.form.codigo1)
    },
    validationCodigo2() {
      return /^[0-9]+$/.test(this.form.codigo2)
    },
    habilitarGuardar() {
      return !(
        /^[0-9]+$/.test(this.form.cuota) &&
        /^[0-9]+$/.test(this.form.codigo1) &&
        /^[0-9]+$/.test(this.form.codigo2)
      )
    },
  },
  methods: {
    estoySeguro() {
      this.$bvModal
        .msgBoxConfirm(
          `Se va a cambiar la configuracion: Valor de la COUTA ${this.form.cuota} - CODIGO 1: ${this.form.codigo1} - CODIGO 2 ${this.form.codigo2}. ¿Esta usted seguro?`,
          {
            title: 'Confirmacion de configuracion',
            size: 'sm',
            buttonSize: 'sm',
            okVariant: 'danger',
            okTitle: 'SI',
            cancelTitle: 'NO',
            footerClass: 'p-2',
            hideHeaderClose: false,
            centered: true,
          }
        )
        .then((value) => {
          if (value) {
            this.onSubmit()
          } else {
            this.onReset()
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    onSubmit() {
      fetch('http://localhost:3000/config', {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify({
          cuota: this.form.cuota,
          codigo1: this.form.codigo1,
          codigo2: this.form.codigo2,
        }),
      })
        .then((response) => response.json())
        .then((element) => {
          if (element.error == '') {
            this.value = 100
            setTimeout(this.closeFrom, 1500)
          } else {
            this.showDismissibleAlert = true
          }
        })
    },
    closeFrom() {
      this.show = false
      this.value = 0
      this.$emit('isPost')
    },
    onReset(event) {
      if (event != undefined) {
        event.preventDefault()
      }
      // Reset our form values
      this.form.cuota = ''
      this.form.codigo1 = ''
      this.form.codigo2 = ''

      // Trick to reset/clear native browser form validation state
    },
  },
}
</script>
