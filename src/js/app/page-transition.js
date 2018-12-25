import Barba from 'barba.js';
import $ from 'jquery';
import Init from './init';
import anime from 'animejs';

$(document).ready(function () {


  Barba.Pjax.init();
  Barba.Prefetch.init();

  var lastClicked;

  Barba.Dispatcher.on('linkClicked', function (el) {
    lastClicked = el;
  });

  Barba.Dispatcher.on('newPageReady', function(currentStatus, oldStatus, container) {
    new Init();
  });

  // EXPAND
  var ExpandTransition = Barba.BaseTransition.extend({
    start: function () {
      Promise.all([this.newContainerLoading, this.zoom()]).then(
        this.showNewPage.bind(this)
      );
    },

    zoom: function () {
      var deferred = Barba.Utils.deferred();

      // получаем элемент по которому кликнули
      console.log(lastClicked);

      anime({
        targets: '.page',
        opacity: [1, 0],
        delay: 250,
        duration: 1000,
        easing: 'easeInOutQuart',
        autoplay: true,
        begin: function() {
          console.log('start');
        },
        complete: function() {
          deferred.resolve();
        }
      });

      return deferred.promise;
    },

    showNewPage: function () {

      anime({
        targets: '.page',
        opacity: [0, 1],
        delay: 250,
        duration: 1000,
        easing: 'easeInOutQuart',
        autoplay: true,
        begin: function() {
          console.log('start2');
        },
        complete: function() {
          
          
        }
      });

      this.done();

    }
  });

  // BACK
  var BackTransition = Barba.BaseTransition.extend({
    start: function () {
      Promise.all([this.newContainerLoading, this.zoom()]).then(
        this.showNewPage.bind(this)
      );
    },

    zoom: function () {
      var deferred = Barba.Utils.deferred();

      deferred.resolve();

      return deferred.promise;
    },

    showNewPage: function () {
      var $el = $(this.newContainer);
      $(this.oldContainer).hide();
      $el.css({
        visibility : 'visible',
      });
      this.done();
    }
  });

  Barba.Pjax.getTransition = function () {
    var transitionObj = ExpandTransition;

    if (Barba.HistoryManager.prevStatus().namespace === 'Single') {
      transitionObj = BackTransition;
    }
    return transitionObj;
  };


});