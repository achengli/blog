---
title: "Reimplementación de crosstab"
---

# Reimplementación de crosstab
--- 
El otro día me encontré con un problema de funcionamiento en el paquete de estadística
de Octave, el proyecto [statistics](https://github.com/gnu-octave/statistics). El problema
reside en el tipo de dato `NaN`, el cual al ser pasado dentro de una lista de datos 
no rendía cómo lo hace análogo en Matlab.

La función se define así *(ten en cuenta que si pongo <<?>> en un parámetro me refiero a que 
es opcional, tanto de entrada cómo devuelto)*

```octave
function [t, chisq?, p?, label?] = crosstab(x1, x2, ..., xn)
  ## Cuerpo de la función.
endfunction
```

{{< katex display=true >}}
{{< /katex >}}

Cómo ves, es una función que obligatoriamente devuelve `t`, siendo esta la variable que almacena
las disposiciones cruzadas de variables estadísticas.

## ¿Cómo funciona crosstab?
---
Suponte que tenemos \\(n\\) variables aleatorias con \\(m\\) muestras cada una, ni una más,
ni una menos, todos los vectores que tenemos tienen la misma longitud. Pues ahora, 
teniendo eso en cuenta, lo que buscamos saber es cuántas veces ocurre que 
\\( \[ x_1^1, x_1^2, \cdots, x_1^n \] = \[a_1, a_2, \cdots, a_n\] \\), donde los \\(x_i^j\\) refieren
a las muestras de la variable \\(X_i\\)

$$
    X_i \\, \vert \forall \\, j \in \[1\cdots m\] \vert m \in \N
$$

Vamos a construir la matriz \\( X\\, \in\\, \R^{m\times n}\\) la cual acoge las 
variables \\(x_1\\) hasta \\(x_n\\) en columnas tal que

$$
    X = \begin{bmatrix}
        x_1^{(1)} & x_2^{(1)} & \cdots & x_n^{(1)} \\\
        x_1^{(2)} & x_2^{(2)} & \cdots & x_n^{(2)} \\\
        \vdots & \vdots & \ddots & \vdots \\\
        x_1^{(m)} & x_2^{(m)} & \cdots & x_n^{(m)} \\\
    \end{bmatrix}
$$

Si recogemos los elementos únicos de cada variable, es decir, las muestras diferentes entre sí, 
creamos los vectores de valores únicos que definiré cómo \\(U_i\\) para cada \\(x_i\\), entonces
lo que buscamos es crear una matriz multidimensional \\(T\\) que definimos cómo

$$
    T \in \R^{\times_{i=1}^n length\(U_i\)}
$$

Teniendo en cuenta que \\(length\\) se define cómo

$$
    length : \R^n \rightarrow \N \\, \vert \\, length\(X\) ::= \\#_{elem}(X) 
$$

Es decir, es la definición formal *<<para los "talibanes" de la programación funcional y matemáticos>>*
de `length(x)`, el número de elementos de un vector. 

Ahora bien, en cada posición de la matriz multidimensional \\(T\\) tenemos una combinación de elementos
únicos de los vectores \\(x_i\\) posible; si el valor de esa posición es 0, entonces quiere decir que
no hay ninguna ocurencia de ese suceso de secuencias de variables, mientras que si es distinto de 0, 
informa del número de veces que ese suceso ocurre cómo vector fila de la matriz \\(X\\).

Pongamos un ejemplo, si tengo \\(x_1 = [1, 3, 7, 7]\\) y \\(x_2 = [2, 4, 4, 2]\\), entonces los valores
únicos de \\(x_1\\) y \\(x_2\\) serían \\(u_1 = [1, 3, 7]\\) y \\(u_2 = [2, 4]\\) respectivamente
*<<siempre en orden creciente>>*. La dimensión de la matríz \\(T\\) sería \\(3\times 2\\), es decir
\\(T\\,\in\\,\N^{3\times 2}\\) \\({}^{[1]}\\), por lo tanto tenemos una matriz y no una matriz multidimensional.



\\(
{}^{[1]} {}^{Como\\, veras\\, estoy\\, definiendo\\, el\\, 0\\, como\\, número\\, natural\\, jejeje}
\\)

Ahora disponemos los vectores \\(x_1 \\: y\\: x_2\\) en columnas de la matriz \\(X\\)

$$
    X = \begin{bmatrix}
        1 & 2 \\\
        3 & 4 \\\
        7 & 4 \\\
        7 & 2
    \end{bmatrix}
$$

Bien, pues una disposición es una fila de esta matriz y lo que buscamos es colocar en la matriz \\(T\\)
las ocurrencias de valores únicos.

La matriz \\(T\\) sería de la forma

$$
T = \begin{bmatrix}
        \(2\) \rightarrow & \square & \square & \square \\\
        \(4\) \rightarrow & \square & \square & \square \\\
        {} & \uparrow & \uparrow & \uparrow \\\
        {} & \(1\) & \(3\) & \(7\)
    \end{bmatrix} = 
    \begin{bmatrix}
        1 & 0 & 1 \\\
        0 & 1 & 1
    \end{bmatrix}
$$

## Problema con NaN
---
El valor **NaN** *Not a Number* es un tipo constante de Octave y Matlab que sirve para identificar aquellos
casos donde el resultado no se resuelve en el dominio real ni el complejo.

Cuando enfrentamos un vector con este valor en la implementación de matlab usando `crosstab` el 
resultado de T excluye  NaN cómo un valor único y también define a 0 las ocurrencias en las que se
implica a `NaN`, sin embargo, en la implementación de Octave, el resultado incluye una dimensión para NaN
en T y también cuenta los resultados de coincidencias con NaN.

La vieja implementación de octave emplea un algoritmo recursivo para obtener los indices de `t` de tal 
forma que en cada recursión reduce la dimensión entendible y concatena pares de resultados medidos, el 
problema reside en que, además de que esta recursividad, si se tratase de un valor de \\(m\\) muy elevado
induciría un problema de recursión apilada en octave, también implica un aumento en la complejidad 
del abordado del problema. Mira el código siguiente que incluye la función recursiva empleada para 
entender un poco de lo que hablo.

```octave
function [t, chisq, p, labels] = crosstab (varargin)

  ## check input
  if (nargin < 2)
    print_usage ();
  endif

  ## main - begin
  v_length = [];                    # vector of lengths of input vectors
  v_reshape = [];                   # vector of the dimensions of t
  X = [];                           # matrix of the indexed input values
  labels = {};                      # cell array of labels

  for i = 1:nargin
    vector = varargin{i};
    ## If char array, convert to numerical vector
    if (ischar (vector) || iscellstr (vector))
      try
        [vector, gnames] = grp2idx (vector);
      catch
        error ("crosstab: x1, x2 ... xn must be vectors.");
      end_try_catch
    else
      if (! isvector (vector))
        error ("crosstab: x1, x2 ... xn must be vectors.");
      endif
      vector = vector(:);
      gnames = cellstr (num2str (vector));
    endif
    v_length(i) = length (vector);
    if (length (unique (v_length)) != 1)
      error ("crosstab: x1, x2 ... xn must be vectors of the same length.");
    endif
    X = [X, vector];
    for h = 1:length (gnames)
      labels{h, i} = gnames{h};
    endfor
    v_reshape(i) = length (unique (vector));
  endfor

  v = unique (X(:, nargin));
  t = [];

  ## core logic, this employs a recursive function "crosstab_recursive"
  ## given (x1, x2, x3, ... xn) as inputs
  ## t(i,j,k,...) = sum (x1(:) == v1(i) & x2(:) == v2(j) & ...)
  for i = 1:length (v)
    t = [t, (crosstab_recursive (nargin - 1,...
      (X(:, nargin) == v(i) | isnan (v(i)) * isnan (X(:, nargin)))))];
  endfor

  t = reshape(t, v_reshape);        # build the nargin-dimensional matrix

  ## additional statistics
  if (nargout > 1)
    if (length (v_reshape) > 1)
      [p, chisq] = chi2test (t);
    endif
  endif
  ## main - end


  ## function: crosstab_recursive
  ## while there are input vectors, let's do iterations over them
  function t_partial = crosstab_recursive (x_idx, t_parent)
    y = X(:, x_idx);
    w = unique (y);

    t_partial = [];
    if (x_idx == 1)
      ## we have reached the last vector,
      ## let the computation begin
      for j = 1:length (w)
        t_last = sum (t_parent & (y == w(j) | isnan (w(j)) * isnan (y)));
        t_partial = [t_partial, t_last];
      endfor
    else
      ## if there are more vectors,
      ## just add data and pass it through to the next iteration
      for j = 1:length (w)
        t_next = crosstab_recursive (x_idx - 1, ...
                 (t_parent & (y == w(j) | isnan (w(j)) * isnan (y))));
        t_partial = [t_partial, t_next];
      endfor
    endif
  endfunction
endfunction
```

Bueno, lo imporante es la función recursiva dentro de este pedazo de código. Después de hacer un
cribado de los datos de entrada y formateo de ellos a medida del algoritmo, continua empleando 
la función `crosstab_recursive` la cual busca coincidencias de los valores del vector con 
los únicos del vector, y emplea una lógica chapurrera para evadir los `NaN` en el calculo de comparación
y contarlos también en su factor dimensional.

```octave
  function t_partial = crosstab_recursive (x_idx, t_parent)
    y = X(:, x_idx);
    w = unique (y);

    t_partial = [];
    if (x_idx == 1)
      ## we have reached the last vector,
      ## let the computation begin
      for j = 1:length (w)
        t_last = sum (t_parent & (y == w(j) | isnan (w(j)) * isnan (y)));
        t_partial = [t_partial, t_last];
      endfor
    else
      ## if there are more vectors,
      ## just add data and pass it through to the next iteration
      for j = 1:length (w)
        t_next = crosstab_recursive (x_idx - 1, ...
                 (t_parent & (y == w(j) | isnan (w(j)) * isnan (y))));
        t_partial = [t_partial, t_next];
      endfor
    endif
  endfunction
``` 

## Primera solución al problema - solución fallida
---
En un primer momento, quise darle un enfoque puramente matricial al reto pero me encontré con un
problema al intentar mantener el paradigma funcional de la recursividad de la implementación, el caso es
que quería aplicar una busqueda de indices en base a valores resta de la matriz \\(X\\) y los 
únicos \\(u_i\\)

Si tenemos \\(x_1\\) y \\(x_2\\) tal que 

$$ 
    x_1 = [x_1^{(1)}, x_1^{(2)}, \cdots, x_1^{(m)}] \\\
    x_2 = [x_2^{(1)}, x_2^{(2)}, \cdots, x_2^{(m)}]
$$

Definimos dos matrices \\(U_1\\) y \\(U_2\\) tal que esten compuestas por vectores columna en el caso de
\\(U_1\\) donde cada vector columna sea identico e igual a \\(\vec{u_1}\\), y de vectores fila
para \\(U_2\\) con filas identicas e iguales al vector \\(\vec{u_2}\\)

$$
    U_1 = \begin{bmatrix}
        \vec{u_1} & \vec{u_1} & \cdots_{\times m} & \vec{u_1}
    \end{bmatrix} \\, \vert \\, \vec{u_1} = \begin{bmatrix}
            u_1^{(1)} \\\
            u_1^{(2)} \\\
            \vdots \\\
            u_1^{(m)} \\\
        \end{bmatrix} \vert U_1 \\, \in \\, \R^{m\times m}
$$

$$
    U_2 = \begin{bmatrix}
        \vec{u_2} \\\
        \vec{u_2} \\\
        \vdots_{\times m} \\\ 
        \vec{u_2}
    \end{bmatrix} \\, \vert \\, \vec{u_2} = \begin{bmatrix}
            u_2^{(1)} &
            u_2^{(2)} &
            \cdots &
            u_2^{(m)} &
        \end{bmatrix} \vert U_2 \\, \in \\, \R^{m\times m} 
$$


Entonces la resta de \\(U_2\\) y \\(U_1\\) queda

$$
    D = U_2 - U_1 = \begin{bmatrix}
        d_{1,1} & d_{1,2} & \cdots & d_{1,m} \\\
        d_{2,1} & d_{2,2} & \cdots & d_{2,m} \\\
        \vdots & \vdots & \ddots & \vdots \\\
        d_{n,1} & d_{n,2} & \cdots & d_{n,m}
    \end{bmatrix}
$$

Bueno, no se si he escrito bien los indices o las dimensiones de las matrices \\(U_1\\) y \\(U_2\\),
el caso es que esta resta representa la diferencia entre únicos de los dos vectores, y ahora, teniéndolos
tan bien dispuestos *<<fijate que la matriz \\(D\\) tiene la dimensión de \\(T\\) si fuese sólo de 2 
variables>>* 

Ahora aplicando la diferencia entre los vectores \\(\vec{x_1}\\) y \\(\vec{x_2}\\) tenemos el vector
\\(\vec{d}\\) que permite obtener cuantas veces se encuentra un mismo valor asociado a un 
\\(d_{i,j} \in D\\)

$$
    \vec{d} = \vec{x_2} - \vec{x_1}
$$

Pues por cada único de \\(\vec{d}\\) definido cómo \\(d_u^{(i)}\\) buscamos cuantas veces se 
repite en \\(\vec{d}\\) y a continuación colocamos el número de ocurrencias en su posición asociada 
a \\(D\\) tal que 

$$
    t_{j,k} = count \( d_u^{(i)} \triangleq d_{j,k}\)
$$

$$
count:(\R^n,\R,f:(\R^n,\R) \rightarrow \[0,1\]) \rightarrow \N \\,\vert \\, count(x,y,f) ::= \\#_{elem}\(f(x, y) \equiv 1\)
$$

Ahora, cada fila de \\(T\\) es enviada recursivamente a otra aplicación de este algoritmo pero considerando 
\\(x_i\\) y \\(x_{i-1}\\) habiendo considerado en la recursión anterior \\(x_{i+1}\\) y \\(x_i\\), estos
resultados se multiplican por la fila pero usando \\(T_u\\) que es la matriz de valores unitarios de \\(T\\),
es decir, es la matriz que no cuenta las ocurrencias de sucesos sino que tiene un 0 si no ha ocurrido y un 1
si ha ocurrido, esto se multiplica por el vector, columna por columna y queda de resultado una matriz 
con las coincidencias que se envia recursivamente hacia atras y se va concatenando.

Esta solución resuelve el problema de tener dimensiones extra con los valores `NaN` pero seguimos con un
problema de falsas ocurrencias debidas a que las dimensiones posteriores no tienen información para 
determinar los NaN en dimensiones anteriores; cuando digo dimensiones me refiero a las otras \\(x_i\\) con
\\(i > j\\) siendo \\(j\\) el indice del vector o variable que se esta empleando en la recursión.

A continuación dejo el código de la implementación *<<sólo de la función recursiva para no inflar la 
página con contenido repetido>>*

```octave
function t_partial = recursive_ctab (iter, X, m)
  x1 = X(:, iter);
  x2 = X(:, iter+1);
  d = x2 - x1;
  Xd = unique (x2(!isnan(x2))) - unique (x1(!isnan(x1)))';
  M = zeros(size(Xd));
  t_partial = [];

  for di = unique(d(:)')
    M(find(Xd == di)) = numel(find(d == di));
  endfor

  if (nargin == 2)
    m = ones(size(M, 1), 1);
  endif
  
  m = m(:)

  M = M';
  M_unitary = M;
  M_unitary(M_unitary != 0) = 1;
  M_m = m'.*M_unitary;

  if (iter > 1)
    for idx = 1:size(M, 2)
      _m = M_m(:, idx)';
      t_m = recursive_ctab (iter-1, X, _m);
      t_partial = [t_partial, t_m];
    endfor
  else
    t_partial = reshape(M_m, 1, numel(M_m));
  endif
endfunction
```

## Segunda solución - implementación exitosa
---
Después de la anterior solución llegué a un consenso para reducir la función y eliminé la parte recursiva.
Ahora es una función puramente imperativa que emplea bucles para la busqueda de únicos categóricos.

En primera instancía, lo que hice fue buscar los únicos y almacenarlos en un `cell` de octave, es decir,
una tupla de Octave.

¡Que porras!, vamos a la definición matemática del problema.

Teniendo los vectores \\(\vec{x_1}, \vec{x_2}, \cdots, \vec{x_n}\\), estos los vuelvo a agrupar en una
matriz \\(X\\)

$$
    X = \begin{bmatrix} 
    \vec{x_1} & \vec{x_2} & \cdots & \vec{x_n}
    \end{bmatrix} \\, \vert \\, \vec{x_i} \in \R^{m} =
    \begin{bmatrix}
    x_i^{(1)} \\\
    x_i^{(2)} \\\
    \vdots \\\
    x_i^{(m)}
    \end{bmatrix}
    \\\
    X \in \R^{m\times n}
$$


Bueno, pues ahora también creamos una matriz mutlidimensional
\\(T \in \N^{\times_{i=1}^n length\(\vec{u_i}\)} \\), a continuación recorremos \\(X\\) por filas y 
a cada ocurrencia *<<siempre que no contenga un NaN en la fila>>* se incrementa por 1 en \\(T\\) el 
elemento localizado en la posición demarcada por el indice \\(i \vert X_{j,i} = u_k^{(i)} \\), esto 
se hace para cada i en cada dimensión.

El código de la implementación se muestra a continuación, quitando la parte de inicialización de variables
y todo eso.

```octave
for idx = 1:size (X, 1)
    if (!any (isnan (X(idx,:))))
      location = zeros (1,size (X, 2));
      for jdx = 1:size (X,2)
        location(jdx) = find (cell2mat (coordinates(jdx)) == X(idx, jdx));
      endfor
      t(num2cell (location){:}) += 1;
    endif
endfor
```

Finalmente se aplican unos estadísticos mediante la 
[prueba \\(\chi\\)](https://es.wikipedia.org/wiki/Prueba_%CF%87%C2%B2).

## Resultados finales
---
Al final la mejora que lancé cómo propuesta realizada en el repositorio oficial, no solo soluciona el bug
sino que también mejora con creces el rendimiento del algoritmo.
