const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')

const flowSecundario = addKeyword(['2', 'siguiente']).addAnswer(['📄 Aquí tenemos el flujo secundario'])
const flowTercero = addKeyword(['3', 'siguiente']).addAnswer(['📄 Aquí tenemos el flujo tercero'])

const flowPerfil = addKeyword(['perfil', 'informacion', 'paulo']).addAnswer(
    [
        '📄 Paulo Javier Pérez Paternina es un desarrollador backend con las siguientes características:',
        '\n*1* Experiencia y habilidades:',
        'Especializado en desarrollo backend',
        'Maneja bases de datos como MariaDB/MySQL, MongoDB, y MS SQL Server',
        
    ],
    null,
    null,
    [flowSecundario]
)


const flowAdios = addKeyword(['adios','adiós', 'adio','gracias']).addAnswer(
    [
        '🚀 Vuelve cuando quieras aqui estare para ayudarte.',
        
    ],
    null,
    null,
    [flowTercero]
)

const flowPrincipal = addKeyword(['hola', 'ole', 'alo', 'Buenos dias'])
    .addAnswer('🙌 Hola bienvenido *Soy un asistente*')
    .addAnswer(
        [
            'Si quieres conocer algo sobre Paulo escribe la opcion en negrita.',
            '👉 *perfil* para conocer el perfil de Paulo',
            '👉 *adios*  para finalizar la conversación',
        ],
        null,
        null,
        [flowPerfil, flowAdios]
    )

const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowPrincipal])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()
