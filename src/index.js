"use strict";

import "./css/styles.css";
import { refs } from "./services/refs.js";
import fetch from "./components/apiService.js";
import galleryItem from "./templates/galleryItem.hbs";
import * as basicLightbox from "basiclightbox";
import "../node_modules/basiclightbox/dist/basicLightbox.min.css";
import PNotify from "../node_modules/pnotify/dist/es/PNotify.js";
import "../node_modules/pnotify/dist/PNotifyBrightTheme.css";

const modal = {
  isOpen: false
};

refs.form.addEventListener("submit", event => {
  event.preventDefault();

  const form = event.currentTarget;
  const input = form.elements.query;

  if (input.value === "") {
    return;
  }

  refs.gallery.innerHTML = "";
  fetch.resetPage();
  fetch.searchQuery = input.value;
  fetch.fetchImages().then(hits => {
    if (hits.length === 0) {
      PNotify.error("Try again!");
    } else refs.gallery.insertAdjacentHTML("beforeend", galleryItem(hits));
    input.value = "";
  });
});

refs.button.addEventListener("click", () => {
  fetch.fetchImages().then(hits => {
    refs.gallery.insertAdjacentHTML("beforeend", galleryItem(hits));
    fetch.scrollPage();
  });
});

refs.body.addEventListener("click", event => {
  const instance = basicLightbox.create(
    `<div class="modal"><img class="modal-img" src="${event.target.dataset.sourse}" height="540" width="990" /></div>`
  );
  if (event.target.nodeName == "IMG" && modal.isOpen === false) {
    modal.isOpen = true;
    instance.show();
  }
  if (event.target.nodeName !== "IMG") {
    instance.close();
    modal.isOpen = false;
  }
});
