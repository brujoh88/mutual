<template>
  <div>
    <b-card bg-variant="light" header="Consulta - Resumen">
      <b-form @submit="onSubmit">
        <b-form-group id="input-group-1" label="Mes" label-for="input-1">
          <b-form-select
            id="input-1"
            v-model="form.mes"
            :state="validationMes"
            :options="options"
            required
          ></b-form-select>
          <b-form-invalid-feedback :state="validationMes">
            Ingresar el mes
          </b-form-invalid-feedback>
          <b-form-valid-feedback :state="validationMes">
            Muy bien!
          </b-form-valid-feedback>
        </b-form-group>
        <b-form-group id="input-group-2" label="Año" label-for="input-2">
          <b-form-input
            id="input-2"
            placeholder="Eliga el año"
            v-model="form.anio"
            :state="validationAnio"
            required
          ></b-form-input>
          <b-form-invalid-feedback :state="validationAnio">
            Ingresar el año (2021 en adelante)
          </b-form-invalid-feedback>
          <b-form-valid-feedback :state="validationAnio">
            Muy bien!
          </b-form-valid-feedback>
        </b-form-group>
        <b-form-group>
          <b-form-input
            readonly
            placeholder="Haz Click en consultar"
            v-show="!habilitarGuardar"
          ></b-form-input>
        </b-form-group>

        <b-button
          variant="success"
          class="mr-3"
          :disabled="habilitarGuardar"
          @click="onSubmit"
          >Consultar</b-button
        >
        <b-button
          variant="warning"
          class="mr-3"
          :disabled="valor"
          @click="exportar"
          >Exportar</b-button
        >
      </b-form>
    </b-card>
    <b-alert
      class="mt-3"
      v-model="showDismissibleEmtyAlert"
      variant="danger"
      dismissible
    >
      No hay consumos para este mes.
    </b-alert>
    <b-alert class="mt-3" v-model="showOpenAlert" variant="danger" dismissible>
      Periodo en curso
    </b-alert>
    <b-alert
      class="mt-3"
      v-model="showCloseSuccessAlert"
      variant="success"
      dismissible
    >
      Periodo Cerrado
    </b-alert>
    <b-table
      striped
      hover
      :items="items"
      :fields="fields"
      :busy="isBusy"
      class="mt-4"
    >
      <template #table-busy>
        <div class="text-center text-danger my-2">
          <b-spinner class="align-middle"></b-spinner>
          <strong> Esperando Consulta...</strong>
        </div>
      </template>
    </b-table>
  </div>
</template>

