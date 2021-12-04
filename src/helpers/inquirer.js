const inquirer = require('inquirer');
require('colors');

const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Qué desea hacer?',
        choices: [
            {
                value: 1,
                 name: `${'1.'.green} Buscar ciudad`
            },
            {
                value: 2,
                 name: `${'2.'.green} Historial`
            },
            {
                value: 0,
                 name: `${'0.'.green} Salir`
            }
        ]
    }
];

const inquirerMenu =  async() => {
    console.clear();

    console.log('==========================='.magenta);
    console.log('   Seleccione una opción   '.magenta);
    console.log('===========================\n'.magenta);
    
    const {opcion} = await inquirer.prompt(preguntas);

    return opcion;
}

const pausa = async () => {
    const question = [
        {
            type: 'input',
            name: 'entrada',
            message: `Presione ${'ENTER'.red} para continuar`
        }

    ];
    console.log('\n');
    await inquirer.prompt(question);
}

const leerInput = async (message) => {
    const question = [ 
        {
            type: 'input',
            name: 'desc',
            message,
            validate (value) {
                if (value.length === 0){
                    return 'Por favor ingrese un valor';
                }
                return true;
            }
        }
    ];

    const {desc} = await inquirer.prompt(question);
    return desc;
}

//función asíncrona porque voy a querer utilizar el await
//Voy a recibir las tareas ya antes guardadas en un arreglo
const listarLugares = async (lugares = []) => {
    
    const choices = lugares.map((lugar, i)=> {

        const idx = `${i+1}.`.green;

        return {
            value: lugar.id,
            name: `${idx} ${lugar.nombre}`
        }
    });

    //Para añadirlo al inicio del arreglo
    choices.unshift ({
        value: '0',
        name: '0.'.green + ' Cancelar'
    });

    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Seleccione Lugar:',
            choices
        }
    ]
    const {id} = await inquirer.prompt(preguntas);
    return id;
    //{
    //    value: tarea.id,
    //     name: `${'1.'.green} Crear tarea`
    //}
}

//nueva función para confirmar
const confirmar = async (message) => {
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];
    const {ok} = await inquirer.prompt(question);
    return ok;
}

const mostrarListadoCheckList = async (tareas = []) => {
    
    const choices = tareas.map((tarea, i)=> {

        const idx = `${i+1}.`.green;

        return {
            value: tarea.id,
            name: `${idx} ${tarea.desc}`,
            checked: (tarea.completadoEn)
                    ? true  
                    : false
        }
    });


    const pregunta = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Seleccione',
            choices
        }
    ]
    const {ids} = await inquirer.prompt(pregunta);
    return ids;
    //{
    //    value: tarea.id,
    //     name: `${'1.'.green} Crear tarea`
    //}
}



module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    listarLugares,
    confirmar,
    mostrarListadoCheckList

}