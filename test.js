// const { google } = require('googleapis');
// const apiKey = 'AIzaSyBF0Wn6ymwPScEGakDBSemYmGs9is4TfbU'
// const youtube = google.youtube({
//     version: 'v3',
//     auth: apiKey, 
// });

// // Example: Search for videos
// youtube.search.list({
//     part: 'full',
//     q: 'REACT tutorials',
// }, (err, res) => {
//     if (err) {
//         console.error('Error:', err);
//         return;
//     }
//     const videos = res.data.items;
//     videos.forEach(video => {
//         console.log(`${video.snippet.title}: ${video.id.videoId}`);
//     });
// });

// Make a request to the website
const axios = require('axios');
const cheerio = require('cheerio');

// Make a request to the website
// axios.get('https://roadmap.sh/frontend')
//     .then(response => {
//         // Use Cheerio to parse the HTML
//         const $ = cheerio.load(response.data);

//         // Extract the specific content you want
//         const specificContent = $('.specific-class').html();
//         // Log the content to the console
//         console.log(specificContent);
//         console.log(response.data);

//         // Alternatively, you can save it to a file or process it further
//         // For example, save to a file using fs:
//         // const fs = require('fs');
//         // fs.writeFileSync('output.html', specificContent);
//     })
//     .catch(error => {
//         console.error(error);
//     });


// const puppeteer = require('puppeteer');

// (async () => {
//     try {
//         const browser = await puppeteer.launch();
//         const page = await browser.newPage();
//         await page.goto('https://www.w3schools.com/react/react_hooks.asp');

//         // Wait for the element with the class 'specific-class' to be present
//         await page.waitForSelector('.specific-class');

//         // Get the HTML content of the element with the class 'specific-class'
//         const specificContent = await page.$('.specific-class');
        
//         if (specificContent) {
//             console.log(await specificContent.evaluate(node => node.innerHTML));
//         } else {
//             console.error('Element with class "specific-class" not found');
//         }

//         await browser.close();
//     } catch (error) {
//         console.error('An error occurred:', error);
//     }
// })();


// const browser = await puppeteer.launch({
//     executablePath: 'https://www.w3schools.com/react/react_hooks.asp'
//   })
let name = 'nodejs'

const url = `https://www.w3schools.com/${name}/default.asp`;

axios.get(url)
  .then(response => {
    const html = response.data;
    const $ = cheerio.load(html);

    const pageTitle = $('title').text();
    const heading = $('h1').text();
    const paragraphs = [];
    $('p').each((index, element) => {
      paragraphs.push($(element).text().trim());
    });

    console.log('Page Title:', pageTitle);
    console.log('Heading:', heading);
    console.log('Paragraphs:', paragraphs);
  })
  .catch(error => {
    console.error('Error:', error.message);
  });