<script>
export default {
  name: 'FomrularioConsulta',
  data() {
    return {
      form: {
        mes: new Date().getMonth(),
        anio: new Date().getFullYear(),
      },
      options: [
        { value: null, text: 'Eliga un mes' },
        { value: 0, text: 'Enero' },
        { value: 1, text: 'Febrero' },
        { value: 2, text: 'Marzo' },
        { value: 3, text: 'Abril' },
        { value: 4, text: 'Mayo' },
        { value: 5, text: 'Junio' },
        { value: 6, text: 'Julio' },
        { value: 7, text: 'Agosto' },
        { value: 8, text: 'Septiembre' },
        { value: 9, text: 'Octubre' },
        { value: 10, text: 'Noviembre' },
        { value: 11, text: 'Diciembre' },
      ],
      fields: [
        {
          key: 'legajo',
          sortable: true,
        },
        {
          key: 'codigo',
          sortable: true,
        },
        {
          key: 'monto',
          sortable: true,
        },
        {
          key: 'apellido_nombre',
          label: 'Apellido y Nombre',
          sortable: true,
        },
        { key: 'dni', sortable: true },
      ],
      items: null,
      isBusy: true,
      showDismissibleEmtyAlert: false,
      twoCodigos: {},
      showOpenAlert: false,
      showCloseSuccessAlert: false,
    }
  },
  mounted() {
    fetch('http://localhost:3000/config/')
      .then((response) => {
        return response.json()
      })
      .then((datos) => {
        this.twoCodigos[`${datos.body[0]._codigo1._id}`] =
          datos.body[0]._codigo1.codigo1
        this.twoCodigos[`${datos.body[0]._codigo2._id}`] =
          datos.body[0]._codigo2.codigo2
      })
      .catch((error) => {
        console.log(error)
      })
  },
  methods: {
    onSubmit() {
      this.items = null
      this.showDismissibleEmtyAlert = false
      this.showCloseSuccessAlert = false
      this.showOpenAlert = false
      this.EstaCerradoPeriodoConsulta()
      let idCodigo = Object.keys(this.twoCodigos)
      let valorCodigo = Object.values(this.twoCodigos)
      let datosParaTabla = []
      let arrLegAfiliados = []
      fetch(
        `http://localhost:3000/cuota/resumen/${this.form.anio}/${this.form.mes}`
      )
        .then((response) => {
          return response.json()
        })
        .then((datos) => {
          if (datos.body.length == 0) {
            this.showDismissibleEmtyAlert = true
          } else {
            this.showDismissibleEmtyAlert = false
            arrLegAfiliados = this.unirLegajosAfiliados(datos.body)
            for (let i = 0; i < arrLegAfiliados.length; i++) {
              datosParaTabla.push({
                legajo: arrLegAfiliados[i],
                codigo: '',
                monto: 0,
                apellido_nombre: '',
                dni: '',
              })
            }
            for (let i = 0; i < datos.body.length; i++) {
              let legajo = datos.body[i]._afiliado.legajo
              let codigo = datos.body[i]._afiliado.codigo
              let montoParcial = datos.body[i].monto
              let apellido_nombre = datos.body[i]._afiliado.apellido_nombre
              let dni = datos.body[i]._afiliado.dni
              let index = arrLegAfiliados.indexOf(legajo)
              datosParaTabla[index].codigo = codigo
              datosParaTabla[index].monto += montoParcial
              datosParaTabla[index].apellido_nombre = apellido_nombre
              datosParaTabla[index].dni = dni
            }
            this.items = datosParaTabla
            for (let i = 0; i < this.items.length; i++) {
              let index = idCodigo.indexOf(this.items[i].codigo)
              this.items[i].codigo = valorCodigo[index]
            }
          }
        })
        .catch((error) => {
          console.log(error)
        })
        .finally(() => (this.isBusy = false))
    },
    unirLegajosAfiliados(arr) {
      let legArr = []
      for (let i = 0; i < arr.length; i++) {
        if (!legArr.includes(arr[i]._afiliado.legajo)) {
          legArr.push(arr[i]._afiliado.legajo)
        }
      }
      return legArr
    },
    EstaCerradoPeriodoConsulta() {
      let fecha = new Date(this.form.anio, this.form.mes)
      fetch(`http://localhost:3000/calculoPeriodo/${fecha}`)
        .then((response) => {
          return response.json()
        })
        .then((datos) => {
          let fechaCierre = new Date(datos.body.fechaCierre)
          fechaCierre = new Date(
            fechaCierre.getFullYear(),
            fechaCierre.getMonth(),
            fechaCierre.getDate() + 1
          )
          let fechaAhora = new Date()
          if (fechaAhora - fechaCierre < 0) {
            this.showOpenAlert = true
          } else {
            this.showOpenAlert = false
            this.showCloseSuccessAlert = true
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    exportar() {
      console.log(this.items)
    },
  },
  computed: {
    validationMes() {
      return this.form.mes != null
    },
    validationAnio() {
      return /^[0-9]+$/.test(this.form.anio) && this.form.anio >= 2021
    },
    habilitarGuardar() {
      return !(
        this.form.mes != null &&
        /^[0-9]+$/.test(this.form.anio) &&
        this.form.anio >= 2021
      )
    },
    valor() {
      return !this.items
    },
  },
}
</script>

<style></style>
