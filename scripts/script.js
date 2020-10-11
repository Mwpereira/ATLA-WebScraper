//Grabs info for selected character from Avatar.Fandom.com
function getCharacterDetails(character, response){

//Load Puppeteer
const puppeteer = require('puppeteer');

(async () => {

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    //Visit Character's Designated Website
    await page.goto(`https://avatar.fandom.com/wiki/${character}`, { waitUntil: 'networkidle2'});

    const data = await page.evaluate(() => {
        return {
          img: document.querySelector('.pi-image-thumbnail').src,
          name: document.querySelector('.page-header__title').innerText, 
          nationality: document.querySelector("[data-source='nationality'] > div").innerText, 
          ethnicity: document.querySelector("[data-source='ethnicity'] > div").innerText,
          gender: document.querySelector("[data-source='gender'] > div").innerText,
          eyeColour: document.querySelector("[data-source='eyes'] > div").innerText,
          loveInterest: document.querySelector("[data-source='loveinterest'] > div").innerText,
          weaponOfChoice: Array.from(document.querySelectorAll("[data-source='weapon'] > div"), element => element.textContent) 
        };
      });

      await browser.close();

      return Promise.resolve(data);   
  
  })().then(resolve => {
    console.log("Request Completed");
    response.send(JSON.stringify(resolve)); //Sends Response
    response.end();
});
  
}

exports.getCharacterDetails = getCharacterDetails;