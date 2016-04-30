$(document).ready(function(){
	var config = new Config();
	config.init();
});

var default_configs = {
    theme: "monokai",   	   
    fullScreen: true,
    autofocus: true,
    lineNumbers : true,
    lineWrapping: true,
    matchBrackets: true,
    autoCloseTags: true,   	  
	autoCloseBrackets: true,	    
    tabSize: 4,
    indentUnit: 4,
    showCursorWhenSelecting: true	        
};

function Config(){

	var _this = this;

	var editor;
	var portapapeles = "";

	this.init = function(){

		var type_editor = $('#select').val();
	 _this.startCodeMirror(type_editor);
	 _this.editor.refresh();

	 _this.editor.setOption("theme", "monokai");

	 $('#select').change(function(){
	 	var type = $('#select')
	 	if(type = 1)
	 		default_configs.mode = "htmlmixed";
	 	if(type = 2)
	 		default_configs.mode = "javascript";
 		if(type = 3)
	 		default_configs.mode = "css";
	 	_this.editor.refresh();
	 });
/*
		$('button[name=function_button]').on('click', function(){
			$('section:visible').hide();
			switch($(this).attr('id')){
				case 'btn_back':
					$('#section_index').fadeIn();
				break;
				case 'btn_config':
					$('#section_config').fadeIn();
				break;
				case 'btn_help':
					$('#section_help').fadeIn();
				break;
				case 'btn_about':
					$('#section_about').fadeIn();
				break;
				case 'btn_test':
					$('#section_editor').fadeIn();
					$('#code').focus();
				break;
				case 'btn_new':
					$('#section_new').fadeIn();
				break;
				case 'btn_crear':
					var type_editor = $('#type_selector').val();
					_this.startCodeMirror(type_editor);
					$('#section_editor').fadeIn();
					$('#code').focus();
				break;
				default:
					$('#section_index').fadeIn();
				break;
			}
		});
*/

		$('input[type=checkbox]').on('click', function(){
			if($(this).is(":checked")){
				switch($(this).val()){
					case '1': //lineNumbers
						default_configs.lineNumbers = true;
					break;
					case '2': //lineWrapping
						default_configs.lineWrapping = true;
					break;
					case '3': //matchBrackets
						default_configs.matchBrackets = true;
					break;
					case '4': //autoCloseTags
						default_configs.autoCloseTags = true;
					break;
					case '5': //autoCloseBrakets
						default_configs.autoCloseBrackets = true;
					break;
				}
				_this.editor.refresh();
			}
			else{
				switch($(this).val()){
					case '1': //lineNumbers
						default_configs.lineNumbers = false;
					break;
					case '2': //lineWrapping
						default_configs.lineWrapping = false;
					break;
					case '3': //matchBrackets
						default_configs.matchBrackets = false;
					break;
					case '4': //autoCloseTags
						default_configs.autoCloseTags = false;
					break;
					case '5': //autoCloseBrakets
						default_configs.autoCloseBrackets = false;
					break;
				}
				_this.editor.refresh();
			}
		});

		$('#tema').change(function(){
			var theme = $(this).val();
			if(theme != "" && theme != "default")
    			_this.editor.setOption("theme", theme);
    		else
    			_this.editor.setOption("theme", "monokai");
    		_this.editor.refresh();
		});
		
		$('#btn_crear_archivo').click(function(){
			var texto = _this.obtenerCodigo();
			_this.crearArchivo(texto);
		});

		$('#btn_copy').click(function(){
			_this.portapapeles = _this.getCodigoSeleccionado();
			_this.editor.refresh();
		});

		$('#btn_paste').click(function(){
			_this.editor.replaceSelection(_this.portapapeles);
		});

		$('#btn_cut').click(function(){
			_this.portapapeles = _this.getCodigoSeleccionado();
			_this.editor.replaceSelection("");
		});

		$('#btn_delete').click(function(){
			_this.editor.replaceSelection("");
		});
	
		$('#btn_guardar_archivo').click(function(){
			var texto = _this.obtenerCodigo();
			var tipo = _this.obtenerTipo();
			_this.creaArchivo(texto, tipo);
		});

		$('#btn_abrir_archivo').click(function(){
			_this.abreArchivo();
		});

		$('#btn_borrar_archivo').click(function(){
			_this.borraArchivo();
		});
			

	}

	this.startCodeMirror = function(type){
		//inicializacion de codemirror

		if(type == 1){ //html
			default_configs.mode = "htmlmixed";
			_this.editor = CodeMirror.fromTextArea(document.getElementById("code"), default_configs);
		}
		if(type == 2){ //javascript
			default_configs.mode = "javascript";
			_this.editor = CodeMirror.fromTextArea(document.getElementById("code"), default_configs);
		}
		if(type == 3){ //css
			default_configs.mode = "css";
			_this.editor = CodeMirror.fromTextArea(document.getElementById("code"), default_configs);
		}
	}

	this.creaArchivo = function(texto, tipo){
	 	var carpeta = navigator.getDeviceStorage("sdcard");
	 	var archivo = null;
	 	var extension = null;
	 	switch(tipo){
	 		case "htmlmixed":
	 			archivo = new Blob([texto], {type: "text/html"});
	 			extension = ".html";
	 		break;
	 		case "css":
	 			archivo = new Blob([texto], {type: "text/css"});
	 			extension = ".css";
	 		break;
	 		case "js":
	 			archivo = new Blob([texto], {type: "text/javascript"});
	 			extension = ".js";
	 		break;
	 	}

	    nombre = prompt("Indique el nombre del archivo:");

	    if(nombre != "" && nombre != null && nombre != undefined){
	    	var gestor = carpeta.addNamed(archivo, "codigo/" + nombre + extension);

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
	    
	}

	this.abreArchivo = function(){
		 // Exploremos todas las imágenes disponibles
	 	var carpeta = navigator.getDeviceStorage("sdcard");
	    
	    var directorio = carpeta.enumerate();
	    //var directorio = carpeta.get("codigo/index2.html");

	    directorio.onsuccess = function () {
	    	
	        var archivo = this.result;
	        console.log("Archivo encontrado: " + archivo.name);
	        alert("Archivo encontrado... carpeta/nombre.extension: " + archivo.name+ "\n Tamaño: "+ archivo.size+" Bytes.");
	        
	            // Una vez que encontremos el archivo verifiquemos si hay otros resultados
	        if (!this.done) {
	            // Entonces nos movemos al siguiente resultado, que llama al cursor
	            // success con el siguiente archivo como resultado.
	            this.continue();
	        }
	       
	        /* var archivo = this.result;
	        alert("Archivo encontrado: " + archivo.name + "tamaño: "+ archivo.size);


	        var reader = new FileReader();
			reader.addEventListener("loadend", function() {
				alert(reader.result); 
			   // reader.result contains the contents of blob as a typed array
			});
			reader.readAsArrayBuffer(archivo); */

	        //var data = archivo.getAsText("utf-8");
	        //_this.editor.setValue(data);
  			//console.log("Obtenido el archivo: " + file.name);
	    }       

	    	directorio.onerror = function () {
	        console.warn("Archivo no encontrado: " + this.error.name);
	        alert("Archivo no encontrado: " + this.error.name);
	    }
	}

	this.borraArchivo = function(){
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

	this.obtenerCodigo = function(){
		return _this.editor.getValue();
	}

	this.getCodigoSeleccionado = function(){
		return _this.editor.getSelection();
	}

	this.obtenerTipo = function(){
		return _this.editor.getMode().name;
	}

	this.guardaArchivo = function(){
		//console.log(editor.getValue());
		//alert(_this.editor.getValue());
	}
	
}
