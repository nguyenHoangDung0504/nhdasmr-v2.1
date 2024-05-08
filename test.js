fetch('/RJ01184272.mp3', {
  "authority": 'v.weeab0o.xyz',
  "method": "GET",
  "headers": {
    "Accept": "*/*",
    "Accept-Encoding": "identity;q=1, *;q=0",
    "Accept-Language": "vi",
    "Range": "bytes=0-",
    "Referer": 'https://japaneseasmr.com/114284/',
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
    "Sec-Ch-Ua": '"Chromium";v="122", "Not(A:Brand";v="24", "Google Chrome";v="122"',
    "Sec-Fetch-Dest": 'audio',
    "Sec-Fetch-Site": "cross-site",
    "Sec-Fetch-Mode": "no-cors",
  }
}).then(response => {
  console.log(response);
}).catch(error => {
  console.log(error);
});