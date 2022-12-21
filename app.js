
// https://junhobaik.github.io/ajax-xhr-fetch/
// https://velog.io/@dasssseul/JS-%EB%B9%84%EB%8F%99%EA%B8%B0-%ED%86%B5%EC%8B%A0-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0XHR%EA%B3%BC-Fetch-API

// event - 앱 애플리케이션의 화면을 어떻게 전환할 것인가 : "이벤트"
// 브라우저에서 제공하는 API로 해당 UI에 대한 함수를 호출해준다.

const container = document.getElementById("root");
const content = document.createElement('div');
const ajax = new XMLHttpRequest();
const NEWS_URL = 'https://api.hnpwa.com/v0/news/1.json';
const CONTENT_URL = (url) => `https://api.hnpwa.com/v0/item/${url}.json`;

ajax.open('GET', NEWS_URL, false);
ajax.send();

const newsFeed = JSON.parse(ajax.response);
const ul = document.createElement('ul');

window.addEventListener('hashchange', function() {
  ajax.open('GET', CONTENT_URL(location.hash.substr(1)), false);
  ajax.send();
  const newsContent = JSON.parse(ajax.response);
  const title = document.createElement('h1');

  title.innerHTML = newsContent.title;

  content.appendChild(title);
})

newsFeed.forEach((item) => {
  const li = document.createElement("li");
  const a = document.createElement("a");
  a.href = `#${item.id}`;
  a.innerHTML = `${item.title} (${item.comments_count})`;
  ul.appendChild(li);
  li.appendChild(a);
})


container.appendChild(ul);
container.appendChild(content);