function checkBox(input) {
  Array.from(document.getElementsByTagName('input')).forEach(cur => cur.checked = false);
  input.checked = true;
}

const twitch = {
  list: document.getElementById('list'),
  users: ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"],
  responses: []
};

function requestTwitchData(path,streamer,fn) {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      const response = JSON.parse(xhr.response);
      fn(response);
    }
  }
  xhr.open("GET", `https://wind-bow.glitch.me/twitch-api/${path}/${streamer}`);
  xhr.send();
}

twitch.users.forEach(function(cur) {
  requestTwitchData('streams', cur, function(firstResponse) {
    (firstResponse.stream === null) ? requestTwitchData('channels', cur, function(secondResponse) {
      handleStreams(secondResponse, secondResponse.logo, secondResponse.display_name, "Offline");
    }) : handleStreams(firstResponse, firstResponse.stream.channel.logo, firstResponse.stream.channel.display_name, `${firstResponse.stream.channel.game}\: ${firstResponse.stream.channel.status}`);
  });
});

function handleStreams(response, picture, name, status) {
  twitch.responses.push(response);
  const li = document.createElement('li');

  const img = document.createElement('img');
  img.src = picture;

  const nameSpan = document.createElement('span');
  const a = document.createElement('a');
  a.href = response.url;
  a.innerHTML = name;
  a.target = '_blank';
  nameSpan.appendChild(a);

  const statusSpan = document.createElement('span');
  statusSpan.innerHTML = status;

  li.appendChild(img);
  li.appendChild(nameSpan);
  li.appendChild(statusSpan);
  twitch.list.appendChild(li);
  li.style.opacity = 1;
}
