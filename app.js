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

// 5. 페이지네이션
// 현재 페이지의 변수 필요 -> 전역 정보인지, 함수 내에서만 필요한 정보인지

// 6. 템플릿 렌더링 - 템플릿으로 복잡도 낮추기
// 템플릿 기법 - 코드와 UI를 분리하여 코드의 복잡도를 낮춘다.

// 7.템플릿 방식의 단점과 재귀호출을 통한 댓글, 대댓글 구현
// 템플릿 방식의 단점 - 마킹된 데이터의 수 만큼 replace 요구 => 라이브러리를 통한 보완 필요,,
// 끝을 알 수 없는 구조 -> 재귀 함수로 끝까지 추적

const container = document.getElementById("root");
const content = document.createElement("div");
const ajax = new XMLHttpRequest();
const NEWS_URL = "https://api.hnpwa.com/v0/news/1.json";
const CONTENT_URL = (url) => `https://api.hnpwa.com/v0/item/${url}.json`;
const store = {
  currentPage: 1,
  maxPage: 0,
  feeds: [],
};

const getData = (url) => {
  ajax.open("GET", url, false);
  ajax.send();

  return JSON.parse(ajax.response);
};

function makeFeeds(feeds) {
  for (let i = 0; i < feeds.length; i++) {
    feeds[i].read = false;
  }

  return feeds;
}

const newsFeed = () => {
  const newsFeeds = getData(NEWS_URL);
  store.maxPage = Math.ceil(newsFeeds.length / 10);

  let template = `
    <div class="bg-gray-600 min-h-screen">
      <div class="bg-white text-xl">
        <div class="mx-auto px-4">
          <div class="flex justify-between items-center py-6">
            <div class="flex justify-start">
              <h1 class="font-extrabold">Hacker News</h1>
            </div>
            <div class="items-center justify-end">
              <a href="#/page/{{__prev_page__}}" class="text-gray-500">
                Previous
              </a>
              <a href="#/page/{{__next_page__}}" class="text-gray-500 ml-4">
                Next
              </a>
            </div>
          </div> 
        </div>
      </div>
      <div class="p-4 text-2xl text-gray-700">
        {{__news_feed__}}        
      </div>
    </div>
  `;

  const newsList = [];
  console.log(newsFeeds);
  for (let i = (store.currentPage - 1) * 10; i < store.currentPage * 10; i++) {
    newsList.push(`
      <div class="p-6 ${
        newsFeeds[i].read ? "bg-red-500" : "bg-white"
      } mt-6 rounded-lg shadow-md transition-colors duration-500 hover:bg-green-100">
        <div class="flex">
          <div class="flex-auto">
            <a href="#/show/${newsFeeds[i].id}">${newsFeeds[i].title}</a>  
          </div>
          <div class="text-center text-sm">
            <div class="w-10 text-white bg-green-300 rounded-lg px-0 py-2">${
              newsFeeds[i].comments_count
            }</div>
          </div>
        </div>
        <div class="flex mt-3">
          <div class="grid grid-cols-3 text-sm text-gray-500">
            <div><i class="fas fa-user mr-1"></i>${newsFeeds[i].user}</div>
            <div><i class="fas fa-heart mr-1"></i>${newsFeeds[i].points}</div>
            <div><i class="far fa-clock mr-1"></i>${newsFeeds[i].time_ago}</div>
          </div>  
        </div>
      </div>    
    `);
  }

  template = template.replace("{{__news_feed__}}", newsList.join(""));
  template = template.replace(
    "{{__prev_page__}}",
    store.currentPage > 1 ? store.currentPage - 1 : 1
  );
  template = template.replace(
    "{{__next_page__}}",
    store.currentPage < store.maxPage ? store.currentPage + 1 : store.maxPage
  );

  container.innerHTML = template;
};


const newsDetail = () => {
  const newsContent = getData(CONTENT_URL(location.hash.substr(7)));

  let template = `
    <div class="bg-gray-600 min-h-screen pb-8">
      <div class="bg-white text-xl">
        <div class="mx-auto px-4">
          <div class="flex justify-between items-center py-6">
            <div class="flex justify-start">
              <h1 class="font-extrabold">Hacker News</h1>
            </div>
            <div class="items-center justify-end">
              <a href="#/page/${store.currentPage}" class="text-gray-500">
                <i class="fa fa-times"></i>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div class="h-full border rounded-xl bg-white m-6 p-4 ">
        <h2>${newsContent.title}</h2>
        <div class="text-gray-400 h-20">
          ${newsContent.content}
        </div>

        {{__comments__}}

      </div>
    </div>
  `;

  for (let i = 0; i < store.feeds.length; i++) {
    if (store.feeds[i].id === Number(id)) {
      store.feeds[i].read = true;
      break;
    }
  }

  function makeComment(comments, called = 0) {
    const commentString = [];

    for (let i = 0; i < comments.length; i++) {
      commentString.push(`
        <div style="padding-left: ${called * 40}px;" class="mt-4">
          <div class="text-gray-400">
            <i class="fa fa-sort-up mr-2"></i>
            <strong>${comments[i].user}</strong> ${comments[i].time_ago}
          </div>
          <p class="text-gray-700">${comments[i].content}</p>
        </div>      
      `);

      if (comments[i].comments.length > 0) {
        commentString.push(makeComment(comments[i].comments, called + 1));
      }
    }

    return commentString.join("");
  }

  container.innerHTML = template.replace(
    "{{__comments__}}",
    makeComment(newsContent.comments)
  );
}

const router = () => {
  const routePath = location.hash;
  if (routePath === "") {
    newsFeed();
  } else if (routePath.indexOf("#/page/") >= 0) {
    store.currentPage = Number(routePath.substr(7));
    newsFeed();
  } else {
    newsDetail();
  }
};

window.addEventListener("hashchange", router);
router();
