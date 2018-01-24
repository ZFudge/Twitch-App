function checkBox(input) {
  Array.from(document.getElementsByTagName('input')).forEach(cur => cur.checked = false);
  input.checked = true;
}

const twitch = {
  list: document.getElementById('list'),
  users: ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"],
  responses: []
};

function requestChannelData(channel,index) {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      const response = JSON.parse(xhr.response);
      twitch.responses.push(response);
      const li = document.createElement('li');

      const img = document.createElement('img');
      img.src = response.logo;

      const nameSpan = document.createElement('span');
      const a = document.createElement('a');
      a.href = response.url;
      a.innerHTML = response.display_name;
      a.target = '_blank';
      nameSpan.appendChild(a);

      const statusSpan = document.createElement('span');
      statusSpan.innerHTML = `${response.game}: ${response.status}`;

      li.appendChild(img);
      li.appendChild(nameSpan);
      li.appendChild(statusSpan);
      twitch.list.appendChild(li);
      li.style.opacity = 1;
    }
  }
  xhr.open("GET", `https://wind-bow.glitch.me/twitch-api/channels/${channel}`);
  xhr.send();
}

twitch.response
twitch.users.forEach(function(cur,ind) {
  requestChannelData(cur,ind);
});

//setTimeout(function(){
//  Array.from(twitch.list.children).forEach(cur=>cur.style.opacity = 1)
//},1000);

/*



setTimeout(function() {
  twitch.responses.forEach(function(cur) {
    const li = document.createElement('li');
    const img = document.createElement('img');
    img.src = cur.logo;
    const span = document.createElement('span');
    const a = document.createElement('a');
    a.href = `https://www.twitch.tv/${cur.display_name}`;
    a.innerHTML = cur.display_name;
    a.target = '_blank';
    span.appendChild(a);
    li.appendChild(img);
    li.appendChild(span);
    twitch.list.appendChild(li);
  });

},0);

*/
