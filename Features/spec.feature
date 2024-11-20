Feature: Login page

        Scenario Outline: Escenario 1
            Given Dirigirse a demoblaze website
             When Seleccionar producto <producto1>
              And Añadir producto al carro
              And Volver al home
              And Seleccionar producto <producto2>
              And Añadir producto al carro
              And Volver al cart
              And Crear orden de compra
              And Completar formulario compra con el json: dataOrder
              And Comprar orden
             Then Compra exitosa
        Examples:
                  | producto1         | producto2      |
                  | Samsung galaxy s7 | Sony xperia z5 |
                  | Nokia lumia 1520  | Sony vaio i7   |