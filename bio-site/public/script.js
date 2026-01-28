fetch("/api/config")
  .then(res => res.json())
  .then(cfg => {
    document.title = cfg.title || "Bio";

    if (cfg.favicon) {
      const f = document.createElement("link");
      f.rel = "icon";
      f.href = cfg.favicon;
      document.head.appendChild(f);
    }

    if (cfg.cursor)
      document.body.style.cursor = `url(${cfg.cursor}), auto`;

    // background
    if (cfg.bgVideo) {
      const v = document.createElement("video");
      v.src = cfg.bgVideo;
      v.autoplay = v.loop = v.muted = true;
      document.getElementById("bg").appendChild(v);
    } else if (cfg.bgImage) {
      const i = document.createElement("img");
      i.src = cfg.bgImage;
      document.getElementById("bg").appendChild(i);
    }

    // profile
    avatar.src = cfg.avatar || "";
    username.innerText = cfg.username || "";
    bio.innerText = cfg.bio || "";

    // links
    if (cfg.links) {
      JSON.parse(cfg.links).forEach(l => {
        const a = document.createElement("a");
        a.href = l.url;
        a.innerText = l.name;
        a.target = "_blank";
        links.appendChild(a);
      });
    }

    // music
    if (cfg.music) {
      const a = new Audio(cfg.music);
      a.loop = true;
      a.volume = 0.5;
      a.play();
    }
  });
