function checkBox(input) {
  Array.from(document.getElementsByTagName('input')).forEach(cur => cur.checked = false);
  input.checked = true;
}
