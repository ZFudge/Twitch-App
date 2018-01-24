function checkBox(input) {
  Array.from(document.getElementsByTagName('input')).forEach(cur => cur.checked = false);
  input.checked = true;
}

const twitch = {
  list: document.getElementById('list'),
  users: ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"],
  requestTwitchData: function(path,streamer,fn) {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        const response = JSON.parse(xhr.response);
        fn(response);
      }
    }
    xhr.open("GET", `https://wind-bow.glitch.me/twitch-api/${path}/${streamer}`);
    xhr.send();
  },
  handleStreams: function(response, path, status) {
    const li = document.createElement('li');

    const img = document.createElement('img');
    img.src = path.logo;

    const nameSpan = document.createElement('span');

    const a = document.createElement('a');
    a.href = path.url;
    a.innerHTML = path.display_name;
    a.target = '_blank';
    nameSpan.appendChild(a);

    const statusSpan = document.createElement('span');
    const p = document.createElement('p');
    p.innerHTML = status;
    statusSpan.appendChild(p);

    li.appendChild(img);
    li.appendChild(nameSpan);
    li.appendChild(statusSpan);
    twitch.list.appendChild(li);
    li.style.opacity = 1;
  }
};

twitch.users.forEach(function(cur) {
  twitch.requestTwitchData('streams', cur, function(firstResponse) {
    (firstResponse.stream === null) ? twitch.requestTwitchData('channels', cur, function(secondResponse) {
      twitch.handleStreams(secondResponse, secondResponse, "Offline");
    }) : twitch.handleStreams(firstResponse, firstResponse.stream.channel, `${firstResponse.stream.channel.game}\: ${firstResponse.stream.channel.status}`);
  });
});
