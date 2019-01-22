//  la palabara export, es para exportar a otras clases
export class Usuario {

    constructor(
//  El orden de este método si importa
            public nombre: string,
            public email: string,
            public password: string,
            public img?: string,
            public role?: string,
            public google?: boolean,
            public _id?: string

    ) {


    }

}