<template>
  <div>
    <h6 class="mb-3 mt-3">
      - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
      - - - - - - - - - - - - - - - - - - - -
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
              p/Cuota</b-col
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
          Leg. {{ afiliado.legajo }} AUTORIZO a que se le realice descuento en
          sus haberes mensuales correspondientes al mes de {{ mes }} por valor
          de PESOS
          ..................................................................
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
export default {
  name: 'Comprobante',
  props: {
    Duplicado: {
      type: String,
    },
  },
  data() {
    return {
      fecha: '',
      ordenDatos: {},
      afiliado: {},
      proveedor: {},
      mes: '',
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
            let fecha = new Date(this.ordenDatos.date)
            let dia = fecha.getDate()
            let mes = fecha.getMonth()
            let anio = fecha.getFullYear()
            this.fecha = `${dia}/${mes}/${anio}`
            this.afiliado = datos.body[0]._afiliado
            this.proveedor = datos.body[0]._proovedor

            fetch(`http://localhost:3000/calculoPeriodo/${fecha}`)
              .then((response) => {
                return response.json()
              })
              .then((datos) => {
                let mes = new Date(datos.body.fechaCierre).getMonth() + 1
                this.mes = MESES_DEL_ANIO[mes]
              })
              .catch((error) => {
                console.log(error)
              })
          })
          .catch((error) => {
            console.log(error)
          })
      },
    },
  },
}
</script>

<style></style>
