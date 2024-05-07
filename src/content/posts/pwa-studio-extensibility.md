---
title: 'PWA Studio Extensibility - Targets & Targetables'
pubDate: 2024-05-06
description: "No morir en el intento al momento de tener que modificar PWA Studio utilizando extensibility - targets y targetables"
image: "/img/posts/pwa-studio-extensibility.webp"
tags:
  - "PWA Studio"
  - "Extensibility"
  - "Targets"
  - "Targetables"
---

[PWA Studio extensibility](https://developer.adobe.com/commerce/pwa-studio/guides/general-concepts/extensibility/) es la forma que PWA Studio nos brinda para modificar / extender el proyecto. 
Que sea la forma que el framework nos brinda, no garantiza que sea simple ni mucho menos fácil de entender... 
Pero bueno, hay que seguir las buenas prácticas.

## Targets

Los targets son objetos que representan áreas del código a las que podemos acceder e interceptar.
Es una variante del patrón javascript llamado **Tapable hook** (comparte algunas funcionalidades con [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter) de NodeJS)

Un ejemplo es asociar un componente a un método de pago:

```javascript
  module.exports = targets => {
    targets
      // intercepta a @magento/pwa-buildpack 
      // para acceder a specialFeatures    
      .of('@magento/pwa-buildpack')
      .specialFeatures.tap(flags => {
        flags[targets.name] = {
            esModules: true,
            cssModules: true,
            graphqlQueries: true,
            i18n: true
        };
    });
    
    targets
      // intercepta a @magento/venia-ui 
      // para acceder a checkoutPagePaymentTypes
      .of('@magento/venia-ui')
      .checkoutPagePaymentTypes.tap(payments =>
        payments.add({
            paymentCode: 'paymentCode',
            importPath:
                targets.name + '/src/components/payment.js'
        })
    );
  }
```


## Targetables

Los objetos Targetables nos permiten acceder a archivos fuente del proyecto o biblioteca. 
A diferencia de Target, los objetos Targetable brindan acceso al código fuente del módulo.

En este apartado hay varias formas de acceder al código fuente:

### Acceder al código fuente mediante esModule

 ```javascript

  const { Targetables } = require('@magento/pwa-buildpack');
  
  module.exports = targets => {
    // se instancia Targetables pasando como parámetro targets
    const targetables = Targetables.using(targets);

    // instanciamos esModule para interceptar el archivo a modificar
    const SearchTrigger = targetables.esModule(
      '@magento/venia-ui/lib/components/Header/searchTrigger'
    );

    // importamos un ícono para utilizar luego
    SearchTrigger.addImport("{ X as CloseIcon } from 'react-feather'");
    
    // accedemos al código del archivo y antes de la siguiente aparición
    // insertamos nuestro código
    SearchTrigger.insertBeforeSource(
        'SearchIcon} />\n',
        'active ? CloseIcon : '
    );
  }

 ```

 ### Acceder al componente React mediante reactComponent

 Extiende de esModule, por lo que también se pueden acceder a los métodos que nos brinda esModule

 ```javascript

  const { Targetables } = require('@magento/pwa-buildpack');
  
  module.exports = targets => {
    // se instancia Targetables pasando como parámetro targets
      const targetables = Targetables.using(targets);

      // instanciamos reactComponent para interceptar
      // el componente a modificar
      const MegaMenuComponent = targetables.reactComponent(
          '@magento/venia-ui/lib/components/MegaMenu/megaMenu'
      );

      // editamos una de sus propiedades
      MegaMenuComponent.setJSXProps('MegaMenuItem', {
          categoryUrlSuffix: '{categoryUrlSuffix(category)}'
      });
  };
  
 ```