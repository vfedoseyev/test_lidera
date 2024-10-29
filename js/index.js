window.onload = function () {
    crear_select();
}

function isMobileDevice() {
    return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
}

var li = [];
function crear_select() {
    var div_cont_select = document.querySelectorAll("[data-mate-select='active']");
    for (let e = 0; e < div_cont_select.length; e++) {
        div_cont_select[e].setAttribute('data-indx-select', e);
        div_cont_select[e].setAttribute('data-selec-open', 'false');
        const ul_cont = document.querySelectorAll("[data-indx-select='" + e + "'] > .cont_list_select_mate > ul");
        const select_ = document.querySelectorAll("[data-indx-select='" + e + "'] > select")[0];
        
        if (isMobileDevice()) {
            select_.addEventListener('change', function () {
                _select_option(select_.selectedIndex, e);
            });
        }

        const select_optiones = select_.options;
        document.querySelectorAll("[data-indx-select='" + e + "']  > .selecionado_opcion ")[0].setAttribute('data-n-select', e);
        document.querySelectorAll("[data-indx-select='" + e + "']  > .icon_select_mate ")[0].setAttribute('data-n-select', e);

        for (let i = 0; i < select_optiones.length; i++) {
            li[i] = document.createElement('li');
            if (select_optiones[i].selected) {
                li[i].className = 'active';
                document.querySelector("[data-indx-select='" + e + "']  > .selecionado_opcion ").innerHTML = select_optiones[i].innerHTML;
            }
            li[i].setAttribute('data-index', i);
            li[i].setAttribute('data-selec-index', e);
            li[i].addEventListener('click', function () { 
                _select_option(this.getAttribute('data-index'), this.getAttribute('data-selec-index')); 
            });
            li[i].innerHTML = select_optiones[i].innerHTML;
            ul_cont[0].appendChild(li[i]);
        }
    }
}

function open_select(idx) {
    const idx1 = idx.getAttribute('data-n-select');
    const ul_cont_li = document.querySelectorAll("[data-indx-select='" + idx1 + "'] .cont_select_int > li");
    let hg = 0;
    const slect_open = document.querySelectorAll("[data-indx-select='" + idx1 + "']")[0].getAttribute('data-selec-open');
    const slect_element_open = document.querySelectorAll("[data-indx-select='" + idx1 + "'] select")[0];

    if (isMobileDevice()) {
        slect_element_open.click();
    } else {
        for (let i = 0; i < ul_cont_li.length; i++) {
            hg += ul_cont_li[i].offsetHeight;
        }
        const selectContainer = document.querySelectorAll("[data-indx-select='" + idx1 + "']")[0];
        if (slect_open == 'false') {
            selectContainer.setAttribute('data-selec-open', 'true');
            selectContainer.querySelector('.cont_list_select_mate > ul').style.height = hg + "px";
            selectContainer.querySelector('.icon_select_mate').style.transform = 'rotate(180deg)';
        } else {
            selectContainer.setAttribute('data-selec-open', 'false');
            selectContainer.querySelector('.icon_select_mate').style.transform = 'rotate(0deg)';
            selectContainer.querySelector('.cont_list_select_mate > ul').style.height = "0px";
        }
    }
}

function salir_select(indx) {
    const selectContainer = document.querySelectorAll("[data-indx-select='" + indx + "']")[0];
    selectContainer.querySelector('.cont_list_select_mate > ul').style.height = "0px";
    selectContainer.querySelector('.icon_select_mate').style.transform = 'rotate(0deg)';
    selectContainer.setAttribute('data-selec-open', 'false');
}

function _select_option(indx, selc) {
    if (isMobileDevice()) selc -= 1;

    const select_ = document.querySelectorAll("[data-indx-select='" + selc + "'] > select")[0];
    const li_s = document.querySelectorAll("[data-indx-select='" + selc + "'] .cont_select_int > li");
    const selectedOption = document.querySelectorAll("[data-indx-select='" + selc + "'] > .selecionado_opcion")[0];
    const selectOptions = document.querySelectorAll("[data-indx-select='" + selc + "'] > select > option");

    selectedOption.innerHTML = li_s[indx].innerHTML;

    li_s.forEach(li => li.classList.remove('active'));
    li_s[indx].classList.add('active');

    selectOptions[indx].selected = true;
    select_.selectedIndex = indx;
    select_.dispatchEvent(new Event('change'));
    salir_select(selc);
}

document.addEventListener("DOMContentLoaded", () => {
    const burgerButton = document.querySelector(".btn-nav_static");
    const navMenu = document.querySelector(".nav");
    const navLinks = document.querySelectorAll(".nav--tab");
    const languageSelect = document.querySelector(".language-select");

    const toggleMenu = () => {
        burgerButton.classList.toggle("btn-nav_close");
        navMenu.classList.toggle("nav_active");

        if (navMenu.classList.contains("nav_active")) {
            document.body.style.overflow = "hidden";
            if (languageSelect) {
                languageSelect.style.pointerEvents = "none"; // Блокируем селект
            }
        } else {
            document.body.style.overflow = "auto";
            if (languageSelect) {
                languageSelect.style.pointerEvents = "auto"; // Разблокируем селект
            }
        }
    };

    burgerButton.addEventListener("click", toggleMenu);

    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            burgerButton.classList.remove("btn-nav_close");
            navMenu.classList.remove("nav_active");
            document.body.style.overflow = "auto";
            if (languageSelect) languageSelect.style.pointerEvents = "auto";
        });
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const portalTab = document.querySelector(".nav--tab"); // Кнопка "О портале"
    const selectList = document.querySelector(".new-select__list"); // Список с элементами
    const navList = document.querySelector(".nav--list"); // Список навигации
  
    // Обработчик события нажатия на кнопку "О портале"
    portalTab.addEventListener("click", (event) => {
      event.stopPropagation(); // Остановка всплытия события
      selectList.classList.toggle("slideUp"); // Переключение класса для показа/скрытия
      selectList.classList.toggle("slideDown"); // Переключение класса для показа/скрытия
    });
  
    // Обработчик события нажатия вне списка
    document.addEventListener("click", (event) => {
      if (!selectList.contains(event.target) && !portalTab.contains(event.target)) {
        selectList.classList.add("slideUp"); // Скрыть список
        selectList.classList.remove("slideDown"); // Удалить класс для показа
      }
    });
  });
  

