export function validate(nombre: string, email: string, telefono: string, fecha: string, ciudad: string) {

    interface IState{
        nombre : boolean,
        email : boolean,
        telefono : boolean,
        fecha : boolean,
        ciudad : boolean,
        errors :  string[]
        isValid: Function
    }

    let validState: IState = {
        nombre : false,
        email : false,
        telefono : false,
        fecha : false,
        ciudad : false,
        errors :  [],
        isValid: function() :boolean {
            return this.nombre && this.email && this.telefono &&
                this.fecha && this.ciudad;
        }
    };

    /* validacion para nombre*/
    nombre = nombre == null? "":nombre.trim();
    let regex : any = RegExp('[^A-Za-zÀ-ÖØ-öø-ÿ ]+');
    if(nombre==""){
        validState.errors.push("El campo Nombre debe ser llenado");
        validState.nombre = false;
    } else if(regex.test(nombre)){
        validState.errors.push("El campo Nombre tiene un formato no válido");
        validState.nombre = false;
    } else if(nombre.length < 3 || nombre.length > 30) {
        validState.errors.push("El campo Nombre tiene que tener más de 3 y menos que 30 letras");
        validState.nombre = false;
    } else {
        validState.nombre = true;
    }

    /* validacion para email */
    email = email == null? "":email.trim();
    if(email==""){
        validState.errors.push("El campo Email es requerido");
        validState.email = false;
    } else if(/[^a-z0-9A-Z\._\-@]+/.test(email)){
        validState.errors.push("El campo Email tiene un formato incorrecto");
        validState.email = false;
    } else if(email.length < 3 || email.length > 30) {
        validState.errors.push("El campo Email debe tener de 3 a 30 carácteres");
        validState.email = false;
    } else if(!/.+@.+\..+/g.test(email)){
        validState.errors.push("El campo Email tiene un formato que es incorrecto");
        validState.email = false;
    }  else {
        validState.email = true;
    }

    /* validacion para telefono*/
    telefono = telefono == null? "":telefono.trim();
    regex = RegExp('[^0-9# +()\-]+')
    if(telefono==""){
        validState.errors.push("El campo Teléfono debe ser llenado");
        validState.telefono = false;
    } else if(regex.test(telefono)){
        validState.errors.push("El campo Teléfono tiene un formato no válido");
        validState.telefono = false;
    } else if(telefono.length < 3 || telefono.length > 30) {
        validState.errors.push("El campo Teléfono tiene que tener más de tres y menos que 30 dígitos");
        validState.telefono = false;
    } else {
        validState.telefono = true;
    }

    /* validacion para fecha*/
    // 1 year has 365.2422 days according to https://pumas.nasa.gov/files/04_21_97_1.pdf
    const milisecsPerHundred = 24 * 3600 * 365.2422 * 100 * 1000;
    let dtNow_ = new Date();
    let dtNow = new Date(dtNow_.getFullYear(), dtNow_.getMonth(), dtNow_.getDate(),0,0,0,0).getTime();
    let dtOneHundred = dtNow + milisecsPerHundred;
    console.log(new Date(dtOneHundred));

    fecha = fecha == null? "": fecha.toString().trim();
    let fechaArr = fecha.split("-");
    let dtSelected = 0;
    if (fecha!="" && fecha!= "Invalid Date") {
        // YY-MM-DD
        dtSelected = new Date(Number(fechaArr[2]),Number(fechaArr[1])-1,Number(fechaArr[0])).getTime();
    }

    if(fecha==""){
        validState.errors.push("El campo Fecha es requerido");
        validState.fecha = false;
    } else if (fecha=="Invalid Date"){
        validState.errors.push("El campo Fecha tiene un valor no válido");
        validState.fecha = false;
    } else if( dtSelected > dtOneHundred || dtSelected < dtNow  ){
        validState.errors.push("El campo Fecha tiene un valor fuera del rango desde hoy a 100 años");
        validState.fecha = false;
    } else {
        validState.fecha = true;
    }

    /* validacion para ciudad*/
    ciudad = ciudad == null? "":ciudad.trim();
    if(ciudad==""){
        validState.errors.push("El campo Ciudad debe ser llenado");
        validState.ciudad = false;
    } else if(ciudad.length < 3) {
        validState.errors.push("El campo Ciudad tiene que tener más de 3 carácteres");
        validState.ciudad = false;
    } else {
        validState.ciudad = true;
    }

    console.log("in validState",validState);
    return { isValid: validState.isValid(), errors: validState.errors};
}

