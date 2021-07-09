<template>
  <div class="d-flex justify-content-center">
    <b-form @submit="onSubmit" @reset="onReset">
      <b-alert v-model="showDismissibleAlert" variant="danger" dismissible>
        Error en la base de datos
      </b-alert>
      <b-alert v-model="showSucessAlert" variant="success" dismissible>
        Guardado con exito
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
  name: 'Configuracion',
  data() {
    return {
      form: {
        cuota: '',
      },
      idConfig: '',
      cantPost: false,
      value: 0,
      max: 100,
      showDismissibleAlert: false,
      showSucessAlert: false,
    }
  },
  mounted() {
    fetch('http://localhost:3000/config/')
      .then((response) => {
        return response.json()
      })
      .then((datos) => {
        if (datos.body == null) {
          this.cantPost = true
        } else {
          this.idConfig = datos.body[0]._id
          this.form.cuota = datos.body[0].cuota
        }
      })
      .catch((error) => {
        console.log(error)
      })
  },
  computed: {
    validationCuota() {
      return /^[0-9]+$/.test(this.form.cuota)
    },
    habilitarGuardar() {
      return !/^[0-9]+$/.test(this.form.cuota)
    },
  },
  methods: {
    estoySeguro() {
      if (this.cantPost) {
        this.cantPost = false
        this.$bvModal
          .msgBoxConfirm(
            `Se va a crear la configuracion: Valor de la COUTA $${this.form.cuota}. ¿Esta usted seguro?`,
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
      } else {
        this.$bvModal
          .msgBoxConfirm(
            `Se va a cambiar la configuracion: Valor de la COUTA $${this.form.cuota}. ¿Esta usted seguro?`,
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
              this.onUpdate()
            } else {
              this.onReset()
            }
          })
          .catch((err) => {
            console.log(err)
          })
      }
    },

    onSubmit() {
      fetch('http://localhost:3000/config', {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify({
          cuota: this.form.cuota,
        }),
      })
        .then((response) => response.json())
        .then((element) => {
          if (element.error == '') {
            this.idConfig = element.body._id
            this.value = 100
            this.showSucessAlert = true
            setTimeout(this.closeFrom, 1500)
          } else {
            this.showDismissibleAlert = true
          }
        })
    },
    onUpdate() {
      fetch(`http://localhost:3000/config/${this.idConfig}`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'PUT',
        body: JSON.stringify({
          cuota: this.form.cuota,
        }),
      })
        .then((response) => response.json())
        .then((element) => {
          if (element.error == '') {
            this.value = 100
            this.showSucessAlert = true
            setTimeout(this.closeFrom, 1500)
          } else {
            this.showDismissibleAlert = true
          }
        })
    },
    closeFrom() {
      this.value = 0
      this.showDismissibleAlert = false
      this.showSucessAlert = false
    },
    onReset(event) {
      if (event != undefined) {
        event.preventDefault()
      }
      // Reset our form values
      this.form.cuota = ''

      // Trick to reset/clear native browser form validation state
    },
  },
}
</script>
