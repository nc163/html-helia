import defineCustomElements from './defineCustomElements';
import HTMLIPFSConfigElement from './HTMLIPFSConfigElement';
import HTMLIPFSElement from './HTMLIPFSElement';
import {
  HTMLIPFSImageElement
} from './HTMLIPFSElements';

defineCustomElements();

export { HTMLIPFSConfigElement, HTMLIPFSElement };
export { HTMLIPFSImageElement };

import { Controller } from "stimulus"

export default class extends Controller {
  static targets = [ "name", "output" ]

  greet() {
    this.outputTarget.textContent =
      `Hello, ${this.nameTarget.value}!`
  }
}