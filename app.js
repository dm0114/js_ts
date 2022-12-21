
// https://junhobaik.github.io/ajax-xhr-fetch/
// https://velog.io/@dasssseul/JS-%EB%B9%84%EB%8F%99%EA%B8%B0-%ED%86%B5%EC%8B%A0-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0XHR%EA%B3%BC-Fetch-API
// 

const ajax = new XMLHttpRequest();
const NEWS_URL = 'https://api.hnpwa.com/v0/news/1.json';

ajax.open('GET', NEWS_URL, false);
ajax.send();

const newsFeed = JSON.parse(ajax.response);
const ul = document.createElement('ul');

newsFeed.forEach((item) => {
  const li = document.createElement("li");
  li.innerHTML = item.title;
  ul.appendChild(li);
})

document.getElementById('root').appendChild(ul);