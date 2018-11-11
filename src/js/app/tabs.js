import {TweenMax, EasePack } from "gsap/TweenMax";
import $ from 'jquery';

function tabs() {
  let myTabs = document.querySelectorAll(".tabs-nav > li");

  function myTabClicks(tabClickEvent) {

    for (let i = 0; i < myTabs.length; i++) {
      myTabs[i].classList.remove("active");
    }
    
    let clickedTab = tabClickEvent.currentTarget;
    clickedTab.classList.add("active");
    tabClickEvent.preventDefault();
    let myContentPanes = document.querySelectorAll(".tab-pane");
    for (let i = 0; i < myContentPanes.length; i++) {
      myContentPanes[i].classList.remove("active");
    }
    let anchorReference = tabClickEvent.target;
    let activePaneId = anchorReference.getAttribute("href");
    let activePane = document.querySelector(activePaneId);
    activePane.classList.add("active");
  }
  for (let i = 0; i < myTabs.length; i++) {
    myTabs[i].addEventListener("click", myTabClicks)
  }
}

module.exports = tabs;