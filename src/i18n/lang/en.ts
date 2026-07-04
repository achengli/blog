import type { UIStrings } from "../types";

export default {
  nav: {
    home: "init",
    posts: "pubs",
    tags: "tags",
    about: "info",
    archives: "Archivados",
    search: "Buscar",
  },
  post: {
    publishedAt: "Publicado",
    updatedAt: "Actualizado",
    sharePostIntro: "Comparte esta publicación:",
    sharePostOn: "Comparte esta publicación en {{platform}}",
    sharePostViaEmail: "Compare el post vía e-mail",
    tagLabel: "Tags",
    backToTop: "Salir a superficie",
    goBack: "Atrás",
    editPage: "Editar publicación",
    previousPost: "Publicación anterior",
    nextPost: "Siguiente publicación",
  },
  pagination: {
    prev: "Anterior",
    next: "Siguiente",
    page: "Página",
  },
  home: {
    socialLinks: "Medios de comunicación",
    featured: "Interesante",
    recentPosts: "Publicaciones recientes",
    allPosts: "Todas las publicaciones",
  },
  footer: {
    copyright: "Copyright",
    allRightsReserved: "Todos los derechos reservados.",
  },
  pages: {
    tagTitle: "Tag",
    tagDesc: "Todos los articulos con el tag",

    tagsTitle: "Tags",
    tagsDesc: "Todos los tags existentes.",

    postsTitle: "Posts",
    postsDesc: "Todos los articulos publicados.",

    archivesTitle: "Archivados",
    archivesDesc: "Todos los articulos archivados.",

    searchTitle: "Buscar",
    searchDesc: "Buscar el artículo ...",
  },
  a11y: {
    skipToContent: "Ir al contenido",
    openMenu: "Abrir menu",
    closeMenu: "Cerrar menu",
    toggleTheme: "dia y noche",
    searchPlaceholder: "Buscar...",
    noResults: "Sin resultados",
    goToPreviousPage: "Pag anterior",
    goToNextPage: "Pag siguiente",
  },
  notFound: {
    title: "404 no existe",
    message: "Página no encontrada",
    goHome: "Ir al inicio",
  },
} satisfies UIStrings;
