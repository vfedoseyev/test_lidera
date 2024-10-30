
window.onload = function () {
    crear_select();
};

function isMobileDevice() {
    return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
}

function crear_select() {
    const div_cont_select = document.querySelectorAll("[data-mate-select='active']");

    div_cont_select.forEach((container, e) => {
        container.setAttribute('data-indx-select', e);
        container.setAttribute('data-selec-open', 'false');

        const select_ = container.querySelector("select");
        const ul_cont = container.querySelector(".cont_select_int");

        if (isMobileDevice()) {
            select_.addEventListener('change', function () {
                _select_option(select_.selectedIndex, e);
            });
        }

        const select_options = select_.options;

        container.querySelector(".selecionado_opcion").setAttribute('data-n-select', e);
        container.querySelector(".icon_select_mate").setAttribute('data-n-select', e);

        Array.from(select_options).forEach((option, i) => {
            const li = document.createElement('li');
            li.setAttribute('data-index', i);
            li.setAttribute('data-selec-index', e);
            li.innerHTML = option.innerHTML;

            if (option.selected) {
                li.classList.add('active');
                container.querySelector(".selecionado_opcion").innerHTML = option.innerHTML;
            }

            li.addEventListener('click', function () {
                _select_option(this.getAttribute('data-index'), this.getAttribute('data-selec-index'));
            });

            ul_cont.appendChild(li);
        });

        // Привязываем обработчик клика к .selecionado_opcion и .icon_select_mate
        container.querySelector(".selecionado_opcion").addEventListener('click', function () {
            open_select(this);
        });
        container.querySelector(".icon_select_mate").addEventListener('click', function () {
            open_select(this);
        });
    });
}

function open_select(idx) {
    const idx1 = idx.getAttribute('data-n-select');
    const container = document.querySelector("[data-indx-select='" + idx1 + "']");
    const ul_cont_li = container.querySelectorAll(".cont_select_int > li");

    let hg = 0;
    const slect_open = container.getAttribute('data-selec-open');

    if (isMobileDevice()) {
        const select_element_open = container.querySelector("select");
        select_element_open.click();
    } else {
        ul_cont_li.forEach(li => {
            hg += li.offsetHeight;
        });

        if (slect_open === 'false') {
            container.setAttribute('data-selec-open', 'true');
            container.querySelector('.cont_list_select_mate > ul').style.height = hg + "px";
            container.querySelector('.icon_select_mate').style.transform = 'rotate(180deg)';
        } else {
            container.setAttribute('data-selec-open', 'false');
            container.querySelector('.icon_select_mate').style.transform = 'rotate(0deg)';
            container.querySelector('.cont_list_select_mate > ul').style.height = "0px";
        }
    }
}

function salir_select(indx) {
    const selectContainer = document.querySelector("[data-indx-select='" + indx + "']");
    selectContainer.querySelector('.cont_list_select_mate > ul').style.height = "0px";
    selectContainer.querySelector('.icon_select_mate').style.transform = 'rotate(0deg)';
    selectContainer.setAttribute('data-selec-open', 'false');
}

function _select_option(indx, selc) {
    const select_ = document.querySelector("[data-indx-select='" + selc + "'] > select");
    const li_s = document.querySelectorAll("[data-indx-select='" + selc + "'] .cont_select_int > li");
    const selectedOption = document.querySelector("[data-indx-select='" + selc + "'] > .selecionado_opcion");
    const selectOptions = select_.options;

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


