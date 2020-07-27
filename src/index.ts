const shapeBookmarks = bookmarks => ([
  ...bookmarks.apps.flatMap(app => {
    let result = [];
    // [...app.list.APP_INDEX, ...app.list.APP_SHOW]
    if(app.list.APP_INDEX) result = [...result, ...app.list.APP_INDEX];
    if(app.list.APP_SHOW) result = [...result, ...app.list.APP_SHOW];
    return result;
  }),
  ...bookmarks.search,
  ...bookmarks.other
]);

const fetchBookmark = async () => 
new kintone.Promise((resolve, reject) => {
  const body = {
    __REQUEST_TOKEN__: kintone.getRequestToken(),
  }
  kintone.api(
    kintone.api.url('/k/api/bookmark/list'), 'POST', body,
    res => resolve(res.result),
    console.error
  );
});

const widget_template_html = `
  <div class="ocean-portal-widget">
    <div class="ocean-portal-assigned">
      <div class="gaia-argoui-widget">
        <div class="gaia-argoui-widget-header gaia-argoui-widget-header-icon" style="background-image: url(&quot;https://static.cybozu.com/contents/k/image/argo/uiparts/widget/threads_56.png&quot;); background-position: left top; background-repeat: no-repeat;">
          <h3 class="gaia-argoui-widget-title">Favoritone</h3>
        </div>
        <div class="gaia-argoui-widget-body">
          <div>
            <div class="gaia-argoui-appscrollinglist">
              <ul id="favoritone" class="gaia-argoui-appscrollinglist-list">
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
`;

const createFavoriteListHtml = list => list.map(object => `
  <li class="favoritone-list" data-id="${object.id}" draggable="true" style="transition: 1s;">
    <a class="gaia-argoui-spacescrollinglist-item" href="${object.url}">
      <span class="gaia-argoui-spacescrollinglist-name" style="pointer-events: none;">${object.title}</span>
    </a>
  </li>
`).join('');

const createFavoritone = async () => {
  if(location.hash !== '#/portal') return;
  const bookmarks = shapeBookmarks(await fetchBookmark());
  const widget_html = document.querySelector('.ocean-portal-body-right');
  widget_html.innerHTML = widget_template_html + widget_html.innerHTML;

  let bookmark_ids = bookmarks.map(x => x.id);
  const saved_sort_ids = JSON.parse(localStorage.getItem('favoritone'));
  if(saved_sort_ids !== null) {
    bookmark_ids.sort((a, b) => {
      const a_index = saved_sort_ids.findIndex(x => x === a);
      const b_index = saved_sort_ids.findIndex(x => x === b);
      if(b_index === undefined) return 0;
      if(a_index === undefined) return 1;
      return a_index - b_index
    });
  }

  const sorted_bookmarks = bookmark_ids.flatMap(id => bookmarks.filter(object => object.id === id));
  const favoritone_list_html = document.querySelector('#favoritone')
  favoritone_list_html.innerHTML = createFavoriteListHtml(sorted_bookmarks);

  const list_nodes = document.querySelectorAll('.favoritone-list');
  var favoritone_dragged;
  list_nodes.forEach(node => {
    node.addEventListener('dragstart', e => {
      favoritone_dragged = e.target.parentNode;
    });
    node.addEventListener('dragover', e => {
      e.preventDefault();
    })
    node.addEventListener('dragenter', e => {
      event.preventDefault();
      if(!e.target.style) return;
      e.target.style.borderBottom = "solid 2px #0000ff";
    });
    node.addEventListener('dragleave', e => {
      if(!e.target.style) return;
      e.target.style.borderBottom = "none";
    });
    node.addEventListener('drop', e => {
      e.preventDefault();
      e.target.parentNode.parentNode.insertBefore(favoritone_dragged, e.target.parentNode.nextSibling);
      e.target.style.borderBottom = "none";
      let new_sorted_bookmark_ids = [];
      e.target.parentNode.parentNode.querySelectorAll('.favoritone-list').forEach(list => {
        new_sorted_bookmark_ids = [...new_sorted_bookmark_ids, list.dataset.id];
      });
      localStorage.setItem('favoritone', JSON.stringify(new_sorted_bookmark_ids));
    });
  });
};

createFavoritone();
window.addEventListener('hashchange', createFavoritone);
