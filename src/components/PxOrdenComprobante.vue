<template>
  <div>
    <h6 class="mb-3 mt-3" v-if="lineaPuntos">
      - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
      - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    </h6>
    <div class="d-flex justify-content-center">
      <b-card title="Mutual 18 DE AGOSTO" sub-title="Orden de compra">
        <b-container class="bv-example-row mt-3 mb-3">
          <b-row> FECHA {{ fecha }} </b-row>
          <b-row> Monto total: ${{ ordenDatos.montoTotal }} </b-row>

          <b-row>
            <b-col>N° de Orden: {{ ordenDatos._id }} </b-col>

            <b-col
              >PLAN {{ ordenDatos.cantidadCuota }} CUOTAS - ${{
                (ordenDatos.montoTotal / ordenDatos.cantidadCuota).toFixed(2)
              }}
              p/Cuota ({{ detalle }})</b-col
            >
          </b-row>
          <b-row>
            <b-col> Legajo: {{ afiliado.legajo }} </b-col>
            <b-col>Proveedor: {{ proveedor.nombre }} </b-col>
          </b-row>
        </b-container>

        <b-card-text>
          El/la que subscribe {{ afiliado.apellido_nombre }} DNI N°:
          {{ afiliado.dni }}
          Leg. {{ afiliado.legajo }} AUTORIZA a que se le realice descuento en
          sus haberes mensuales correspondientes al mes de {{ mes }} por valor
          de PESOS "{{ parteEntera.toUpperCase()
          }}<em v-if="show"> CON {{ parteDecimal.toUpperCase() }} Cent.</em>"
          (${{ (ordenDatos.montoTotal / ordenDatos.cantidadCuota).toFixed(2) }})
          otorgando consentimiento expreso a favor de la Mutual "18 de Agosto"
          por el monto de la presente Orden de Compra, en caso de despido o
          renuncia de la M.V.C., Autorizo a la mencionada Mutual a descontar de
          mis haberes el importe de todas las ordenes o cuotas adeudadas. De no
          ser posible el descuento me comprometo a saldar mi deuda en la sede de
          la misma en forma inmediata.
        </b-card-text>

        <b-card-text>{{ Duplicado || '' }}</b-card-text>
        <template #footer>
          <b-container class="bv-example-row mt-4">
            <b-row>
              <b-col>
                AUTORIZO
              </b-col>
              <b-col>
                <h5 class="m-3">
                  <em>
                    Sello Mutual
                  </em>
                </h5>
              </b-col>
              <b-col>
                Firma Conforme
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                -------------------------
              </b-col>
              <b-col> </b-col>
              <b-col>
                -------------------------
              </b-col>
            </b-row>
          </b-container>
        </template>
      </b-card>
    </div>
  </div>
</template>

<script>
const conversor = require('conversor-numero-a-letras-es-ar')

let ClaseConversor = conversor.conversorNumerosALetras
let miConversor = new ClaseConversor()

const MESES_DEL_ANIO = {
  0: 'Enero',
  1: 'Febrero',
  2: 'Marzo',
  3: 'Abril',
  4: 'Mayo',
  5: 'Junio',
  6: 'Julio',
  7: 'Agosto',
  8: 'Septiembre',
  9: 'Octubre',
  10: 'Noviembre',
  11: 'Diciembre',
}
const SUMA_MES_AL_PERIODO = {
  '1': 0,
  '2': 1,
  '3': 2,
  '4': 3,
  '5': 4,
  '6': 5,
}
export default {
  name: 'Comprobante',
  props: {
    Duplicado: {
      type: String,
    },
    lineaPuntos: {
      type: Boolean,
    },
  },
  data() {
    return {
      fecha: '',
      ordenDatos: {},
      afiliado: {},
      proveedor: {},
      mes: '',
      detalle: '',
      parteEntera: '',
      parteDecimal: '',
      show: false,
    }
  },
  mounted() {},
  watch: {
    '$route.query.id': {
      immediate: true,
      handler(id) {
        fetch(`http://localhost:3000/orden/comprobante/${id}`)
          .then((response) => {
            return response.json()
          })
          .then((datos) => {
            this.ordenDatos = datos.body[0]
            let montoString = (
              this.ordenDatos.montoTotal / this.ordenDatos.cantidadCuota
            ).toFixed(2)
            let indexPuntoDecimal = montoString.indexOf('.')
            for (let i = 0; i < indexPuntoDecimal; i++) {
              this.parteEntera = this.parteEntera.concat(`${montoString[i]}`)
            }
            if (!(montoString[montoString.length - 2] === '0')) {
              if (!(montoString[montoString.length - 1] === '0')) {
                for (
                  let i = indexPuntoDecimal + 1;
                  i < montoString.length;
                  i++
                ) {
                  this.parteDecimal = this.parteDecimal.concat(
                    `${montoString[i]}`
                  )
                }
                this.show = true
              }
            } else if (!(montoString[montoString.length - 1] === '0')) {
              this.parteDecimal = montoString[montoString.length - 1]
              this.show = true
            }
            this.parteEntera = miConversor.convertToText(this.parteEntera)
            this.parteDecimal = miConversor.convertToText(this.parteDecimal)

            let fecha = new Date(this.ordenDatos.date)
            let dia = fecha.getDate()
            let mes = fecha.getMonth()
            let anio = fecha.getFullYear()
            this.fecha = `${dia}/${mes + 1}/${anio}`
            this.afiliado = datos.body[0]._afiliado
            this.proveedor = datos.body[0]._proovedor
            this.calcularPeriodoDescuento(fecha)
          })
          .catch((error) => {
            console.log(error)
          })
      },
    },
    '$route.query.detalle': {
      immediate: true,
      handler(detalle) {
        this.detalle = detalle
      },
    },
  },
  methods: {
    calcularPeriodoDescuento(fecha) {
      let movimiento = SUMA_MES_AL_PERIODO[this.detalle[0]]
      fetch(`http://localhost:3000/calculoPeriodo/${fecha}`)
        .then((response) => {
          return response.json()
        })
        .then((datos) => {
          let fechaCierreSegunOrden = new Date(datos.body.fechaCierre)
          let anio = fechaCierreSegunOrden.getFullYear()
          let mes = fechaCierreSegunOrden.getMonth() + (movimiento || 0)
          mes = new Date(anio, mes).getMonth()
          this.mes = MESES_DEL_ANIO[mes]
        })
        .catch((error) => {
          console.log(error)
        })
    },
  },
}
</script>

<style></style>
