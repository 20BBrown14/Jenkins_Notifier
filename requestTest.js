var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

let someObject = {}
function request(url, propName) {
	const Http = new XMLHttpRequest();
  Http.open("GET", url, true);
  Http.withCredentials = true;
  Http.mozSystem = true;
	
	Http.onreadystatechange = function () {
		console.log(this.readyState);
		if(this.readyState == 4 && this.status == 200) {
			someObject = {...someObject, [`${propName}`]: "hello" };
			console.log(someObject);
		}
	};
	Http.send();
}

//const url='https://jsonplaceholder.typicode.com/posts';
const url = 'https://jenkins.cerner.com/ion/api/xml';
for(let i = 0; i < 10; i = i + 1) {
	request(url, i.toString());
}