function checkBox(input) {
  if (input.dataset.tab !== twitch.show ) {
    Array.from(document.getElementsByTagName('input')).forEach(cur => cur.checked = false);
    setList(input.dataset.tab);
    twitch.show = input.dataset.tab;
  };
  input.checked = true;
}

function setList(val) {
  if (val === 'all') {
    twitch.list.online = twitch.list.offline = 'grid';
  } else if (val === 'online') {
    twitch.list.online = 'grid';
    twitch.list.offline = 'none';
  } else if (val === 'offline') {
    twitch.list.offline = 'grid';
    twitch.list.online = 'none';
  } else {
    twitch.list.offline = twitch.list.online = 'none';
  }
}

function search(text) {
  (text.replace(/ /ig, '') === '') ? setList(twitch.show) : (
      setList(text),
      twitch.list.children.forEach((cur) => (cur.children[1].innerText.toLowerCase().includes(text)) ? cur.style.display = 'grid' : null)
    )
}

const twitch = {
  show: 'all',
  list: {
    body: document.getElementById('list'),
    children: [],
    set online(setting) {
      this.children.filter(cur=>cur.hasAttribute('class')).forEach(cur=>cur.style.display=setting);
    },
    set offline(setting) {
      this.children.filter(cur=>!cur.hasAttribute('class')).forEach(cur=>cur.style.display=setting);
    }
  },
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
    if (status != "Offline") li.setAttribute('class', 'online');

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
    twitch.list.body.appendChild(li);
    li.style.opacity = 1;
    twitch.list.children.push(li);
  }
};

twitch.users.forEach(function(cur) {
  twitch.requestTwitchData('streams', cur, function(firstResponse) {
    (firstResponse.stream === null) ? twitch.requestTwitchData('channels', cur, function(secondResponse) {
      twitch.handleStreams(secondResponse, secondResponse, "Offline");
    }) : twitch.handleStreams(firstResponse, firstResponse.stream.channel, `${firstResponse.stream.channel.game}\: ${firstResponse.stream.channel.status}`);
  });
});
