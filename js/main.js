document.addEventListener("DOMContentLoaded", () => {
  /* VARIABLES */
  const fragment = document.createDocumentFragment();
  const cajaBotones = document.querySelector(".botones");
  const textoTags = document.querySelector(".textoTags");
  const imagenGrande = document.querySelector(".imagenGrande > img");
  let tituloImagenGrande = "";
  const imgRelacionadas = document.querySelector(".imgRelacionadas");
  const urlBase = "assets/viajes";
  const arrFotos = [
    {
      id: 1,
      src: `${urlBase}/viajes-1.jpg`,
      alt: "Playa",
      titulo: "Viaje 1",
      tags: ["Mar", "Arena", "Cielo", "Palmera"],
    },
    {
      id: 2,
      src: `${urlBase}/viajes-2.jpg`,
      alt: "Cabaña en el mar",
      titulo: "Viaje 2",
      tags: ["Mar", "Cielo", "Puente"],
    },
    {
      id: 3,
      src: `${urlBase}/viajes-3.jpg`,
      alt: "Señales",
      titulo: "Viaje 3",
      tags: ["Cielo", "Señales"],
    },
    {
      id: 4,
      src: `${urlBase}/viajes-4.jpg`,
      alt: "Edificio",
      titulo: "Viaje 4",
      tags: ["Edificio"],
    },
    {
      id: 5,
      src: `${urlBase}/viajes-5.jpg`,
      alt: "Puente",
      titulo: "Viaje 5",
      tags: ["Edificio", "Puente"],
    },
    {
      id: 6,
      src: `${urlBase}/viajes-6.jpg`,
      alt: "Carretera y mar",
      titulo: "Viaje 6",
      tags: ["Montaña", "Mar"],
    },
    {
      id: 7,
      src: `${urlBase}/viajes-7.jpg`,
      alt: "Montaña",
      titulo: "Viaje 7",
      tags: ["Montaña", "Edificio"],
    },
  ];
  const arrBtn = obtenerTags();

  /* FUNCIONES */

  /**
   * Pinta los botones de los tags disponibles
   */
  const pintarBotones = () => {
    arrBtn.forEach((e) => {
      const boton = document.createElement("BUTTON");
      boton.classList.add("btn");
      boton.textContent = e;
      fragment.append(boton);
    });

    cajaBotones.append(fragment);
  };

  /**
   * Obtiene los tags disponibles en las fotos
   * @returns {Array} Array con los tags disponibles
   */
  function obtenerTags() {
    const arr = [];

    arrFotos.forEach((e) => {
      e.tags.forEach((tag) => {
        if (!arr.includes(tag)) arr.push(tag);
      });
    });

    return arr;
  }

  /* EVENTOS */
  cajaBotones.addEventListener("click", (event) => {
    if (event.target.matches("button")) {
      const arrFotosFiltradas = arrFotos.filter((e) =>
        e.tags.includes(event.target.textContent)
      );

      const num = arrFotosFiltradas.length;
      textoTags.innerHTML =
        num > 1
          ? `Se han encontrado <span class="bold">${num}</span> imagenes con el tag <span class="bold">${event.target.textContent}</span>`
          : `Se ha encontrado <span class="bold">${num}</span> imagen con el tag <span class="bold">${event.target.textContent}</span>`;

      imgRelacionadas.innerHTML = "";

      arrFotosFiltradas.forEach((e, index) => {
        if (index === 0) {
          imagenGrande.src = e.src;
          imagenGrande.alt = e.alt;
          tituloImagenGrande = e.titulo;
        } else {
          const articulo = document.createElement("ARTICLE");
          const tituloViaje = document.createElement("P");
          tituloViaje.textContent = e.titulo;
          articulo.append(tituloViaje);
          const divImgRelacionada = document.createElement("DIV");
          divImgRelacionada.classList.add("imgContainer");
          const imgRel = document.createElement("IMG");
          imgRel.src = e.src;
          imgRel.alt = e.alt;
          divImgRelacionada.append(imgRel);
          articulo.append(divImgRelacionada);
          fragment.append(articulo);
        }
      });

      imgRelacionadas.append(fragment);
    }
  });

  imgRelacionadas.addEventListener("click", (event) => {
    const articuloClicado = event.target.closest("article");

    const tituloPeq = articuloClicado.querySelector("p");
    const imagenPeq = articuloClicado.querySelector("img");

    const auxSrcGrande = imagenGrande.src;
    const auxAltGrande = imagenGrande.alt;
    const auxTituloPeq = tituloPeq.textContent;

    imagenGrande.src = imagenPeq.src;
    imagenGrande.alt = imagenPeq.alt;

    imagenPeq.src = auxSrcGrande;
    imagenPeq.alt = auxAltGrande;
    tituloPeq.textContent = tituloImagenGrande;
    tituloImagenGrande = auxTituloPeq;
  });

  /* INVOCACIÓN */
  pintarBotones();
});
