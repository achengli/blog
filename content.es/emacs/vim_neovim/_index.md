---
title: De Vim a Neovim y de vuelta a Vim
---
# Mi trayecto con Vim y Neovim

![Vim logo](static/vimlogo.svg)


## Mis comienzos con Vim
---
Comencé a usar [**Vim**](https://www.vim.org/) hace cerca de 6 años. Vim es un editor bastante 
accesible y por aquel entonces usaba uan variedad grande de sistemas operativos, todos bajo
la filosofía de diseño **POSIX** *(Unix like)*, esto hizo que buscase un editor de texto que
estuviese disponible y también porque se ve hacker usar Vim jajaja.

Vim es muy práctico pero requiere de tu tiempo aprenderlo, creo que no tanto cómo muchos 
imaginan y además conforme lo vas usando y necesitando nuevas cosas, aprenderás más cosas
en profundidad del editor; incluye un sistema de ayuda muy práctico que se invoca con el
comando `:help`, este comando seguido del nombre del comando o función de vimcript te aporta
información detallada de su uso.

Vim es muy personalizable y además, todo se construye sobre un lenguaje **DSL** 
*<<Domain Specific Language>>* llamado Vimscript, odiado y amado a partes iguales por muchos;
esto lo hace muy atractivo para poder crear tus propias herramientas sobre el editor y lo
que es mejor aun, es posible instalar plugins hechos por la comunidad con utilidades muy 
prácticas. Otra cosa que hace atractivo a Vim es su accesibilidad, pudiéndose usar en la 
línea de comandos directamente aunque también posee una variante llamada **GVim** que posee
una interfaz gráfica.

## De Vim a Neovim
---
En Vim me sentía muy bien, es muy práctico y mi entorno estaba bien desarrollado para el
editor. De un dia a otro me cambié a Neovim viendo que se podía configurar en Lua y que 
su rendimiento era mejor que Vim. Ya me manejaba en Lua así que la transición no fue dificil
y estuve usando Neovim 2 años.

Neovim es tan práctico cómo Vim pero con una mejor eficiencia *(Al menos hasta Vim 9)*, ahora
posee una comunidad inmensa, mayor aun que la de Vim y además también incluye su propio 
cliente LSP.

## De vuelta a Vim
---
Recientemente, tras la publicación de Vim 9, he decidido volver a usar Vim, migrando toda 
mi configuración de Neovim a Vim por varias razones:

1. Vim quieras que no, es más accesible que Neovim y no por el editor en sí, sino porque 
muchos paquetes de Neovim dependen de Luarocks, un gestor de paquetes de Lua que necesita 
importantes mejoras.

2. Vim 9 ahora es prácticamente igual de eficiente que Neovim, sobre todo teniendo en 
cuenta que ahora aparece con una nueva versión de Vimscript llamado Vim9script que mejora
sustancialmente las carencias del DSL que era antes vimscript *(Aunque aun me queda migrar
mi configuración a Vim9script)*.

3. Vimscript se integra mejor al editor que Lua, simplemente porque Neovim no hizo que 
Vim estuviese construido sobre Lua, sino que acopló el lenguaje con una API, esto lo hace 
algo incómodo al hacer tus configuraciones o utilidades en Neovim.


