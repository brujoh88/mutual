<template>
  <Afiliado :afiliado="afiliado" :saldoAfavor="saldoAfavor" :key="key1">
    <b-container class="bv-example-row">
      <b-row class="justify-content-md-center">
        <Orden
          class="mb-3"
          v-on:newOrden="forceRender"
          :saldoDisponible="this.saldoAfavor"
          :idAfiliado="this.afiliado.id"
          :fechaCierre="this.cierre"
        />
        <px-up-date-afiliado
          class="ml-3"
          :afiliado="this.afiliado"
          v-on:isUpDate="forceRenderUpDate"
        />
      </b-row>
    </b-container>
    <b-container>
      <b-tabs fill card pills content-class="mt-3">
        <b-tab title="Historial de ordenes" active
          ><h3>Historial de ordenes</h3>
          <div>
            <div class="d-flex justify-content-center">
              <b-col lg="6" class="my-2">
                <b-form-group
                  label="Buscar"
                  label-for="entrada-filtro"
                  label-cols-sm="3"
                  label-align-sm="right"
                  class="mb-0"
                >
                  <b-input-group>
                    <b-form-input
                      id="entrada-filtro"
                      v-model="filtro"
                      placeholder="Ingrese el dato que desea encontrar"
                      type="search"
                    ></b-form-input>

                    <b-input-group-append>
                      <b-button
                        :disabled="!filtro"
                        @click="filtro = ''"
                        variant="primary"
                        >Limpiar</b-button
                      >
                    </b-input-group-append>
                  </b-input-group>
                </b-form-group>
              </b-col>
              <b-col lg="6" class="my-2"><slot></slot></b-col>
            </div>

            <b-table
              striped
              hover
              sticky-header
              :items="datos"
              filter-debounce="1000"
              :fields="campos"
              :busy="isBusy"
              :filter="filtro"
            >
              <template #table-busy>
                <div class="text-center text-danger my-2">
                  <b-spinner class="align-middle"></b-spinner>
                  <strong>Loading...</strong>
                </div>
              </template>
              <template #cell(button)="row">
                <router-link
                  :to="{
                    path: 'AllOrden',
                    query: { id: row.item._id, cant: row.item.cantidadCuota },
                  }"
                >
                  <b-button size="sm" class="mr-2" variant="success">
                    Cuotas
                  </b-button>
                </router-link>
              </template>
            </b-table>
          </div>
        </b-tab>
        <b-tab title="Cuotas Pendientes"
          ><h3>Cuotas Pendientes</h3>
          <div>
            <div class="d-flex justify-content-center">
              <b-col lg="6" class="my-2">
                <b-form-group
                  label="Buscar"
                  label-for="filter-input"
                  label-cols-sm="3"
                  label-align-sm="right"
                  class="mb-0"
                >
                  <b-input-group>
                    <b-form-input
                      id="filter-input"
                      v-model="filter"
                      placeholder="Ingrese el dato que desea encontrar"
                      type="search"
                    ></b-form-input>

                    <b-input-group-append>
                      <b-button
                        :disabled="!filter"
                        @click="filter = ''"
                        variant="primary"
                        >Limpiar</b-button
                      >
                    </b-input-group-append>
                  </b-input-group>
                </b-form-group>
              </b-col>
              <b-col lg="6" class="my-2"><slot></slot></b-col>
            </div>

            <b-table
              striped
              hover
              sticky-header
              :items="items"
              filter-debounce="1000"
              :fields="fields"
              :busy="isBusy"
              :filter="filter"
              :tbody-tr-class="rowClass"
            >
              <template #table-busy>
                <div class="text-center text-danger my-2">
                  <b-spinner class="align-middle"></b-spinner>
                  <strong>Loading...</strong>
                </div>
              </template>
              <template #cell(button)="row">
                <router-link
                  :to="{
                    path: 'orden',
                    query: {
                      id: row.item._orden._id,
                      detalle: row.item.detalle,
                    },
                  }"
                >
                  <b-button size="sm" class="mr-2" variant="success">
                    Cuota
                  </b-button>
                </router-link>
              </template>
            </b-table>
            <h5>Subtotal ${{ acumulador }}</h5>
          </div>
        </b-tab>
      </b-tabs>
    </b-container>
  </Afiliado>
</template>

<script>
import Afiliado from '@/components/PxAfiliado.vue'
import Orden from '@/components/PxModalOrden.vue'
import PxUpDateAfiliado from '../components/PxUpDateAfiliado.vue'

