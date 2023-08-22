const express = require('express')

// Configuracion del servidor para graphql
const {graphqlHTTP} = require('express-graphql')
// Esquema para expecificar consultas y tipos de datos
const {buildSchema} = require('graphql')

// Requerir el archivo que contiene la informacion de los objetos
const {books} = require('./resources/data.json')

// Especificar un esquema para definir tipos de datos - Definir lo que esta de cara al cliente
const schema = buildSchema(`
    type Query
    {
        message: String
    }
`)

const app = express()

// Configurar elemento raiz que es lo que retorna el servidor
const root = {
    message : () => "Hello World"
}

// Ruta para consultas
app.use('/graphql', graphqlHTTP ({
    // Esquema que se va a usar
    schema: schema,
    // Elemento de retorno
    rootValue: root,
    // Uso de vistas para el cliente
    graphiql : true
}))

const PORT = process.env.PORT || 4500

app.listen(PORT, () => console.log(`Server listen at port ${PORT}`))