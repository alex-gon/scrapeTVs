const puppeteer = require('puppeteer');

async function scrapeProduct(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();       
    await page.goto(url);

    const names = await page.$$eval('.FS-PCR-pl-asin-title', tvNames => { return tvNames.map(name => name.innerText)});
    const prices = await page.$$eval('.a-price', tvPrices => { return tvPrices.map(price => price.innerText.slice(14))});
   

    let tvs = []
    for (i = 0; i < 20; i++) {
        tvs[i] = {
            Name: names[i],
            Price: prices[i]
        }
      }

    console.log(tvs);

    browser.close();
}

scrapeProduct('https://www.amazon.com/pcr/Top-Rated-Televisions-Reviews/172659');