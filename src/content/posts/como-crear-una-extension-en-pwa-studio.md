---
title: 'PWA Studio - Cómo crear una extensión (package)'
pubDate: 2024-05-19
description: "Cómo crear una extensión en PWA Studio y poder reutilizar en varios proyectos."
image: "/img/posts/como-crear-una-extension-en-pwa-studio/pwa-studio-como-crear-una-extension.webp"
tags:
  - "PWA Studio"
  - "packages"
  - "Extensión"
---

Ya sabemos que una de las formas de extender el proyecto PWA Studio es creando paquetes, yo lo suelo usar mucho cuando considero que es una funcionalidad que puedo luego replicar en otros proyectos.

## Crear la extensión PWA Studio

Personalmente me gusta colocar mis extensiones dentro de una carpeta llamada **packages** en la raíz del proyecto; otra opción es dentro de src.

Luego crear una carpeta con el nombre del vendor, en este caso yo voy a usar **@joseamietta**, y allí vamos a colocar todos nuestros paquetes.

Por ejemplo una extensión que siempre uso es para manejar las traducciones al Español, por lo que creamos **packages/@joseamietta/language-pack**

Dentro del directorio creado ejecutamos **yarn init** para crear y configurar nuestro paquete.
Vamos a tener que ingresar los siguientes datos (los datos entre paréntesis es la default que nos sugiere yarn):
- name: @joseamietta/language-pack
- version (1.0.0):
- description: es_ES package for PWA Studio
- entry point: intercept.js
- repository URL: 
- author: José M. Amietta
- Licence (MIT):
- private:

Al finalizar veremos el archivo package.json generado

![package.json generado por yarn init](/img/posts/como-crear-una-extension-en-pwa-studio/package.json.webp)

### Agregar dependencias

Luego agregamos las dependencias peer necesarias de PWA Studio

```sh
yarn add --peer react @magento/venia-ui @magento/pwa-buildpack
```

Y finalmente sumamos el bloque con la directiva pwa-studio.targets.intercept, la cual le indica que que nuestro paquete va a interceptar
las funcionalidades de PWA Studio

![package.json luego de sumar intercept.json y dependencias peer](/img/posts/como-crear-una-extension-en-pwa-studio/package.json-with-intercept.webp)


### Sumar vendor como trusted-vendor

Es necesario modificar el package.json del root del proyecto para indicar que nuestro package es un vedor de confianza y lo autorizamos para usar targets.

![package.json trusted-vendors](/img/posts/como-crear-una-extension-en-pwa-studio/trusted-vendors.webp)

## Creando el archivo intercept

Continuando con el ejemplo del paquete de idiomas, en la carpeta language-pack crear el archivo **intercept.js** con el siguiente contenido

```javascript
module.exports = targets => {
    const builtins = targets.of('@magento/pwa-buildpack');

    builtins.specialFeatures.tap(features => {
        features[targets.name] = { i18n: true };
    });
};
```

## JSON de traducciones

Y finalmente creamos el archivo de idioma para que PWA Studio lo tome.

![Estructura de extensión](/img/posts/como-crear-una-extension-en-pwa-studio/package-folder.webp)

El archivo de idioma es un archivo JSON como se muestra en la imagen.

## Agregar nuestra extensión al proyecto

Una vez que nuestra extensión está lista, resta sumarla al proyecto mediante **yarn add link**

link nos permite sumar paquetes mediante link simbólico, por lo que se creará una referencia en node_modules/ de nuestro paquete.

```sh
yarn add link:./packages/@joseamietta/language-pack
```


## Además...

Por supuesto que es un ejemplo básico, pero pueden utilizar cualquiera de los targets disponibles en el post anterior
dentro del paquete. La idea siempre es extender o mejorar la funcionalidad de nuestro proyecto utilizando buenas prácticas.

[PWA Studio Extensibility - Targets & Targetables](/posts/pwa-studio-extensibility)

Y otra forma de hacerlo más automático es mediante la utilidad [PWA Studio extension generator](https://github.com/larsroettig/create-pwa-studio-extension) que mediante algunos comandos ya nos genera toda la extructura necesaria para nuestra extensión.

Si quieren pueden revisar algunas [extensiones de ejemplo](https://github.com/magento/pwa-studio/tree/develop/packages/extensions) en el repositorio de PWA Studio.

