import Tabs from './tabs';
import Slider from './slider';
import HeaderSticky from './header-sticky';
import SliderAwards from './slider-awards';
import SliderPhones from './slider-phones';
import Popup from './popup';
import Animation from './animation';
import FormClassStates from './form-states';
import CustomInputFile from './input-file';
import Preloader from './preloader';
import PolifillVh from './polifill-vh';
// import Metaballs from './metaballs-new.js';

export default class Init{
  constructor(){
    // new Metaballs('container');
    new PolifillVh();
    new Animation();
    new Preloader();
    new Tabs();
    new Popup();
    new FormClassStates();
    new CustomInputFile('.file-input');
    new HeaderSticky();
    new Slider('.js-slider');
    new SliderAwards('.js-awards');
    new SliderPhones('.js-phone-screens');
  }
}

