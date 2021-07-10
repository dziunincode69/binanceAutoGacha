const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())
const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker')
puppeteer.use(AdblockerPlugin({ blockTrackers: true }))
const fs = require('fs');
const fetch = require('node-fetch');
const delay = require('delay')
const { resolve } = require('path');
const exec = require('child_process').exec;

// CREATED BY JEINEL CANNINE
// npm i puppeteer readline-sync fs random-useragent node-fetch
(async () => {

console.clear()
console.log('======================== B I N A N C E ========================');
while(true){
    const uname = `${makeid(5)}`
    const email = `${uname.toLocaleLowerCase()}@ruomvpp.com`
    // const email = 'dziu.nin.co.d.e.6.9@gmail.com'
    const reff = '47762731' //Refferal
    const passwordAccount = `San$192ISO`
    const options = {waitUntil: 'networkidle2'}
    const browser = await puppeteer.launch({ headless: false,args: [
    '--remote-debugging-port=9222',
    "--remote-debugging-address=0.0.0.0", // You know what your doing?
    '--disable-gpu', "--disable-features=IsolateOrigins,site-per-process", '--blink-settings=imagesEnabled=true'
    ]});
    const page = await browser.newPage();
    console.log(`Your email: ${email}`)
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');

    let originalImage = '';

    await page.goto(`https://accounts.binance.com/en/register?ref=${reff}&utm_campaign=web_share_link&utm_source=twitter`, options)
    
    const emailField = await page.waitForSelector('input[name=email]')
    await emailField.type(email)

    const passwordField = await page.$('input[name=password]')
    await passwordField.type(passwordAccount)
    await delay(1000)
    await page.click('#click-registration-submit')
    await bypassSlider(page,originalImage)
    await delay(1000)
    await getMail(email,page)
    await delay(1000)
    await page.waitForSelector('div[id=welcome-redirect-to-dashboard]', {timeout: 500500});
    await page.goto('https://www.binance.com/en/my/dashboard', options);
    await lottery(email,passwordAccount,page)
    await browser.close()
  }
  })();

  async function bypassSlider(page,originalImage)
  {
    await page.setRequestInterception(true);
    page.on('request', request => request.continue())
    page.on('response', async response => {
        if (response.request().url().includes('image/antibot/image/SLIDE/')) {
            originalImage = await response.buffer().catch(() => {});
        }
    })


    await page.waitForSelector(".verify-slider.css-13rz4tr", { visibe: true, timeout: 5000 });
    const sliderElement = await page.$('.verify-slider.css-13rz4tr');
    const slider = await sliderElement.boundingBox();

    await page.waitForSelector(".css-p72bjc", { visibe: true, timeout: 5000 });
    const sliderHandler = await page.$('.css-p72bjc');
    const handler = await sliderHandler.boundingBox();

    await fs.writeFileSync('test.png', originalImage, 'binary');
    exec("magick compare -metric RMSE -subimage-search test.png base.png test.png", async (error, stdout, stderr) => {
        const x = error.toString().split('@')[error.toString().split('@').length-1].trim().split(',')[0];
        const y = error.toString().split('@')[error.toString().split('@').length-1].trim().split(',')[1];
        console.log(handler.x + (parseInt(x)-100), x)
        console.log(handler.y, y)

        await page.mouse.move(handler.x, handler.y);
        await page.mouse.down();
        const valueData = (parseInt(x)-89)
        let currentPosition = 0

        for (let index = 0; index < valueData; index++) {
            await page.mouse.move(handler.x+currentPosition, handler.y);
            currentPosition = index++
            
        }
        await page.mouse.move(handler.x+currentPosition, handler.y, {stpes:10});
        await page.mouse.up();
    });
    if(await page.waitForSelector('.verify-slider.css-13rz4tr') == null)
    {
      await page.click('svg[cursor=pointer]')
      await delay(2000)
      return bypassSlider(page,originalImage)
    }
  }

  async function lottery(email,passwordAccount,page) {
    await delay(2000)
    await page.goto("https://www.binance.com/en/activity/challenge-competition/BN1619390024480464897", {
        waitUntil: 'networkidle2'
    });

    await page.click("button.css-12hnkyh");
    await page.waitForSelector(".css-117q1xf", { visibe: true });
    await page.click(".css-117q1xf");
    await page.click(".css-f1b9tf");
    await page.waitForTimeout(2000);
    await page.click(".prize__go.css-1y5g7fj");
    await page.click(".prize__go.css-1y5g7fj");
    await page.reload()
    await page.waitForSelector('.css-h8rj75')
    let  spinTime =  await page.$eval('.css-h8rj75', el => el.innerText);
    console.log('You had  '+spinTime)
    await page.waitForSelector('.prize__go.css-1y5g7fj')
    await page.click('.prize__go.css-1y5g7fj')
    await page.waitForSelector('.css-1cdqwlf', {timeout:10000})
    let resultPrize = await page.$eval('.css-1cdqwlf', el => el.innerText);
    console.log(`[${email}] Result Prize ${resultPrize}`)
    fs.appendFileSync("binanceGacha.txt", `${email}|${passwordAccount}|${resultPrize}\n`);
    console.log(`${email}|${resultPrize}\n`)

    
}

  
  async function getMail(email,page)
  {
    const split = email.split("@")
    await delay(5000)
    await fetch("https://generator.email/inbox9/", {
      "headers": {
        "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "accept-language": "en-US,en;q=0.9,id;q=0.8",
        "Cookie": `surl=${split[1]}%2F${split[0]}; _ga=GA1.2.470563501.1625745570; _gid=GA1.2.1479962888.1625745570; _gat=1; __gads=ID=a626d731605fdb94-22927e3e33ca00d4:T=1625745580:RT=1625745580:S=ALNI_MaeP-N1AzTpxmBNxrpSEKOaSd3MNA`,
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:89.0) Gecko/20100101 Firefox/89.0"
      },
      "method": "GET",
    }).then(res => res.text())
    .then(body => {
      try{
      const otp = body.match(/#e9b434\">(.*?)<\/span>/);
      console.log('Verification code: '+otp[1]);
      page.waitForSelector('div.bn-inputCode-input.css-vurnku')
       page.type('div.bn-inputCode-input.css-vurnku', otp[1]);
      }
      catch(err)
      {
        console.log('Otp Not Found')
        return getMail(email,page)
      }
       delay(2000)


       
    });


  
  }
  function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

      
      