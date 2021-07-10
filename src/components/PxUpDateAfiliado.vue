<template>
  <div>
    <!-- Using value -->
    <b-button v-b-modal="'my-modalp'" variant="warning" @click="llenarForm"
      >Actualizar afiliado</b-button
    >

    <!-- The modal -->
    <b-modal id="my-modalp" centered title="Actualizar Afiliado" v-model="show"
      ><div>
        <b-form @submit="onSubmit" @reset="onReset">
          <b-form-group
            id="input-group-listpp"
            label="Codigo:"
            label-for="input-listp"
          >
            <b-form-select
              id="input-listp"
              v-model="form.codigo"
              :options="codigo"
              :state="validationCodigo"
              required
            ></b-form-select>
            <b-form-invalid-feedback :state="validationCodigo">
              Eliga una opcion
            </b-form-invalid-feedback>
            <b-form-valid-feedback :state="validationCodigo">
              Muy bien!
            </b-form-valid-feedback>
          </b-form-group>

          <b-form-group
            id="input-group-0p"
            label="Legajo:"
            label-for="input-0p"
          >
            <b-form-input
              id="input-0p"
              v-model="form.legajo"
              placeholder="Ingrese el legajo aqui"
              :state="validationLegajo"
              required
            ></b-form-input>
            <b-form-invalid-feedback :state="validationLegajo">
              Ingrese solo numeros (debe ser unico)
            </b-form-invalid-feedback>
            <b-form-valid-feedback :state="validationLegajo">
              Muy bien!
            </b-form-valid-feedback>
          </b-form-group>
          <b-form-group
            id="input-group-1p"
            label="Nombre y Apellido:"
            label-for="input-1p"
          >
            <b-form-input
              id="input-1p"
              v-model="form.apellido_nombre"
              placeholder="Ingrese el apellido y nombre aqui"
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

          <b-form-group id="input-group-3p" label="DNI:" label-for="input-3p">
            <b-form-input
              id="input-3p"
              v-model="form.dni"
              placeholder="Ingrese el DNI aqui"
              :state="validationDni"
              required
            ></b-form-input>
            <b-form-invalid-feedback :state="validationDni">
              Ingrese solo numeros (debe ser unico)
            </b-form-invalid-feedback>
            <b-form-valid-feedback :state="validationDni">
              Muy bien!
            </b-form-valid-feedback>
          </b-form-group>

          <b-form-group
            id="input-group-4p"
            label="Saldo Asignado:"
            label-for="input-4p"
          >
            <b-form-input
              id="input-4p"
              v-model="form.saldoAsignado"
              placeholder="Ingrese el salgo a asignar"
              :state="validationSaldo"
              required
            ></b-form-input>
            <b-form-invalid-feedback :state="validationSaldo">
              Ingrese solo numeros
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
                ? 'Confirmando cuota autimatica'
                : 'NO se hara la cuota automatica'
            }}
          </b-form-checkbox>
          <b-form-group
            id="input-group-2p"
            label="Detalle:"
            label-for="input-2p"
            required
          >
            <b-form-input
              id="input-2p"
              v-model="form.detalle"
              placeholder="Dato de interes (no requerido)"
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
          <b-alert v-model="showDismissibleAlert" variant="danger" dismissible>
            Recuerde que debe ser legajo y dni unico para cada afiliado.
          </b-alert>
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
  name: 'ModalUpDateAfiliado',
  props: {
    afiliado: {
      type: Object,
    },
  },
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
        { text: 'Eliga el codigo correspondiente al afiliado', value: null },
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
      return /^[A-Za-z\s]+$/.test(this.form.apellido_nombre)
    },
    validationSaldo() {
      return /^[0-9]+$/.test(this.form.saldoAsignado)
    },
    habilitarGuardar() {
      return !(
        this.form.codigo != null &&
        /^[0-9]+$/.test(this.form.legajo) &&
        /^[0-9]+$/.test(this.form.dni) &&
        /^[A-Za-z\s]+$/.test(this.form.apellido_nombre) &&
        /^[0-9]+$/.test(this.form.saldoAsignado)
      )
    },
  },
  methods: {
    llenarForm() {
      this.form.codigo = this.afiliado.codigo
      this.form.apellido_nombre = this.afiliado.apellido_nombre
      this.form.dni = this.afiliado.dni
      this.form.legajo = this.afiliado.legajo
      this.form.autoCuota = this.afiliado.autoCuota
      this.form.detalle = this.afiliado.detalle
      this.form.saldoAsignado = this.afiliado.saldoAsignado
    },
    estoySeguro() {
      let mensajeDescuento
      if (this.form.autoCuota == 'true') {
        mensajeDescuento =
          'Tenga en cuenta que este afiliado se le hara el descuento automatica de la cuota'
      } else {
        mensajeDescuento =
          'Tenga en cuenta que este afiliado NO se le hara el descuento automatica de la cuota'
      }
      let codigo
      if (this.form.codigo == this.codigo[1].value) {
        codigo = this.codigo[1].text
      } else {
        codigo = this.codigo[2].text
      }
      this.$bvModal
        .msgBoxConfirm(
          `Se va actualizar al afiliado ${
            this.form.apellido_nombre
          } con numero de legajo ${this.form.legajo} - DNI ${
            this.form.dni
          }, codigo: ${codigo}. Asignandole un monto de credito de $${
            this.form.saldoAsignado
          }. ${mensajeDescuento}. Detalle: ${this.form.detalle ||
            '(sin detalle)'}. ¿Esta usted seguro?`,
          {
            title: 'Confirmacion de actualizacion',
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
      fetch(`http://localhost:3000/afiliado/${this.afiliado.id}`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'PUT',
        body: JSON.stringify({
          codigo: this.form.codigo,
          legajo: this.form.legajo,
          apellido_nombre: this.form.apellido_nombre,
          autoCuota: this.form.autoCuota,
          dni: this.form.dni,
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
      this.$emit('isUpDate')
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
