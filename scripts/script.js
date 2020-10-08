// Grabs info for selected character from Avatar.Fandom.com
function loadCharacterDetails(){

//Load Puppeteer
const puppeteer = require('puppeteer');

const character = 'Aang';//$("#characters option:selected").text();

return (async () => {

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    //Visit Character's Designated Website
    await page.goto(`https://avatar.fandom.com/wiki/${character}`, { waitUntil: 'networkidle2'});

    const data = await page.evaluate(() => {
                  
      return {
        characterImg: document.querySelector('.pi-image-thumbnail').src,
        characterName: document.querySelector('.page-header__title').innerText, 
        nationality: document.querySelector("[data-source='nationality'] > div > a").innerText, 
        ethnicity: document.querySelector("[data-source='ethnicity'] > div > a").innerText,
        gender: document.querySelector("[data-source='gender'] > div").innerText,
        eyecolor: document.querySelector("[data-source='eyes'] > div").innerText,
        loveInterest: document.querySelector("[data-source='loveinterest'] > div > a").innerText,
        weaponOfChoice: Array.from(document.querySelectorAll("[data-source='weapon'] > div > a"), element => element.textContent) 
      };

    });

    await browser.close();
    
    return data;
  
  })();

}

exports.loadCharacterDetails = loadCharacterDetails;