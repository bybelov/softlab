import Tabs from './tabs';
import HeaderSticky from './header-sticky';
import SliderAwards from './slider-awards';
import SliderPhones from './slider-phones';
import Popup from './popup';
import Animation from './animation';
import FormClassStates from './form-states';
import CustomInputFile from './input-file';
import PolifillVh from './polifill-vh';

export default class Init{
  constructor(){
    new PolifillVh();
    new Animation();
    new Tabs();
    new Popup();
    new FormClassStates();
    new CustomInputFile('.file-input');
    new HeaderSticky();
    new SliderAwards('.js-awards');
    new SliderPhones('.js-phone-screens');
  }
}

