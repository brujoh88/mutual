<template>
  <div>
    <!-- Using value -->
    <b-button v-b-modal="'my-modal'" variant="success"
      >Agregar Afiliado +</b-button
    >

    <!-- The modal -->
    <b-modal id="my-modal" centered title="Nuevo Afiliado" v-model="show"
      ><div>
        <b-alert v-model="showDismissibleAlert" variant="danger" dismissible>
          Recuerde que debe ser legajo y DNI único para cada afiliado.
        </b-alert>
        <b-form @submit="onSubmit" @reset="onReset">
          <b-form-group
            id="input-group-list"
            label="Codigo:"
            label-for="input-list"
          >
            <b-form-select
              id="input-list"
              v-model="form.codigo"
              :options="codigo"
              :state="validationCodigo"
              required
            ></b-form-select>
            <b-form-invalid-feedback :state="validationCodigo">
              Elija una opción
            </b-form-invalid-feedback>
            <b-form-valid-feedback :state="validationCodigo">
              Muy bien!
            </b-form-valid-feedback>
          </b-form-group>
          <b-form-group id="input-group-0" label="Legajo:" label-for="input-0">
            <b-form-input
              id="input-0"
              v-model="form.legajo"
              placeholder="Ingrese el legajo aquí"
              :state="validationLegajo"
              required
            ></b-form-input>
            <b-form-invalid-feedback :state="validationLegajo">
              Ingrese solo números (debe ser único)
            </b-form-invalid-feedback>
            <b-form-valid-feedback :state="validationLegajo">
              Muy bien!
            </b-form-valid-feedback>
          </b-form-group>
          <b-form-group
            id="input-group-1"
            label="Apellido y Nombres:"
            label-for="input-1"
          >
            <b-form-input
              id="input-1"
              v-model="form.apellido_nombre"
              placeholder="Ingrese el apellido y nombre aquí"
              :state="validationApellidoNombre"
              required
            ></b-form-input>
            <b-form-invalid-feedback :state="validationApellidoNombre">
              Solo texto
            </b-form-invalid-feedback>
            <b-form-valid-feedback :state="validationApellidoNombre">
              Muy bien!
            </b-form-valid-feedback>
          </b-form-group>

          <b-form-group id="input-group-3" label="DNI:" label-for="input-3">
            <b-form-input
              id="input-3"
              v-model="form.dni"
              placeholder="Ingrese el DNI aquí"
              :state="validationDni"
              required
            ></b-form-input>
            <b-form-invalid-feedback :state="validationDni">
              Ingrese solo números (debe ser único)
            </b-form-invalid-feedback>
            <b-form-valid-feedback :state="validationDni">
              Muy bien!
            </b-form-valid-feedback>
          </b-form-group>

          <b-form-group
            id="input-group-4"
            label="Saldo Asignado:"
            label-for="input-4"
          >
            <b-form-input
              id="input-4"
              v-model="form.saldoAsignado"
              placeholder="Ingrese el saldo a asignar"
              :state="validationSaldo"
              required
            ></b-form-input>
            <b-form-invalid-feedback :state="validationSaldo">
              Ingrese solo números
            </b-form-invalid-feedback>
            <b-form-valid-feedback :state="validationSaldo">
              Muy bien!
            </b-form-valid-feedback>
          </b-form-group>
          <b-form-checkbox
            id="checkbox-1"
            v-model="form.autoCuota"
            name="checkbox-1"
            :value="true"
            :unchecked-value="false"
          >
            {{
              form.autoCuota
                ? 'Confirmando cuota automática'
                : 'NO se hara la cuota automática'
            }}
          </b-form-checkbox>

          <b-form-group
            id="input-group-2"
            label="Observaciones:"
            label-for="input-2"
            required
          >
            <b-form-input
              id="input-2"
              v-model="form.detalle"
              placeholder="Dato de interés (no requerido)"
            ></b-form-input>
          </b-form-group>

          <b-button
            @click="estoySeguro"
            variant="success"
            class="mr-3"
            :disabled="habilitarGuardar"
            >Guardar</b-button
          >
          <b-button type="reset" variant="warning">Resetear</b-button>
          <b-progress
            :value="value"
            :max="max"
            show-progress
            animated
            class="mt-2"
          ></b-progress>
        </b-form>
      </div>
      <template #modal-footer>
        <div class="w-100">
          <b-button
            variant="danger"
            size="sm"
            class="float-right"
            @click="show = false"
          >
            Cerrar
          </b-button>
        </div>
      </template></b-modal
    >
  </div>
