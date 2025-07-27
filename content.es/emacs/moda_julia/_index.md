---
title: Julia es una moda
---

![](https://upload.wikimedia.org/wikipedia/commons/1/1f/Julia_Programming_Language_Logo.svg)
# Julia es una moda
---

{{< katex display=true >}}
{{< /katex >}}

Hace 3 años me embarqué en aprender Julia buscando una alternativa a GNU Octave, a Python 
*<<usando numpy>>* y también a Matlab. Julia se presentaba cómo un lenguaje de propósito general
especialmente enfocado para el uso numérico y científico.

Julia, para el que no lo conozca, es un lenguaje con una sintaxis muy similar a Matlab y con un
motor de ejecución/compilador de tipo JIT *Just In Time*, es decir, el código que tu escribes en 
julia se va compilando estructuradamente conforme se manda a ejecutar; por ejemplo, si escribo la
siguiente sentencia

```julia
function randi(n::Int, rows::Int = 1, cols::Int = 1)
    if (rows == 1 && cols == 1)
        return Int(rand()*n)
    end
    return Int.(n*rand(rows,cols))
end
```

esta función se compilará primero y luego será ejecutado *(si es ejecutable)*.

## El problema de Julia
---
Julia, cómo bien dije antes, se presenta cómo un lenguaje de propósito general y te diré porque no
lo es. El compilador JIT de Julia, lamentablemente tiene un tiempo de compilación muy muy lento para 
poder ser un lenguaje de scripting o de uso para software de una sola ejecución, quiero decir que esta 
ejecución tarda demasiado para ser comparable incluso a la velocidad de python para realizar una sola
tarea.

He realizado un pequeño ejemplo para mostrar este problema

Primero he escrito este script usando la función antes definida en julia, este script simple solo
hace algo aleatorio pero que muestra el problema que tiene julia al tener que compilar la función 
cómo paso previo, y no solo para una dimensión de matriz sino para matrices de diversas dimensiones.

```julia
# Script calc.jl
N = 2130
for i = 1:N
    r = randi(10)
    c = randi(10)
    D = rand(r,c) * rand(c,r)
    print(D)
end
```

Cuando ejecuto este script de una sola vez, se toma 3 segundos en terminar.
> $ time julia calc.jl

` total time: 3.06 seg`

Ahora escribo la misma función en python en un script nuevo:

```python
import numpy as np

for i in range(2130):
    r = np.random.randint(10)
    c = np.random.randint(10)
    D = np.random.rand(r,c) @ np.random.rand(c,r)
    print(D)
```

En esta ejecución, el script ha tardado 0.7 segundos, menos de 4 veces lo que tardó Julia.
> $ time python3 calc.py

` total time: 0.73 seg`

Esto deja claro que Julia **NO** es un lenguaje de propósito general.

## ¿Entonces julia sirve para algo?
---
Julia, cómo bien he dicho, no es de propósito general pero si es de proposito variado pero específico.
Julia es una muy buena opción para elaborar software que se tiene que ejecutar multiples veces usando 
las mismas utilidades, ya sea las mismas funciones o rutinas. Cuando se trata de este tipo de usos, el
lenguaje está cerca de la eficiencia de C.

Yo personalmente creo que Julia es una moda pasajera por motivos de motivación económica tal vez, entre
los patrocinadores está ASML o Nvidia, debido a esto se ha construido toda una estructura de fomento 
del uso de Julia con conferencias cómo el JuliaCon, ser parte del GSoC y tener JuliaHub que es un 
servidor dedicado a paquetes de Julia no gratuitos y gratuidos.

También me parece importante destacar que existen alternativas a Julia pero no tan conocidas y que por ello
no tienen tantas librerias y soporte pero que son igual de rápidas en el ámbito de Julia y en otros ámbitos.
Mi favorito es LuaJIT, es la versión JIT de Lua y va cómo un tiro, incluso más rápido que julia, y no solo 
en ejecuciones posteriores a la primera sino que en la primera ejecución también es muy rápido; Lua es
un lenguaje más sencillo sintácticamente y parsearlo conlleva mucho menos cómputo que Julia se vea cómo se 
vea.

## Sintaxis de Julia
---
Julia tiene una sintaxis muy completa y que facilita mucho la programación. Es un lenguaje tipado, no 
fuertemente tipado pero si es tipado y a mi parecer, que los lenguajes sean o no tipados muesta lo maduro
que es dicho lenguaje. Muchos lenguajes quieren no ser tipados para dar una *<<facilidad>>* al desarrollador
hasta que se quiere hacer algo serio con el lenguaje en sí, entonces aparecen problemas que conllevan a
hacer el lenguaje tipado, no hay más que ver lo que pasó con Javascript para que surgiese Typescript.

Julia no solo ofrece una sintaxis sino que también tiene características muy interesantes, expongo a continuación las que más me gustan

- A partir de la versión 1.5 o 1.6 creo ofrece genéricos
- Permite metaprogramación, es decir, programar código que ofrece código que luego se evalua.
- El REPL es una libreria del lenguaje puediendo incluso acceder a la secuencia estructural de un parsing
- Puedes tener un tipado fuerte si te comprometes a usar definición de tipo en los parámetros de la función
y en las asignaciones primeras.
- Aplicar una función a una matriz es tan simple cómo usar el operador `.` `sqrt(3)` ofrece la raíz de 3,
`sqrt.(rand(4,4))` hace la raíz de una matriz de aleatorios con distribución uniforme de dimensión 
\\(4\times 4\\)

# Las modas son temporales
---
Las modas solo tienen un tiempo de vida, te hacen sentir anticuado pero no hay que dejarse llevar por 
cualquier brisa. Se consciente de lo que necesitas y sabes, lo más importante es saber en que inviertes tu
energía *<<tiempo>>*. Aprender justamente julia puede no ser una pérdida de tiempo si no lo acabas usando,
también puedes aprender cosas muy útiles por el trayecto cómo es programar de una forma más estructurada o 
también aprender a meta-programar.


