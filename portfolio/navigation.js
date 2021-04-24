let html_naw_section = document.getElementById("nawiagacja");
const html_firstSection = document.getElementsByTagName('section')[0]

const createLi = (href, aText) => {
  const li = document.createElement("li");
  li.className = "naw__item";

  const a = document.createElement("a");
  a.className = "naw__link";
  a.href = href;
  a.innerHTML = aText;
  li.appendChild(a);

  return li;
};

const createJSNav = () => {
  // remove html navigation
  html_naw_section.innerHTML = "";
  html_naw_section.remove();

  // create js navigation
  const naw_section = document.createElement("section");
  naw_section.id = "nawiagacja";

  const naw_check = document.createElement("input");
  naw_check.type = "checkbox";
  naw_check.className = "naw__checkbox";
  naw_check.id = "naw_check";
  naw_section.appendChild(naw_check);

  const naw_label = document.createElement("label");
  naw_label.for = "naw_check";
  naw_label.className = "naw__btn";
  naw_label.id = "navi__btn";
  naw_section.appendChild(naw_label);

  const label_span = document.createElement("span");
  label_span.className = "naw__icon";
  label_span.innerHTML = "&nbsp;";
  naw_label.appendChild(label_span);

  const back_div = document.createElement("div");
  back_div.className = "naw__background";
  back_div.innerHTML = "&nbsp;";
  naw_section.appendChild(back_div);

  const naw_nav = document.createElement("nav");
  naw_nav.className = "naw";
  naw_section.appendChild(naw_nav);

  const naw_ul = document.createElement("ul");
  naw_ul.className = "naw__lista";
  naw_nav.appendChild(naw_ul);

  naw_ul.appendChild(createLi("index.html", "Strona główna"));
  naw_ul.appendChild(createLi("hobbies.html", "Zainteresowania"));
  naw_ul.appendChild(createLi("projects.html", "Projekty"));

  naw_label.addEventListener("click", (event) => {
    event.stopPropagation();
    event.preventDefault();
    naw_check.checked = !naw_check.checked;
  });

  document.body.appendChild(naw_section);
};

createJSNav();
