import Vue from "vue";
import ImaskDirective from "./vue-imask-directive";
import ClickOutsideDirective from "./click-outside-directive";
import LodazDirective from "./lozad-directive";

Vue.directive("imask", ImaskDirective);
Vue.directive("click-outside", ClickOutsideDirective);
Vue.directive("lozad", LodazDirective);
