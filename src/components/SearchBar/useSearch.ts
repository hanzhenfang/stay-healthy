import SearchBarMaker from "./SearchBar";

const searchBar = new SearchBarMaker();

function openSearchBar() {
  searchBar.present();
}

function closeSearchBar() {
  searchBar.dismiss();
}

export default {
  openSearchBar,
  closeSearchBar,
};