export default {
  name: 'PlanillaAfiliado',
  components: {
    Afiliado,
    Orden,
    PxUpDateAfiliado,
  },
  data() {
    return {
      afiliado: {
        id: '',
        legajo: '',
        apellido_nombre: '',
        codigo: '',
        dni: '',
        saldoAsignado: '',
        autoCuota: true,
        detalle: '',
      },
      proveedor: {},
      cierre: '',
      saldoAfavor: null,
      acumulador: 0,
      key1: 0,
      fields: [
        {
          key: 'id',
          label: 'Orden N°',
          sortable: true,
        },
        {
          key: 'detalle',
          label: 'Cuota',
          sortable: true,
        },
        {
          key: 'periodo',
          sortable: true,
        },
        { key: 'proveedor', sortable: true },
        { key: 'monto', sortable: true },
        { key: 'button', label: 'Imprimir', sortable: false },
      ],
      campos: [
        {
          key: '_id',
          label: 'Orden N°',
          sortable: true,
        },
        {
          key: 'date',
          label: 'Fecha',
          sortable: true,
        },
        {
          key: '_proovedor.nombre',
          label: 'Proveedor',
          sortable: true,
        },
        {
          key: 'montoTotal',
          label: 'Monto',
          sortable: true,
        },
        {
          key: 'cantidadCuota',
          label: 'Cuota',
          sortable: true,
        },

        {
          key: 'porcentaje',
          label: 'Interes %',
          sortable: true,
        },
        {
          key: 'suma',
          label: 'TOTAL',
          sortable: true,
        },
        { key: 'button', label: 'Imprimir', sortable: false },
      ],
      datos: null,
      items: null,
      isBusy: true,
      filter: null,
      filtro: null,
    }
  },
  methods: {
    rowClass(item, type) {
      let mes = new Date(this.cierre)
      mes = mes.getMonth() + 1
      mes = String(mes)
      if (!item || type !== 'row') return
      if (mes < 10) {
        if (item.periodo[0] == mes) {
          return 'table-warning'
        }
      } else {
        if (item.periodo[0] == mes[0] && item.periodo[1] == mes[1]) {
          return 'table-warning'
        }
      }
    },
    forceRenderUpDate() {
      fetch(`http://localhost:3000/afiliado/${this.afiliado.id}`)
        .then((response) => {
          return response.json()
        })
        .then((datos) => {
          this.afiliado.id = datos.body._id
          this.afiliado.codigo = datos.body.codigo
          this.afiliado.legajo = datos.body.legajo
          this.afiliado.apellido_nombre = datos.body.apellido_nombre
          this.afiliado.autoCuota = datos.body.autoCuota
          this.afiliado.detalle = datos.body.detalle
          this.afiliado.dni = datos.body.dni
          this.afiliado.saldoAsignado = datos.body.saldoAsignado
        })
        .catch((error) => {
          console.log(error)
        })
        .finally(() => this.calcularSaldo(this.afiliado.id))
    },
    forceRender() {
      this.calcularSaldo()
      this.key1 += 1
    },
    calcularSaldo(id) {
      this.acumulador = 0
      if (id === undefined) {
        id = this.afiliado.id
      }
      fetch(`http://localhost:3000/orden/${id}`)
        .then((response) => {
          return response.json()
        })
        .then((datos) => {
          this.datos = datos.body
          for (let i = 0; i < this.datos.length; i++) {
            let fecha = new Date(this.datos[i].date)
            let dia = fecha.getDate()
            let mes = fecha.getMonth() + 1
            let anio = fecha.getFullYear()
            let hs = fecha.getHours()
            let min = fecha.getMinutes()
            this.datos[i].date = `${dia}/${mes}/${anio} a las ${hs}:${
              min < 10 ? '0' : ''
            }${min}`
            let porcentual = this.datos[i].porcentaje / 100
            let interes = this.datos[i].montoTotal * porcentual
            this.datos[i].suma = this.datos[i].montoTotal + interes
          }
        })
      fetch(`http://localhost:3000/cuota/deuda/${id}`)
        .then((response) => {
          return response.json()
        })
        .then((datos) => {
          this.items = datos.body
          for (let i = 0; i < this.items.length; i++) {
            this.items[i].proveedor = this.proveedor[
              this.items[i]._orden._proovedor
            ]
            let fecha = new Date(this.items[i].periodo)
            this.items[i].periodo = `${fecha.getMonth() +
              1}/${fecha.getFullYear()}`
            this.items[i].id = this.items[i]._orden._id
          }
          if (datos.body.length != 0) {
            let mesAdescontar = new Date(this.cierre)
            mesAdescontar = mesAdescontar.getMonth() + 1
            mesAdescontar = String(mesAdescontar)
            for (let i = 0; i < datos.body.length; i++) {
              if (mesAdescontar < 10) {
                if (datos.body[i].periodo[0] == mesAdescontar) {
                  this.acumulador = this.acumulador + datos.body[i].monto
                }
              } else {
                if (
                  datos.body[i].periodo[0] == mesAdescontar[0] &&
                  datos.body[i].periodo[1] == mesAdescontar[1]
                ) {
                  this.acumulador = this.acumulador + datos.body[i].monto
                }
              }
            }
            this.acumulador = this.acumulador.toFixed(2)
            let saldoAfavor = (
              this.afiliado.saldoAsignado - this.acumulador
            ).toFixed(2)
            this.saldoAfavor = Number(saldoAfavor)
          } else {
            this.saldoAfavor = this.afiliado.saldoAsignado
          }
        })
        .catch((error) => {
          console.log(error)
        })
        .finally(() => (this.isBusy = false))
    },
  },
  watch: {
    '$route.query.id': {
      immediate: true,
      handler(id) {
        fetch('http://localhost:3000/proovedor/')
          .then((response) => {
            return response.json()
          })
          .then((datos) => {
            let obj = {}
            for (let i = 0; i < datos.body.length; i++) {
              obj[`${datos.body[i]._id}`] = datos.body[i].nombre
            }
            this.proveedor = obj
          })
          .catch((error) => {
            console.log(error)
          })
        fetch(`http://localhost:3000/afiliado/${id}`)
          .then((response) => {
            return response.json()
          })
          .then((datos) => {
            this.afiliado.id = datos.body._id
            this.afiliado.codigo = datos.body.codigo
            this.afiliado.legajo = datos.body.legajo
            this.afiliado.apellido_nombre = datos.body.apellido_nombre
            this.afiliado.autoCuota = datos.body.autoCuota
            this.afiliado.detalle = datos.body.detalle
            this.afiliado.dni = datos.body.dni
            this.afiliado.saldoAsignado = datos.body.saldoAsignado
          })
          .catch((error) => {
            console.log(error)
          })
          .finally(() => this.calcularSaldo(id))
      },
    },
    '$route.query.fecha': {
      immediate: true,
      handler(fecha) {
        this.cierre = fecha
      },
    },
  },
}
</script>
