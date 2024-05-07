---
title: 'PWA Studio - Links de interés'
pubDate: 2023-03-09
description: "La idea de esta entrada es listar información importante sobre PWA Studio (Frontend PWA de Magento / Adobe Commerce)."
image: "/img/posts/pwa-studio.webp"
tags:
  - "PWA Studio"
---

[Devdocs site](https://developer.adobe.com/commerce/pwa-studio/)

## Theming Proposal

PWA Studio utiliza Tailwind CSS y CSS Modules para estilos, la idea es que se use este primero como base para crear
los distintos themes. Hoy como ven en el título, es una propuesta y va hacia allí, pero está verde aún...

[Theming Proposal](https://github.com/magento/pwa-studio/wiki/Theming-Proposal)

## Extensibility

Para modificar o sumar funcionalidades crearon **Extensibility**, una forma de modificar o agregar componentes
al momento de la compilación. Mi opinión, está bueno pero es un poco engorroso cuando hay que hacer muchos cambios
al theme venia (tema por defecto). Y como considero que es un MVP en proceso, son muchos los cambios y mejoras que hay que desarrollar.

[Extensibility](https://developer.adobe.com/commerce/pwa-studio/guides/general-concepts/extensibility/)

## Wiki

Este link contiene información sobre el proyecto, Roadmap, instalación, versiones y otros.

[Wiki](https://github.com/magento/pwa-studio/wiki)

## Extensions

En este link van a encontrar algunos paquetes de ejemplo que podemos utilizar para crear los nuestros.
Por ejemplo pago Chekmo, paquete de idiomas, modificar configuración de seguridad de headers en Upward, entre otros,

[Extensions](https://github.com/magento/pwa-studio/tree/develop/packages/extensions)

## Otros

* https://github.com/larsroettig/create-pwa-studio-extension
* https://dev.to/chrisbrabender/simplifying-targetables-in-pwa-studio-p8b
* https://github.com/magento/magento2-upward-connector/blob/develop/README.md
* https://www.piyushweb.com/blog/override-the-component-in-the-pwa-studio-project/
* https://github.com/magento/pwa-studio/blob/develop/pwa-devdocs/_drafts/targetables-explainer.md
* https://github.com/larsroettig/pwa-studio-typescript/blob/main/babel.config.js
