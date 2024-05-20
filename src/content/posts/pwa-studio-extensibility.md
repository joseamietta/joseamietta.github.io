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

**Referencia de paquetes que pueden ser interceptados en PWA Studio**

- [Buildpack](https://developer.adobe.com/commerce/pwa-studio/api/buildpack/targets/)
- [Peregrine](https://developer.adobe.com/commerce/pwa-studio/api/peregrine/)
- [Venia UI](https://developer.adobe.com/commerce/pwa-studio/api/venia/targets/)

*Interceptar Peregrine lo veremos luego ya que necesita su propia nota!*

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

 **Métodos disponibles para utilizar con esModule**

- addImport
- insertAfterSource
- insertBeforeSource
- prependSource
- spliceSource

 Las referencias las podemos encontrar en su archivo fuente [TargetableESModule.js](https://github.com/magento/pwa-studio/blob/v14.0.0/packages/pwa-buildpack/lib/WebpackTools/targetables/TargetableESModule.js)


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

 **Métodos disponibles para utilizar con reactComponent**

- addJSXClassName
- addReactLazyImport
- appendJSX
- insertAfterJSX
- insertBeforeJSX
- prependJSX
- removeJSX
- removeJSXProps
- replaceJSX
- setJSXProps
- surroundJSX

Las referencias las podemos encontrar en su archivo fuente [TargetableReactComponent.js](https://github.com/magento/pwa-studio/blob/v14.0.0/packages/pwa-buildpack/lib/WebpackTools/targetables/TargetableReactComponent.js)

Y como esta clase extiende de TargetableESModule.js podemos también usar sus métodos.

## Buenas prácticas

Quiénes ya hayan trabajado con estas herramientas realmente saben que tienen un grado de aprendizaje y lógica alto
debido a que es necesario evaluar las soluciones antes de implementarlas y generar muchas intercepciones si se modifican componentes
principales.

Les dejo algunas recomendaciones:

**Reemplazar componente si se necesitan hacer muchas intercepciones**

Muchas veces tenemos que importar componentes o paquetes, modificar lógica y estilos.
En esos casos recomiendo crear un componente propio y reemplazarlo con **replaceJSX**

**Utilizar extensiones que nos ayuden a estructurar nuestros targets**

Yo creé la extensión [simplifying-targetables](https://github.com/joseamietta/simplifying-targetables) la cual pueden utilizar o tomar como punto de partida.
Esta extensión permite que estructuremos nuestras intercepciones de la siguiente manera

```

  Root
    - src
      - targets
      - wrappers

```

Dentro de targets ubicamos nuestros estilos y componentes a interceptar, y en wrappers los talons. Se utilizan con el mismo nombre original del archivo lo cual ayuda a que sea más simples las modificaciones.

Esta extensión está basada en el siguiente paquete [@larsroettig/component-targetables](https://github.com/larsroettig/component-targetables)

**Tratar de abstraer los componentes en paquetes**

Siempre que sea posible, creo que es una buena práctica abstraer los componentes en paquetes locales para luego poder reutilizarlos en otros proyectos.

En mi caso creo una carpeta llamada **packages** en la raíz del proyecto y ahí coloco mis paquetes nombrados como @vendor/package-name
Y los instalo mediante yarn add link:./packages/@vendor/package-name

En fin... Este tema dá para largo por lo cual por ahora vamos a dejar por acá y de seguro iré publicando otras notas con más contenido que pueda ser de ayuda a quiénes estén comenzando con PWA Studio.