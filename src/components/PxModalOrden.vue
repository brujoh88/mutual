<template>
  <div>
    <!-- Using value -->
    <b-button v-b-modal="'my-modal'" variant="success"
      >Agregar Orden +</b-button
    >

    <!-- The modal -->
    <b-modal id="my-modal" centered title="Nueva Orden" v-model="show"
      ><div>
        <b-form @submit="onSubmit" @reset="onReset">
          <b-form-group id="input-group-0" label="Fecha:" label-for="input-0">
            <b-form-input
              id="input-0"
              v-model="form.fecha"
              :state="validationFecha"
              readonly
            ></b-form-input>
            <b-form-valid-feedback :state="validationFecha">
              La fecha de la orden.
            </b-form-valid-feedback>
          </b-form-group>
          <b-form-group id="input-group-1" label="Monto:" label-for="input-1">
            <b-form-input
              id="input-1"
              v-model="form.monto"
              :placeholder="`Disponible ${saldoDisponible}`"
              :state="validationMonto"
              required
            ></b-form-input>
            + interes
            <b-form-invalid-feedback :state="validationMonto">
              Solo numeros y un monto no superior a {{ saldoDisponible }}
            </b-form-invalid-feedback>
            <b-form-valid-feedback :state="validationMonto">
              Muy bien!
            </b-form-valid-feedback>
          </b-form-group>

          <b-form-group
            id="input-porcentaje"
            label="Interes %:"
            label-for="porcentaje"
          >
            <b-form-input
              id="porcentaje"
              v-model="form.porcentaje"
              placeholder="(interes sobre el total)"
              :state="validationPorcentaje"
              type="number"
              required
            ></b-form-input>
            <b-form-invalid-feedback :state="validationPorcentaje">
              No puede ser un monto superior a 50%
            </b-form-invalid-feedback>
            <b-form-valid-feedback :state="validationPorcentaje">
              Muy bien!
            </b-form-valid-feedback>
          </b-form-group>

          <b-form-group
            id="input-group-list"
            label="Cuota/s:"
            label-for="input-list"
          >
            <b-form-select
              id="input-list"
              v-model="form.cuota"
              :options="cuotas"
              :state="validationCuota"
              required
            ></b-form-select>
            <b-form-invalid-feedback :state="validationCuota">
              Eliga una opcion
            </b-form-invalid-feedback>
            <b-form-valid-feedback :state="validationCuota">
              Muy bien!
            </b-form-valid-feedback>
          </b-form-group>

          <b-form-group
            id="input-group-list-proovedores"
            label="Proveedor:"
            label-for="input-list-proovedores"
          >
            <b-form-select
              id="input-list-proovedores"
              v-model="form.proovedor"
              :options="proovedores"
              :state="validationProovedor"
              required
            ></b-form-select>
            <b-form-invalid-feedback :state="validationProovedor">
              Eliga el proovedor
            </b-form-invalid-feedback>
            <b-form-valid-feedback :state="validationProovedor">
              Muy bien!
            </b-form-valid-feedback>
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
            Error al cargar la orden.
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
let fechaCompleta = new Date(),
  dia = fechaCompleta.getDate(),
  mes = fechaCompleta.getMonth() + 1,
  anio = fechaCompleta.getFullYear()
