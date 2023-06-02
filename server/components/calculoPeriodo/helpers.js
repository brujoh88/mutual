module.exports = {
  0: [
    { dia: 13, mes: 10, anio: 2021 },
    { dia: 12, mes: 11, anio: 2021 },
  ],
  1: [
    { dia: 12, mes: 11, anio: 2021 },
    { dia: 9, mes: 0, anio: 2022 },
  ],
  2: [
    { dia: 9, mes: 0, anio: 2022 },
    { dia: 12, mes: 1, anio: 2022 },
  ],
  3: [
    { dia: 13, mes: 7, anio: 2022 },
    { dia: 8, mes: 8, anio: 2022 },
  ],
  4: [
    { dia: 8, mes: 8, anio: 2022 },
    { dia: 15, mes: 9, anio: 2022 },
  ],
  5: [
    { dia: 11, mes: 2, anio: 2023 },
    { dia: 12, mes: 3, anio: 2023 },
  ],
  6: [
    { dia: 12, mes: 3, anio: 2023 },
    { dia: 13, mes: 4, anio: 2023 },
  ],
  7: [
    { dia: 13, mes: 4, anio: 2023 },
    { dia: 3, mes: 5, anio: 2023 },
  ],
  8: [
    { dia: 3, mes: 5, anio: 2023 },
    { dia: 15, mes: 6, anio: 2023 },
  ],
};
/* 
Ejemplo de uso

-------ESTO ESTA EN LA PANTALLA---------

!Periodo actual

Apertura: 14/5/2023

Cierre: 5/6/2023 

!Período siguiente

Apertura: 6/6/2023

Cierre: 15/7/2023

-------FIN ESTA EN LA PANTALLA---------

Periodo real:

14/5/2023         5/6/2023         15/7/2023 
  |___________________|_________________|

Periodo requerido:

14/5/2023       3/6/2023           15/7/2023 
  |________________|___________________|

Si quiero que cierre el primer periodo el dia 3/6/2023 y el siguiente abra el 4/6/2023:
1- Tengo en cuenta que los meses deben ser del 0 al 11
2 -Los días que observo en pantalla, para la fecha de inicio tiene un dia sumado, osea si veo como apertura
14/5/2023, significa que el sistema pasa por dato dia:13 mes:4 anio:2023

Teniendo en cuenta estas consideracions

7: [
    { dia: 13, mes: 4, anio: 2023 },
    { dia: 3, mes: 5, anio: 2023 },
  ],
  8: [
    { dia: 3, mes: 5, anio: 2023 },
    { dia: 15, mes: 6, anio: 2023 },
  ],
*/
