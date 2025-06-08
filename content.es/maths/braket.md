---
title: Notación de Dirac y su aplicación en la mecánica cuántica
---

# Notación de Dirac y su aplicación en la mecánica cuántica
---

## La notación de Dirac
---
Dirac ideó una forma simplificada de expresar los espacios de Hilbert N-dimensionales. A
esta notación también se le conoce cómo notación **bra-ket** y voy a explicar un poco cómo se 
aplica a la mecánica cuántica.

## Sobre los bra-ket
---
Un espacio de Hilbert es un espacio de probabilidad aplicado a un espacio dimensional.

Definamos un espacio de Hilbert cómo la ecuación de probabilidad de posición de una 
particula *"matemáticamente visto cómo una singularidad o punto"* \\( \Psi(\vec{x}) \\)

Un **bra-ket** es una expresión de la denominada notación de Dirac. Se usa en mecánica cuántica
para simplificar integrales del tipo

{{< katex display=true >}}
\int_{-\infty}^{\infty} \psi (\vec{x}) \Phi^{*}(\vec{x})\,d\vec{x}
{{< /katex >}}

Esta expresión se simplifica cómo

{{< katex display=true >}}
\langle \psi \vert \Phi \rangle = \int^{\infty}_{-\infty} \psi (\vec{x}) \Phi^{*}(\vec{x})\,d\vec{x}
{{< /katex >}}

- El **bra** \\( \langle\psi \vert \\) es la función esperanza 
siendo la función de densidad de probabilidad, la función de onda, y la función aplicada,
la función \\( f(x) = 1 \\). La función de onda es, en mecánica 
cuántica, la probabilidad de una particula para estár en una posición determinada.

- El **ket** \\( \vert\Phi\rangle \\) es algo similar, simplemente
que en este caso es el complejo conjugado del bra. Luego también se verá que, aplicado
a un análisis discreto, es un vector columna en lugar de un vector fila.

## Brakets discretos
---
Para la aplicación en la mecánica cuántica, adoptamos unos spines concretos que son las 
posiciones que luego se entenderán cómo elementos de un vector.

Un bra queda definido por la probabilidad de que una particula esté en una posición determinada por
\\(\vec{x_0}\\), que para el caso vamos a simplificar a una sola dimensión.

{{< katex display=true >}}
\langle\Psi(x_0)\vert = \int^{\infty}_{-\infty}\Psi(\vec{x_0})\,d\vec{x} = \Psi(\vec{x_0})
{{< /katex >}}


Con varias dimensiones, el bra cómo vector discreto del espacio de Hilbert queda tal que

{{< katex display=true >}}
\langle\Psi\vert = \{\alpha_0, \alpha_1, \alpha_2, \dots , \alpha_n\}
{{< /katex >}}

El ket es el complejo conjugado del bra y se expresa cómo vector columna

{{< katex display=true >}}
\vert\Psi\rangle = \begin{bmatrix}
\alpha_0^{*} \\
\alpha_1^{*} \\
\alpha_2^{*} \\
\vdots \\
\alpha_n^{*} \\
\end{bmatrix}
{{< /katex >}}

El resultado de multiplicar ambos como vectores da un resultado numérico que representa la 
probabilidad del suceso \\(\sigma\\).

{{< katex display=true >}}
\langle\Psi\vert\Psi\rangle = \{a_0, a_1, a_2, \dots, a_n\}\cdot\begin{bmatrix}
\alpha_0^{*} \\
\alpha_1^{*} \\
\alpha_2^{*} \\
\vdots \\
\alpha_n^{*} \\
\end{bmatrix} = \sigma

{{< /katex >}}

## Operaciones y propiedades
---
Los braket se operan de forma vectorial y tenemos que tener en cuenta ciertas peculiaridades de notación inherentes, cómo por 
ejemplo el producto vectorial de un ket y un bra, esto se llama producto tensorial y el resultado es un 
vector de dimensión \\(n\times m\\) siendo *n* la dimensión del ket, y *m* la del bra. 

El resultado es un nuevo espacio de Hilbert donde ahora tenemos más combinaciones por entrelazamiento cuantico. Esto conlleva 
un amplio repertorio de nuevos espacios posibles cuando combinamos estados cuánticos y con ello, un nuevo estilo de hacer
computación.

Ahora nos encontramos con los operadores, que a fin de cuentas son matrices que realizan proyecciones del vector del espacio
hilbertiano sobre el mismo espacio hilbertiano o un espacio nuevo.

Dentro de los operadores existentes, nos llama la atención los que son hermíticos, es decir, que operados con un ket, entrega
el mismo ket multiplicado por un escalar real \\( \lambda \\).

$$
H\vert\Psi\rangle = \lambda\vert\Psi\rangle
$$

Un ejemplo es el operador \\(H = \begin{bmatrix}1 & 0 \\\ 0 & -1 \end{bmatrix} \\), que aplicado al
ket \\(\vert x\rangle = \begin{bmatrix}1 \\\ 0\end{bmatrix}\\) queda de 
resultado \\(\begin{bmatrix}1 \\\ 0\end{bmatrix}\\) que es \\(\lambda\vert x\rangle\\) con \\(\lambda = 1\\)

## en progreso ...
