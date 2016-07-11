import fs from 'fs';
import request from 'request';
import cheerio from 'cheerio';

import {get} from 'lodash';
import {sbData} from '../src/sb-Data';

const sbDataByYear = [];

for (const number in sbData) {
  sbDataByYear.push(number);
}


sbDataByYear.forEach((team) => {
  const teamWithHyphen = team.replace(' ', '_');
  request(`https://en.wikipedia.org/wiki/Super_Bowl_${teamWithHyphen}`, (rsp, err, html) => {
    const $ = cheerio.load(html);
    const allImages = $('a');
    let foundImageTag;
    for (const index in allImages) {
      if (foundImageTag) {break;}
      const imageUrl = allImages[index].attribs && get(allImages[index], '.attribs.href', '').replace('_', '');
      console.log(imageUrl);
      if (imageUrl && imageUrl.indexOf(team.toUpperCase()) !== -1 && imageUrl.indexOf('svg') !== -1) {
        console.log('FOUND IT!');
        foundImageTag = allImages[index].attribs.href;
      };
    };
    request(`https://en.wikipedia.org${foundImageTag}`, (rsp, err, html) => {
      const $ = cheerio.load(html);
      const allActualImages = $('img');
      let foundImageTagTwo;
      console.log('GOING', team);
      for (const indexOther in allActualImages) {
        if (get(allActualImages[indexOther], `.attribs.src`, '').indexOf(team.toUpperCase()) !== -1) {
          console.log('FOUND IT!');
          foundImageTagTwo = allActualImages[indexOther];
        };
      };
      if (foundImageTag) {
        console.log(foundImageTag);
        download(`https:${foundImageTagTwo.attribs.src}`, `./img/Super_Bowl_${teamWithHyphen}.jpg`);
      }
    });
  });

  const download = function(uri, filename) {
    console.log(uri);
    request.head(uri, function(err, res) {
      console.log('content-type:', res.headers['content-type']);
      console.log('content-length:', res.headers['content-length']);

      request(uri).pipe(fs.createWriteStream(filename)).on('close', () => {});
    });
  };
});
