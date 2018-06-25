// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement("script");

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player("player", {
    height: "1",
    width: "1",
    videoId: "Xw5AiRVqfqk",
    events: {
      onStateChange: onPlayerStateChange
    }
  });
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;
function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.PLAYING && !done) {
    done = true;
  }
}

new Vue({
  el: "#app",
  data: {
    playing: false,
    stream: ""
  },
  methods: {
    playingToggle: function (event) {
      if (this.playing) {
        player.pauseVideo();
        this.playing = !this.playing;
        event.target.innerText = "play_arrow";
      } else {
        player.playVideo();
        this.playing = !this.playing;
        event.target.innerText = "pause";
      }
    }
  }
});

Vue.component('cards', {
  template: '#cardOverview',
  data: function () {
    return {
      stream: []
    }
  },

  ready: function () {
    this.getStream();
  },

  methods: {
    fetchCampaigns: function () {
      var campaigns = [];
      this.$http.get('/retention/getCampaigns')
        .success(function (campaigns) {
          this.$set('campaigns', campaigns);

        })
        .error(function (err) {
          campaigns.log(err);
        });
    },
    getStream: function (resource) {
      this.$http.get("http://127.0.0.1:5000/stream").then((response) => {
        this.$set("stream", response);
      });
    }
  }
});