/*
Discord artık sadece ip üzerinden değil hesaptan da rate limit atıyor galiba bu yüzden hesap tokenleri açıp (10-15) adet bunlara math.random yapabilirsiniz proxydeki atama mantığı ile aynı bunu burada kullanmadım ama biraz mantıkla yapabilirsiniz
*/

const request = require('request');
const { Client } = require('discord.js-selfbot-v13');
const client = new Client({ checkUpdate: false });
const moment = require('moment')
const { JsonDatabase } = require("wio.db");
const db = new JsonDatabase("db");
const JSON = require('./proxies.json')
require('moment-duration-format')
moment.locale('tr')
const fs = require('fs');
const { error } = require('console');

client.config = {
  "Token": "", // DISCORD LOGLARINI ATACAK TOKEN
  "Server": "", // SUNUCU
  "Url": "", // VANITY URL
};
client.proxies = [] // PROXYLER

client.on("ready", async () => {
  JSON.validProxies.forEach(proxy => {
    client.proxies.push(proxy)
  })
  setInterval(() => {
    spam()
  }, 1000);
  console.log(client.guilds.cache.get(client.config.Server).name + client.user.tag + "Giriş yaptı");
});

async function spam() {
  let datax = client.proxies
  const proxiessync = Math.floor(
    Math.random() * datax.length,
  );
  let proxy = datax[proxiessync]

  if (client.guilds.cache.get(client.config.Server).vanityURLCode == client.config.Url) return;
  const iconquered = {
    url: `https://discord.com/api/v8/guilds/${client.config.Server}/vanity-url`,
    body: { code: `${client.config.Url}` },
    json: true,
    method: 'PATCH',
    proxy: "http://" + proxy,
    headers: { "Authorization": `${client.config.Token}` }
  };
  request(iconquered, async (err, res, body) => {
    if (err) {
      // console.log('Hata:' + proxy + err)
      return;
    } else console.log(`Kullanılan Proxy: ${proxy} Spamlanan Url: ${client.config.Url}`)
    if (client.guilds.cache.get(client.config.Server).vanityURLCode === client.config.Url) {
      console.log("Url Alındı!");
    }
  })
}

client.login(client.config.Token);
