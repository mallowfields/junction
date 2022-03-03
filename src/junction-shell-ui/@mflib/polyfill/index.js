function loadTypes() {
  if (window.BigInt == null) {
    window.BigInt = window.Number;
  }
}

loadTypes();