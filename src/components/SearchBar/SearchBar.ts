import { h, render } from "vue";
import SearchBar from "./SearchBar.vue";

class SearchBarCreator {
  container: HTMLElement;
  showing: boolean;
  _dismiss: () => void;
  constructor() {
    this.container = document.createElement("div");
    this.showing = false;
    this.present.bind(this);
    this.dismiss.bind(this);
    this._dismiss = this.dismiss.bind(this);
  }

  present() {
    if (this.showing) {
      this.dismiss();
    } else {
      const searchBar = h(h(SearchBar));
      render(searchBar, this.container);
      const searchBarWrapperDOM =
        this.container.querySelector("#searchBarWrapper");
      searchBarWrapperDOM?.classList.add("searchInput");
      document.body.insertBefore(this.container, document.body.firstChild);
      this.showing = true;
    }
  }

  dismiss() {
    if (this.showing && this.container) {
      render(null, this.container);
      document.body.removeChild(this.container);
      this.showing = false;
    } else {
      console.log("不需要关闭");
    }
  }
}

export default SearchBarCreator;
