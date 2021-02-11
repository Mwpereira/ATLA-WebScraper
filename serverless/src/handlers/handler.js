const puppeteer = require('puppeteer');

/**
 * Grabs info for selected character from Avatar.Fandom.com
 */
module.exports.getCharacterDetails = async (event) => {
    return (async () => {
        const character = JSON.parse(event.body).character;

        console.log(character);

        const browser = await puppeteer.launch();

        console.log('Browser Launched');

        const page = await browser.newPage();

        console.log('Opened New Page');

        // Visit Character's Designated Website
        await page.goto(`https://avatar.fandom.com/wiki/${character}`, {
            waitUntil: 'networkidle2',
        });

        console.log('Page Loaded');

        const data = await page
            .evaluate(async () => {
                let characterData = {
                    img: document.querySelector('.pi-image-thumbnail').src,
                    name: document.querySelector('.page-header__title').innerText,
                    nationality: document.querySelector("[data-source='nationality'] > div")
                        .innerText,
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
            })
            .catch((error) => {
                console.log(error);
                console.log('Error getting data');
            });
        await browser.close();

        return Promise.resolve(data);
    })()
        .then((resolve) => {
            console.log('Request Completed');
            return {
                statusCode: 200,
                body: JSON.stringify(resolve),
            };
        })
        .catch((error) => {
            console.log('Request Failed');
            console.log(error);
            return {
                statusCode: 400,
                body: JSON.stringify(error),
            };
        });
};
