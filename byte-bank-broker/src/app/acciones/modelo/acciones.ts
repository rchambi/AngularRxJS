export interface Acciones  extends Array<Accion>{    
}

export interface Accion {    
    id: number;
    codigo: string;
    descripcion: string;
    precio: number;
}
export interface AccionesApi {    
    payload: Acciones;
}