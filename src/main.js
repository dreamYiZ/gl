import "./sass/app.scss";
import "./sass/app.css";
import {render} from "./components/render";
//
// start here
//

function main() {
  render()
}

// window.onload = main;
main()

function windowOnResize() {}
window.onresize = windowOnResize;



