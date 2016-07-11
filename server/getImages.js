import express from 'express';
import fs from 'fs';
import request from 'request';
import cheerio from 'cheerio';

import {uniq, flattenDeep, get} from 'lodash';
import {sbData} from '../src/sb-Data';

let everyTeam = [];

const sbDataByYear = [];

for (const number in sbData) {
  sbDataByYear.push(sbData[number]);
}

sbDataByYear.forEach((sb) => {
  everyTeam.push(sb.teams);
});

everyTeam = uniq(flattenDeep(everyTeam));

everyTeam.forEach((team) => {
  const teamWithHyphen = team.replace(' ', '_');
  request(`https://en.wikipedia.org/wiki/${teamWithHyphen}`, (rsp, err, html) => {
    const $ = cheerio.load(html);
    const allImages = $('a');
    let foundImageTag;
    for (const index in allImages) {
      if (allImages[index].attribs && allImages[index].attribs.title === `${team} logo`) {
        foundImageTag = allImages[index].attribs.href;
      };
    };
    request(`https://en.wikipedia.org${foundImageTag}`, (rsp, err, html) => {
      const $ = cheerio.load(html);
      const allActualImages = $('img');
      let foundImageTag;
      for (const indexOther in allActualImages) {
        if (team === 'Seattle Seahawks') {
          console.log(get(allActualImages[indexOther], `.attribs.alt`, ''));
        }
        if (get(allActualImages[indexOther], `.attribs.alt`, '').indexOf(`${team} logo`) !== -1) {
          foundImageTag = allActualImages[indexOther];
        };
      };
      if (foundImageTag) {
        const url = foundImageTag.attribs.src.indexOf('http') === -1 ? `https:${foundImageTag.attribs.src}` :
          foundImageTag.attribs.src;
        download(url, `./img/${teamWithHyphen}.jpg`);
      }
    });
  });

  const download = function(uri, filename) {
    request.head(uri, function(err, res) {
      console.log('content-type:', res.headers['content-type']);
      console.log('content-length:', res.headers['content-length']);

      request(uri).pipe(fs.createWriteStream(filename)).on('close', () => {});
    });
  };
});
