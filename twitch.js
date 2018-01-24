function checkBox(input) {
  Array.from(document.getElementsByTagName('input')).forEach(cur => cur.checked = false);
  input.checked = true;
}

function requestChannelData(channel) {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      console.log(xhr.response);
    }
  }
  xhr.open("GET", `https://wind-bow.gomix.me/twitch-api/users/${channel}?origin=*`);
  xhr.send();
}

requestChannelData('freecodecamp');
