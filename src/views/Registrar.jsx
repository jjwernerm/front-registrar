// Importación de módulos y componentes necesarios
import { useState } from 'react'; // Hook de React para manejar el estado en componentes funcionales
import { ImSpinner9 } from "react-icons/im"; // Icono de spinner para indicar carga
import configAxios from '../config/axios.jsx'; // Configuración de Axios para hacer peticiones HTTP
import Alert from '../componentes/Alert.jsx'; // Componente Alert para mostrar mensajes de alerta

// Componente funcional que maneja el registro de un producto
export default function Registrar() {
  // Definición de estados usando useState
  const [idproducto, setIdProducto] = useState(''); // Estado para almacenar el ID del producto
  const [nombre, setNombre] = useState(''); // Estado para almacenar el nombre del producto
  const [spinner, setSpinner] = useState(false); // Estado para mostrar/ocultar el spinner de carga
  const [btn, setBtn] = useState(false); // Estado para habilitar/deshabilitar el botón de registro
  const [errorIdProducto, setErrorIdProducto] = useState(false); // Estado para manejar errores en el campo ID del producto
  const [errorNombre, setErrorNombre] = useState(false); // Estado para manejar errores en el campo nombre del producto
  const [globalErrorMsg, setGlobalErrorMsg] = useState(''); // Estado para manejar mensajes de errores globales

  // Función que maneja el cambio en el campo Id Producto
  const handleIdProductoChange = (e) => {
    const value = e.target.value; // Obtiene el valor actual del campo

    // Validación para permitir solo números
    if (/^\d*$/.test(value)) {
      setIdProducto(value); // Actualiza el estado si el valor es numérico
      setErrorIdProducto(!value); // Si el campo está vacío, marca el error
    };

  };

  // Función que maneja el cambio en el campo Nombre del Producto
  const handleNombreChange = (e) => {
    const value = e.target.value; // Obtiene el valor actual del campo
    setNombre(value); // Actualiza el estado con el valor ingresado
    setErrorNombre(!value); // Si el campo está vacío, marca el error
  };

  // Función que maneja el envío del formulario
  const handleSubmit = async e => {
    e.preventDefault(); // Previene la recarga de la página al enviar el formulario
    setBtn(true); // Deshabilita el botón para evitar múltiples envíos
    let hasError = false; // Bandera para detectar errores en el formulario

    // Validación del campo idproducto
    if (!idproducto) {
      setErrorIdProducto(true); // Si está vacío, marca el error
      hasError = true; // Marca que existe un error
    };

    // Validación del campo nombre
    if (!nombre) {
      setErrorNombre(true); // Si está vacío, marca el error
      hasError = true; // Marca que existe un error
    };

    // Si hay errores, detiene el proceso de envío
    if (hasError) {
      setBtn(false); // Habilita nuevamente el botón
      return; // Detiene la ejecución de la función
    };

    try {
      const url = '/registrar'; // Define la URL de la API para registrar el producto
      const respuesta = await configAxios.post(url, { idproducto, nombre }); // Envía la solicitud POST con los datos del producto
      setSpinner(true); // Muestra el spinner de carga
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simula una espera de 1 segundo para la carga
      setSpinner(false); // Oculta el spinner

      // Muestra un mensaje de éxito si la respuesta es positiva
      setGlobalErrorMsg({
        msg: respuesta?.data?.msg || 'Registro exitoso', // Muestra el mensaje de éxito o uno predeterminado
        error: true // Marca el mensaje como no siendo un error
      });

      // Resetea los campos del formulario
      setIdProducto('');
      setNombre('');

    } catch (error) {
      // Manejo de errores en la solicitud
      setGlobalErrorMsg({
        msg: error.response?.data?.msg || 'Error en la solicitud: contactar al administrador', // Muestra el mensaje de error o uno predeterminado
        error: false // Marca el mensaje como un error
      });

    } finally {
      // Limpia el mensaje global y habilita el botón nuevamente después de 3 segundos
      await new Promise(resolve => setTimeout(resolve, 3000));
      setGlobalErrorMsg('');
      setBtn(false);
    };

  };

  // Renderización del formulario
  return (
    <>
      <a
        href='https://joannywerner.com/dashboardmern'
        className="ml-5 underline">
        Regresar al Dashboard        
      </a>
      <div className="flex justify-center my-4">
        <form
          className="border border-gray-100 rounded-xl w-9/12 md:w-3/12 p-4 shadow-md"
          onSubmit={handleSubmit} // Asignar la función para manejar el envío del formulario
        >
          <div className="text-center font-bold">Registrar Producto</div>

          {/* Campo Id Producto */}
          <div className="mt-4">
            <label htmlFor="input-id" className="text-gray-500">Id Producto <span className='text-red-500'>*</span></label>
            <input
              type="number"
              placeholder="Escribe el id del producto"
              id="input-id"
              className={`${errorIdProducto ? 'border-red-500 ring-red-500' : 'border-gray-100 focus:ring-green-400'} bg-gray-100 p-1 rounded-xl w-full outline-none focus:ring-1`} // Estilos condicionales según haya error o no
              value={idproducto} // Valor del input vinculado al estado
              onChange={handleIdProductoChange} // Manejador de cambio para el campo
            />

            {/* Verifica si `errorIdProducto` es true, lo que indica que hay un error en el campo Id Producto */}
            {errorIdProducto && (
              // Si hay un error, muestra un mensaje de error dentro de un `div`
              <div className="text-red-500 text-xs mt-1">
                El campo Id Producto es obligatorio
              </div>
            )}

          </div>

          {/* Campo Nombre del Producto */}
          <div className="mt-4">
            <label htmlFor="input-nombre" className="text-gray-500">Nombre del Producto <span className='text-red-500'>*</span></label>
            <input
              type="text"
              placeholder="Escribe el nombre del producto"
              id="input-nombre"
              className={`${errorNombre ? 'border-red-500 ring-red-500' : 'border-gray-100 focus:ring-green-400'} bg-gray-100 p-1 rounded-xl w-full outline-none focus:ring-1`} // Estilos condicionales según haya error o no
              value={nombre} // Valor del input vinculado al estado
              onChange={handleNombreChange} // Manejador de cambio para el campo
            />

            {/* Verifica si `errorNombre` es true, lo que indica que hay un error en el campo Nombre del Producto */}
            {errorNombre && (
              // Si hay un error, muestra un mensaje de error dentro de un `div`
              <div className="text-red-500 text-xs mt-1">
                El campo Nombre del Producto es obligatorio
              </div>
            )}

          </div>

          {/* Botón de registro */}
          <button
            type="submit"
            className="bg-emerald-600 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 
          hover:bg-green-400 flex items-center justify-center"
            disabled={btn} // Deshabilita el botón si el estado btn es true
          >
            {spinner ? ( // Si el spinner es true, muestra el icono de carga
              <div className="flex items-center">
                <ImSpinner9 className="animate-spin h-5 w-5 text-white mr-2" />
                Registrando...
              </div>
            ) : (
              'Registrar' // Si no, muestra el texto "Registrar"
            )}
          </button>

          {/* Muestra la alerta si existe un mensaje global */}
          {globalErrorMsg.msg && <Alert props={globalErrorMsg} />}

        </form>
      </div>
    </>
  );
};