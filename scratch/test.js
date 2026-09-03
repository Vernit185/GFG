const cloudName = 'dvkwaq6y';
const apiKey = '371687587595426';
const apiSecret = 'wg0P4u7q9SuJFTPX8U7MevB3aRQ';
const authHeader = 'Basic ' + Buffer.from(apiKey + ':' + apiSecret).toString('base64');

fetch('https://api.cloudinary.com/v1_1/' + cloudName + '/resources/search', {
  method: 'POST',
  headers: {
    'Authorization': authHeader,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    expression: 'folder="Individual Pics"',
    max_results: 100
  })
}).then(r => r.json()).then(d => {
  d.resources.forEach(res => {
    console.log(res.display_name, '=>', res.secure_url);
  });
}).catch(console.error);
