# Como en casa

Aplicación móvil desarrollada utilizando los Frameworks Ionic 4 y Angular 7.
Además se utilizaron funcionalidades de [Ionic Capacitor](https://capacitor.ionicframework.com/), que nos permite acceder a características nativas de iOS, Android, Electron o la web utilizando una misma base de código.

El proyecto fué generado con [Ionic CLI](https://ionicframework.com/docs/cli/) version 4.12.0.

## Explanation

**Como en casa** es una aplicación que permite a individuos particulares (**Chefs**) crear **Mesas virtuales** para ofrecer comidas fabricadas por ellos mismos a otros usuarios registrados en la plataforma. Un usuario que se inscribe en una mesa virtual se lo conoce como **Comensal**.
Todos los individuos registrados pueden tanto ingresar a una mesa virtual creada por otro usuario así como también crear sus propias mesas virtuales.

## Features

- Registro de usuario al sistema con posibilidad de seleccionar una foto de perfil utilizando la cámara del dispositivo o bien seleccionando un avatar de los disponibles en la aplicación.
- Creación de mesas virtuales desde la pestaña “Crear mesa virtual” con posibilidad de seleccionar una foto del plato capturada con la cámara del dispositivo.
- Posibilidad de ingresar a una mesa virtual creada por otro usuario. Las mesas virtuales que una persona crea, no son visibles por el en el feed (pestaña “Inicio”), pero si son visibles por otros usuarios.
- Posibilidad de consultar las mesas virtuales creadas por un usuario desde la opción “Ver mis mesas virtuales” y de eliminar una mesa deslizando hacia la izquierda.
- Posibilidad de ver un resumen de la cuenta del usuario desde la opción “Mi cuenta”
- Acceso a funciones nativas a través de Capacitor, tales como toasts, cámara, browser, storage
- Validación de todos los campos de los formularios (registro, login, creación de mesas, etc.) utilizando formularios reactivos.

## Getting Started

### Prerequisites

Para poder ejecutar la aplicación se requiere del siguiente software:

- [node.js](https://nodejs.org/) - Entorno de ejecución para JavaScript.
- [Angular CLI](https://cli.angular.io/) - Interfaz de línea de comandos para Angular.
- [Ionic CLI](https://ionicframework.com/docs/cli) - Interfaz de línea de comandos para Ionic.

Adicionalmente, para poder utilizar el proyecto se requiere crear una aplicación desde la consola de [Firebase](https://firebase.google.com/).

### Installing

Para que el sitio web funcione, debemos dirigirnos al archivo **src/environments/environment.ts** dentro del proyecto y completar la variable “firebase” con los datos que nos proporciona la aplicación creada desde la consola de Firebase.
A continuación se puede ver como obtener los datos (recordar que la aplicación creada en firebase debe ser una aplicación web):

https://user-images.githubusercontent.com/23145218/58391364-faaabd80-800b-11e9-8482-3ae66baec2b6.gif

Una vez vinculada la aplicación de firebase a nuestro proyecto, podemos dirigirnos a la raíz del proyecto y ejecutar un servidor de desarrollo con el siguiente comando:

```
  ionic serve
```

Luego es posible ingresar al sitio web desde la siguiente URL:

```
http://localhost:8100/
```

## Running the tests

### Registrando un usuario utilizando un avatar

https://user-images.githubusercontent.com/23145218/58393221-2c278700-8014-11e9-955c-99d5566d50e0.gif

### Inicio de sesión y página de "Mi cuenta"

https://user-images.githubusercontent.com/23145218/58393216-23cf4c00-8014-11e9-825d-cab9aee421e9.gif

### Inscripción a mesa virtual

https://user-images.githubusercontent.com/23145218/58393212-1fa32e80-8014-11e9-80cc-91cba6fc49c7.gif

### Creación y borrado una de Mesa virtual

https://user-images.githubusercontent.com/23145218/58393207-1619c680-8014-11e9-825e-7ead2fa7fe05.gif

## Built With

- [Angular 7](https://angular.io/) - Framework SPA.
- [Ionic 4](https://ionicframework.com/) - Hybrid mobile application framework.
- [Capacitor 1.0 Beta](https://capacitor.ionicframework.com/) - Cross-Platform App Runtime
- [Firebase](https://firebase.google.com/) - Backend service that provides data storage, file storage and authentication.
- [AngularFire2](https://github.com/angular/angularfire2) - Angular binding for Firebase.

## Humble documentation

https://docs.google.com/document/d/1M7PFaeKbkbrHJM1D3io2zP3ho5Jbf0u9c0cTur8Kon4/edit?usp=sharing

## Authors and Participants

- **Arrúa Luciano** - _Initial work_ - [lucianorarrua@gmail.com](lucianorarrua@gmail.com) - [GitHub](https://github.com/lucianorarrua)
- **Amarillo Leandro** - _Initial work_ - [leandroamarillo95@gmail.com](leandroamarillo95@gmail.com) - [GitHub](https://github.com/lucianorarrua)
- **Bernal Germán** - _Initial work_ - [bernalgermanignacio@gmail.com](bernalgermanignacio@gmail.com)
- **Paradiso Luciano** - _Initial work_ - [lucianogparadiso@gmail.com](lucianogparadiso@gmail.com)