export default {
  name: 'ModalNewOrden',
  props: {
    saldoDisponible: {
      type: Number,
    },
    idAfiliado: {
      type: String,
    },
    fechaCierre: {
      type: String,
    },
  },
  data() {
    return {
      form: {
        fecha: `${dia}/${mes}/${anio}`,
        monto: '',
        cuota: null,
        proovedor: null,
        porcentaje: 0,
      },
      cuotas: [
        { text: 'Eliga la cantidad de cuotas', value: null },
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
      ],
      proovedores: [{ text: 'Seleccione uno', value: null }],
      idProovedores: [],
      show: false,
      value: 0,
      max: 100,
      showDismissibleAlert: false,
    }
  },
  computed: {
    validationFecha() {
      return true
    },
    validationPorcentaje() {
      return this.form.porcentaje <= 50
    },
    validationProovedor() {
      return this.form.proovedor != null
    },
    validationCuota() {
      return this.form.cuota != null
    },
    validationMonto() {
      return (
        this.saldoDisponible >= this.form.monto &&
        this.form.monto != 0 &&
        this.form.monto > 0
      )
    },
    habilitarGuardar() {
      return !(
        this.form.proovedor != null &&
        this.form.cuota != null &&
        this.saldoDisponible >= this.form.monto &&
        this.form.monto != 0
      )
    },
  },
  mounted() {
    fetch('http://localhost:3000/proovedor/')
      .then((response) => {
        return response.json()
      })
      .then((datos) => {
        for (let i = 0; i < datos.body.length; i++) {
          this.proovedores.push(
            `${datos.body[i].nombre} - ${datos.body[i].descripcion}`
          )
          this.idProovedores.push(datos.body[i]._id)
        }
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => (this.isBusy = false))
  },
  methods: {
    estoySeguro() {
      let montoFinal = Number(this.form.monto)
      let mensajeInteres = ''
      if (this.form.porcentaje > 0) {
        let interes = (this.form.porcentaje * montoFinal) / 100
        montoFinal = montoFinal + interes
        mensajeInteres = `(Interes del ${this.form.porcentaje}% - Total:${montoFinal})`
      }
      this.$bvModal
        .msgBoxConfirm(
          `Orden de compra por $${this.form.monto} pesos ${mensajeInteres}. En ${this.form.cuota} cuota/s para ${this.form.proovedor}. ¿Esta seguro?`,
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
          } else {
            this.onReset()
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    onSubmit() {
      let index = this.proovedores.indexOf(this.form.proovedor) - 1

      fetch('http://localhost:3000/orden', {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify({
          _afiliado: this.idAfiliado,
          _proovedor: this.idProovedores[index],
          montoTotal: this.form.monto,
          cantidadCuota: this.form.cuota,
          porcentaje: this.form.porcentaje,
        }),
      })
        .then((response) => response.json())
        .then((element) => {
          if (element.error == '') {
            let valorCuota
            if (element.body.porcentaje > 0) {
              let interes =
                (element.body.porcentaje * element.body.montoTotal) / 100
              valorCuota = (
                (element.body.montoTotal + interes) /
                element.body.cantidadCuota
              ).toFixed(2)
            } else {
              valorCuota = (
                element.body.montoTotal / element.body.cantidadCuota
              ).toFixed(2)
            }
            this.value = 100
            this.onReset()
            let periodo = new Date(this.fechaCierre)
            let mesPeriodo = periodo.getMonth()
            let anio = periodo.getFullYear()
            for (let i = 0; i < element.body.cantidadCuota; i++) {
              fetch('http://localhost:3000/cuota', {
                headers: { 'Content-Type': 'application/json' },
                method: 'POST',
                body: JSON.stringify({
                  _afiliado: this.idAfiliado,
                  _orden: element.body._id,
                  monto: valorCuota,
                  periodo: new Date(anio, mesPeriodo + i),
                  detalle: `${i + 1} de ${element.body.cantidadCuota}`,
                }),
              })
                .then((response) => response.json())
                .then((element) => {
                  if (element.error == '') {
                    console.log('Se guardo las cuotas')
                  } else {
                    console.log('Error')
                  }
                })
            }

            setTimeout(this.closeFrom, 1500)
          } else {
            this.showDismissibleAlert = true
          }
        })
    },
    closeFrom() {
      this.show = false
      this.value = 0
      this.$emit('newOrden')
    },
    onReset(event) {
      if (event != undefined) {
        event.preventDefault()
      }
      // Reset our form values
      this.form.monto = ''
      this.form.cuota = null
      this.form.proovedor = null
      this.form.saldoAsignado = ''
      // Trick to reset/clear native browser form validation state
    },
  },
}
</script>

<style></style>
