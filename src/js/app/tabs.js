export default class Tabs{
  constructor(){
    this.myTabEvent();
  }

  myTabClicks(e){

    let myTabs = document.querySelectorAll(".tabs-nav > li");

    for (let i = 0; i < myTabs.length; i++) {
      myTabs[i].classList.remove("active");
    }
    
    let clickedTab = e.currentTarget;
        clickedTab.classList.add("active");

    e.preventDefault();

    let myContentPanes = document.querySelectorAll(".tab-pane");
    for (let i = 0; i < myContentPanes.length; i++) {
      myContentPanes[i].classList.remove("active");
    }
    let anchorReference = e.target;
    let activePaneId = anchorReference.getAttribute("href");
    let activePane = document.querySelector(activePaneId);
        activePane.classList.add("active");
  }

  myTabEvent(){
    let myTabs = document.querySelectorAll(".tabs-nav > li");
    for (let i = 0; i < myTabs.length; i++) {
      myTabs[i].addEventListener("click", this.myTabClicks)
    }
  }

}