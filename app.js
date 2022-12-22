// 1. ajax와 xhr & fetch
// https://junhobaik.github.io/ajax-xhr-fetch/
// https://velog.io/@dasssseul/JS-%EB%B9%84%EB%8F%99%EA%B8%B0-%ED%86%B5%EC%8B%A0-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0XHR%EA%B3%BC-Fetch-API

// 2. 이벤트
// event - 앱 애플리케이션의 화면을 어떻게 전환할 것인가 : "이벤트"
// 브라우저에서 제공하는 API로 해당 UI에 대한 함수를 호출해준다.

// 3. DOM API의 한계 - 명령형
// DOM API는 UI의 구조가 잘 드러나지 않는다.
// 해결 방법 - DOM API를 사용하지 않는다..? => 문자열로 만든다.

// 4. 라우터 - 화면 처리기
// SPA - 클라이언트에서 url에 해당하는 UI를 그리는 코드(함수)를 실행한다.
// MPA - 서버에서 url에 해당하는 html 파일을 제공해준다.

// 5. 페이징
// 현재 페이지의 변수 필요 -> 전역 정보인지, 함수 내에서만 필요한 정보인지 

const container = document.getElementById("root");
const content = document.createElement("div");
const ajax = new XMLHttpRequest();
const NEWS_URL = "https://api.hnpwa.com/v0/news/1.json";
const CONTENT_URL = (url) => `https://api.hnpwa.com/v0/item/${url}.json`;
const store = { 
  currentPage: 1,
  maxPage: 0
}

const getData = (url) => {
  ajax.open("GET", url, false);
  ajax.send();

  return JSON.parse(ajax.response);
};

const newsFeed = () => {
  const newsFeeds = getData(NEWS_URL);
  store.maxPage = Math.ceil(newsFeeds.length / 10);

  const newsList = ["<ul>"];

  for ( let i = (store.currentPage - 1) * 10; i < store.currentPage * 10; i ++) {
    newsList.push(`
      <li>
        <a href="#/show/${newsFeeds[i].id}">
          ${newsFeeds[i].title} (${newsFeeds[i].comments_count})
        </a>
      </li>
    `);
  }

  newsList.push("</ul>");
  newsList.push(`
      <div>
        <a href="#/page/${store.currentPage > 1 ? store.currentPage - 1 : 1}">이전 페이지</a>
        <a href="#/page/${store.currentPage < store.maxPage ? store.currentPage + 1 : store.maxPage} ">다음 페이지</a>
      </div>
  `);

  container.innerHTML = newsList.join("");
};

const newsDetail = () => {
  const newsContent = getData(CONTENT_URL(location.hash.substr(7)));

  container.innerHTML = `
    <h1>${newsContent.title}</h1>

    <div>
      <a href="#/page/${store.currentPage}">목록으로</a>
    </div>
  `;
};

const router = () => {
  const routePath = location.hash;
  if (routePath === "") {
    newsFeed();
  } else if (routePath.indexOf('#/page/') >= 0) {
    store.currentPage = Number(routePath.substr(7))
    newsFeed();
  } else {
    newsDetail();
  }
}

window.addEventListener("hashchange", router);
router();
