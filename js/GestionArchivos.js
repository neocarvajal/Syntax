
function creaArchivo(){
    var carpeta = navigator.getDeviceStorage("sdcard");
    var archivo = new Blob([editor.getValue()], {type: "text/html"});

    nombre = prompt("Indique el nombre y la extension del archivo:");
    var gestor = carpeta.addNamed(archivo, "codigo/"+nombre);

    gestor.onsuccess = function () {
        var nombre = this.result;
        console.log('El archivo "' + nombre + '" se escribió correctamente en el área de almacenamiento sdcard');
        alert('El archivo "' + nombre + '" se escribió correctamente en el área de almacenamiento sdcard');
    }

    //Un error suele producirse si un archivo con el mismo nombre ya existe
    gestor.onerror = function () {
        console.warn('No se puede escribir el archivo: ' + this.error.name);
        alert('No se puede escribir el archivo: ' + this.error.name);
    }
}

function abreArchivo(){      
    var carpeta = navigator.getDeviceStorage("sdcard");
    // Exploremos todas las imágenes disponibles
    var directorio = carpeta.enumerate();

    directorio.onsuccess = function () {
        var archivo = this.result;
        console.log("Archivo encontrado: " + archivo.name);
        alert("Archivo encontrado: " + archivo.name);
        lanzaActividad(archivo);
            // Una vez que encontremos el archivo verifiquemos si hay otros resultados
        if (!this.done) {
            // Entonces nos movemos al siguiente resultado, que llama al cursor
            // success con el siguiente archivo como resultado.
            this.continue();
        }
    }       

    directorio.onerror = function () {
        console.warn("Archivo no encontrado: " + this.error.name);
        alert("Archivo no encontrado: " + this.error.name);
    }
}
 
function borraArchivo(){
    var carpeta = navigator.getDeviceStorage('sdcard');
    var directorio = carpeta.enumerate();

    directorio.onsuccess = function () {
        var archivo = this.result;
        console.log("Archivo encontrado: " + archivo.name);
        var gestor = carpeta.delete(archivo.name);

        gestor.onsuccess = function () {
            console.log("Archivo eliminado " + this.result);
            alert("Archivo eliminado " + this.result);
        }

        gestor.onerror = function () {
            console.log("No se puede eliminar el archivo: " + this.error.name);
            alert("No se puede eliminar el archivo: " + this.error.name);
        }
                // Una vez que encontremos el archivo verifiquemos si hay otros resultados
        if (!this.done) {
                // Entonces nos movemos al siguiente resultado, que llama al cursor
                // success con el siguiente archivo como resultado.
            this.continue();
        }
    }
}


function guardaArchivo(texto){
	console.log(editor.getValue());
	alert(editor.getValue());
}

function lanzaActividad(archivo){
	var actividad = new MozActivity({ name: 'open', data: {'type': archivo.type,'name': archivo.name } })

    actividad.onerror = function () {
        console.warn('Activity error: ' + this.error.name);    
        alert('Activity error: ' + this.error.name);
    }

    actividad.onsuccess = function () {
        console.log(this.result);
        alert(this.result);
    }
}		

function abreVentana(){
    var opciones = "Location=no, Status=no, Scrollbars=no, Resizable=no, Width=380, Height=400, left=550";
    ventana = window.open("sd://codigo/index.html","vistaprevia",opciones);
}
