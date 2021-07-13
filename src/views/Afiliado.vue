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

    <h3>Cuotas pendientes</h3>

    <b-container>
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
          :items="items"
          :fields="fields"
          :busy="isBusy"
          :filter="filter"
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
                },
              }"
            >
              <b-button size="sm" class="mr-2" variant="success">
                Detalle
              </b-button>
            </router-link>
          </template>
        </b-table>
        <h5>Subtotal ${{ acumulador }}</h5>
      </div>
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
        { key: 'button', label: 'Detalle', sortable: false },
      ],
      items: null,
      isBusy: true,
      filter: null,
    }
  },
  methods: {
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
            for (let i = 0; i < datos.body.length; i++) {
              this.acumulador = this.acumulador + datos.body[i].monto
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

        /* this.acumulador = 0 */
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
