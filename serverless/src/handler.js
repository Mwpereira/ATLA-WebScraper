const puppeteer = require('puppeteer-lambda');

const headers = {
    'Access-Control-Allow-Headers': 'Content-Type,x-requested-with',
    'Access-Control-Allow-Methods': 'POST,OPTIONS',
    'Access-Control-Allow-Origin': `https://atla.michaelpereira.dev`,
    'X-Frame-Options': 'SAMEORIGIN',
    'X-Requested-With': '*',
    'X-Xss-Protection': '1; mode=block',
};

/**
 * Grabs info for selected character from Avatar.Fandom.com
 */
module.exports.getCharacterDetails = async (event) => {
    return (async () => {
        const character = JSON.parse(event.body).character;

        const browser = await puppeteer.getBrowser({
            headless: true,
        });
        const page = await browser.newPage();

        // Visit Character's Designated Website
        await page.goto(`https://avatar.fandom.com/wiki/${character}`, {
            waitUntil: 'networkidle2',
        });

        const data = await page.evaluate(async () => {
            let characterData = {
                img: document.querySelector('.pi-image-thumbnail').src,
                name: document.querySelector('.page-header__title').innerText,
                nationality: document.querySelector("[data-source='nationality'] > div").innerText,
                ethnicity: document.querySelector("[data-source='ethnicity'] > div").innerText,
                eyeColour: document.querySelector("[data-source='eyes'] > div").innerText,
                weaponOfChoice: Array.from(
                    document.querySelectorAll("[data-source='weapon'] > div"),
                    (element) => element.textContent
                ),
            };

            //Handles missing value for Iroh and Appa
            try {
                characterData.loveInterest = document.querySelector(
                    "[data-source='loveinterest'] > div"
                ).innerText;
            } catch (error) {
                console.log(error);
            }

            return characterData;
        });
        await browser.close();

        return Promise.resolve(data);
    })()
        .then((resolve) => {
            console.log('Request Completed');
            return {
                statusCode: 200,
                body: JSON.stringify(resolve),
                headers: headers,
            };
        })
        .catch((error) => {
            console.log('Request Failed');
            return {
                statusCode: 400,
                body: JSON.stringify(error),
                headers: headers,
            };
        });
};
