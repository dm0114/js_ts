ul// 1. ajax와 xhr & fetch
// https://junhobaik.github.io/ajax-xhr-fetch/
// https://velog.io/@dasssseul/JS-%EB%B9%84%EB%8F%99%EA%B8%B0-%ED%86%B5%EC%8B%A0-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0XHR%EA%B3%BC-Fetch-API

// 2. 이벤트
// event - 앱 애플리케이션의 화면을 어떻게 전환할 것인가 : "이벤트"
// 브라우저에서 제공하는 API로 해당 UI에 대한 함수를 호출해준다.

// 3. DOM API의 한계 - 명령형
// DOM API는 UI의 구조가 잘 드러나지 않는다.
// 해결 방법 - DOM API를 사용하지 않는다..? => 문자열로 만든다.

const container = document.getElementById("root");
const content = document.createElement("div");
const ajax = new XMLHttpRequest();
const NEWS_URL = "https://api.hnpwa.com/v0/news/1.json";
const CONTENT_URL = (url) => `https://api.hnpwa.com/v0/item/${url}.json`;

const getData = (url) => {
  ajax.open("GET", url, false);
  ajax.send();
  return JSON.parse(ajax.response);
};


const newsFeed = getData(NEWS_URL);
const ul = document.createElement("ul");

window.addEventListener("hashchange", () => {
  const newsContent = getData(CONTENT_URL(location.hash.substr(1)));

  container.innerHTML = `
    <h1>${newsContent.title}</h1>
    <div>
      <a href="#">목록으로</a>
    </div>
  `;

});

const newsList = ['<ul>']
newsFeed.forEach((item) => {
    newsList.push(`
    <li>
      <a href="#${item.id}">
        ${item.title} (${item.comments_count})
      </a>
    </li>
  `);
});
newsList.push('</ul>')


container.innerHTML = newsList.join('')