</template>

<script>
export default {
  name: 'ModalNewAfiliado',
  data() {
    return {
      form: {
        codigo: null,
        legajo: '',
        apellido_nombre: '',
        dni: '',
        saldoAsignado: '',
        autoCuota: true,
        detalle: '',
      },
      codigo: [
        { text: 'Eliga el código correspondiente al afiliado', value: null },
      ],
      show: false,
      value: 0,
      max: 100,
      showDismissibleAlert: false,
    }
  },
  mounted() {
    fetch('http://localhost:3000/config/')
      .then((response) => {
        return response.json()
      })
      .then((datos) => {
        if (datos.body == null) {
          alert('FALTA CONFIGURAR')
        }
        this.codigo.push(
          {
            value: datos.body[0]._codigo1._id,
            text: datos.body[0]._codigo1.codigo1,
          },
          {
            value: datos.body[0]._codigo2._id,
            text: datos.body[0]._codigo2.codigo2,
          }
        )
      })
      .catch((error) => {
        console.log(error)
      })
  },
  computed: {
    validationCodigo() {
      return this.form.codigo != null
    },
    validationLegajo() {
      return /^[0-9]+$/.test(this.form.legajo)
    },
    validationDni() {
      return /^[0-9]+$/.test(this.form.dni)
    },
    validationApellidoNombre() {
      return /^[A-Za-zÁÉÍÓÚÑáéíóúñ\s]+$/.test(this.form.apellido_nombre)
    },
    validationSaldo() {
      return /^[0-9]+[.]?[0-9]{1,2}$/.test(this.form.saldoAsignado)
    },
    habilitarGuardar() {
      return !(
        this.form.codigo != null &&
        /^[0-9]+$/.test(this.form.legajo) &&
        /^[0-9]+$/.test(this.form.dni) &&
        /^[A-Za-zÁÉÍÓÚÑáéíóúñ\s]+$/.test(this.form.apellido_nombre) &&
        /^[0-9]+[.]?[0-9]{1,2}$/.test(this.form.saldoAsignado)
      )
    },
  },
  methods: {
    estoySeguro() {
      let mensajeDescuento
      if (this.form.autoCuota == true) {
        mensajeDescuento =
          'Tenga en cuenta que este afiliado se le hara el descuento automática de la cuota'
      } else {
        mensajeDescuento =
          'Tenga en cuenta que este afiliado NO se le hara el descuento automática de la cuota'
      }
      let codigo
      if (this.form.codigo == this.codigo[1].value) {
        codigo = this.codigo[1].text
      } else {
        codigo = this.codigo[2].text
      }
      this.$bvModal
        .msgBoxConfirm(
          `Se va agregar al afiliado ${
            this.form.apellido_nombre
          } con número de legajo ${this.form.legajo} - DNI ${
            this.form.dni
          }, código: ${codigo}. Asignandole un monto de crédito de $${
            this.form.saldoAsignado
          }. ${mensajeDescuento}. Detalle: ${this.form.detalle ||
            '(sin detalle)'}. ¿Está usted seguro?`,
          {
            title: 'Confirmacion de orden',
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
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    onSubmit() {
      fetch('http://localhost:3000/afiliado', {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify({
          codigo: this.form.codigo,
          legajo: this.form.legajo,
          apellido_nombre: this.form.apellido_nombre,
          dni: this.form.dni,
          autoCuota: this.form.autoCuota,
          detalle: this.form.detalle,
          saldoAsignado: this.form.saldoAsignado,
        }),
      })
        .then((response) => response.json())
        .then((element) => {
          if (element.error == '') {
            this.value = 100
            this.onReset()
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
      this.form.codigo = null
      this.form.legajo = ''
      this.form.apellido_nombre = ''
      this.form.dni = ''
      this.form.saldoAsignado = ''
      this.form.detalle = ''

      // Trick to reset/clear native browser form validation state
    },
  },
}
</script>

<style></style>
