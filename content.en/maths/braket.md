---
title: Dirac Notation and Its Application in Quantum Mechanics
---

# Dirac Notation and Its Application in Quantum Mechanics
---

## Dirac Notation
---
Dirac devised a simplified way to express N-dimensional Hilbert spaces.  
This notation is also known as **bra-ket** notation, and I’ll explain a bit about how it’s applied to quantum mechanics.

## About Bra-Kets
---
A Hilbert space is a probability space applied to a dimensional space.

Let’s define a Hilbert space as the position probability equation of a particle  
*"mathematically seen as a singularity or point"* \\( \Psi(\vec{x}) \\)

A **bra-ket** is an expression from the so-called Dirac notation. It is used in quantum mechanics  
to simplify integrals of the form:

{{< katex display=true >}}
\int_{-\infty}^{\infty} \psi (\vec{x}) \Phi^{*}(\vec{x})\,d\vec{x}
{{< /katex >}}

This expression is simplified as:

{{< katex display=true >}}
\langle \psi \vert \Phi \rangle = \int^{\infty}_{-\infty} \psi (\vec{x}) \Phi^{*}(\vec{x})\,d\vec{x}
{{< /katex >}}

- The **bra** \\( \langle\psi \vert \\) is the expected value function,  
which is the probability density function, the wave function, and the applied function,  
\\( f(x) = 1 \\). In quantum mechanics, the wave function represents the probability of a particle being in a given position.

- The **ket** \\( \vert\Phi\rangle \\) is something similar, except that in this case  
it is the complex conjugate of the bra. Later, in the discrete case, it will be seen as a column vector  
instead of a row vector.

## Discrete Brakets
---
For application in quantum mechanics, we adopt specific spins, which represent the positions  
that will later be understood as elements of a vector.

A bra is defined by the probability of a particle being in a position \\(\vec{x_0}\\),  
which we will simplify to a single dimension in this case.

{{< katex display=true >}}
\langle\Psi(x_0)\vert = \int^{\infty}_{-\infty}\Psi(\vec{x_0})\,d\vec{x} = \Psi(\vec{x_0})
{{< /katex >}}

In multiple dimensions, the bra as a discrete vector in Hilbert space looks like:

{{< katex display=true >}}
\langle\Psi\vert = \{\alpha_0, \alpha_1, \alpha_2, \dots , \alpha_n\}
{{< /katex >}}

The ket is the complex conjugate of the bra and is expressed as a column vector:

{{< katex display=true >}}
\vert\Psi\rangle = \begin{bmatrix}
\alpha_0^{*} \\
\alpha_1^{*} \\
\alpha_2^{*} \\
\vdots \\
\alpha_n^{*} \\
\end{bmatrix}
{{< /katex >}}

The result of multiplying both as vectors gives a numeric value that represents  
the probability of the event \\(\sigma\\).

{{< katex display=true >}}
\langle\Psi\vert\Psi\rangle = \{a_0, a_1, a_2, \dots, a_n\}\cdot\begin{bmatrix}
\alpha_0^{*} \\
\alpha_1^{*} \\
\alpha_2^{*} \\
\vdots \\
\alpha_n^{*} \\
\end{bmatrix} = \sigma

{{< /katex >}}

## Operations and Properties
---
Brakets are operated on vectorially, and we need to take into account certain  
inherent notation peculiarities, such as the vector product of a ket and a bra,  
known as the tensor product. The result is a vector of dimension \\(n\times m\\), where *n* is the dimension of the ket,  
and *m* is the dimension of the bra.

The result is a new Hilbert space, which now has more combinations due to quantum entanglement.  
This leads to a wide range of new possible spaces when combining quantum states,  
and with it, a new way of doing computation.

Now we encounter operators, which are essentially matrices that project the vector from the Hilbert space  
onto the same or a different Hilbert space.

Among the existing operators, we are particularly interested in those that are Hermitian,  
meaning that when applied to a ket, they return the same ket multiplied by a real scalar \\( \lambda \\).

$$
H\vert\Psi\rangle = \lambda\vert\Psi\rangle
$$

An example is the operator \\(H = \begin{bmatrix}1 & 0 \\\ 0 & -1 \end{bmatrix} \\),  
which, when applied to the ket \\(\vert x\rangle = \begin{bmatrix}1 \\\ 0\end{bmatrix}\\),  
results in \\(\begin{bmatrix}1 \\\ 0\end{bmatrix}\\), which is \\(\lambda\vert x\rangle\\) with \\(\lambda = 1\\)

## in progress ...
