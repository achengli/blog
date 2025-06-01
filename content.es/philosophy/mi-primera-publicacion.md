---
title: Mi primera publicación
---

## Primera publicación
---

Hola, Esta es mi primera publicación usando Hugo. Es genial para poder publicar temas 
relacionados con la ciencia o la filosofía por ejemplo.

Todavia no se como colocar ciertos simbolos aqui pero voy a probar.

## Otro bloque estaria bien colocarlo por aqui
---
No se si estara funcionando pero quiero probar otra seccion. En esta ocasion quiero colocar
algo de codigo

```js
function Hello(){
console.log("Hello, World!")
}

Hello()
```

## Empezando con algo de latex
---
En esta primera sección quiero probar cómo funciona la inserción de LaTeX sobre una 
web estática hecha con **Hugo**

## Example

{{< katex display=true >}}
\begin{equation}
g(x) = sin\left(\frac{cos(x) - 1}{x^2}\right)
\end{equation}
{{< /katex >}}

## Display Mode Example

Here is some inline example: {{< katex >}}\pi(x){{< /katex >}}, rendered in the same line. And below is `display` example, having `display: block`

{{< katex display=true >}}
\begin{equation}
f(x) = \int_{-\infty}^\infty\hat f(\xi)\,e^{2 \pi i \xi x}\,d\xi
\end{equation}
{{< /katex >}}

Text continues here.

## Insercion de imagenes

Para insertar una imagen, se hace igual que ocurre en un markdown tipico.

![tao logo](tao.jpg)
