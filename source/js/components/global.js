import {toggleCustomClass, addCustomClass} from '../functions/customFunctions';

const navBox = document.querySelector('.nav-box');

if(navBox){

    const btn = navBox.querySelector('.nav-box__btn');
    const wrapp = navBox.querySelector('.nav-box__wrapp');
    const arrow = navBox.querySelector('.nav-box__arrow');
    const links = navBox.querySelectorAll('.nav-box__link');

    btn && btn.addEventListener('click', function(e){
        e.preventDefault();
        toggleCustomClass(wrapp, 'active');
        toggleCustomClass(arrow, 'active');
    })

    links.forEach(function(link){
        link.addEventListener('click', function(e){
            toggleCustomClass(wrapp, 'active');
            toggleCustomClass(arrow, 'active');
        })
    })
}