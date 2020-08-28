const fetchBookmark = async (): Promise<KintoneAPIResult> => 
  new kintone.Promise((resolve) => {
    const body = {
      __REQUEST_TOKEN__: kintone.getRequestToken(),
    }
    kintone.api(
      kintone.api.url('/k/api/bookmark/list'), 'POST', body,
      res => resolve(shapeFetchBookmarkResult(res.result)),
      console.error
    );
  });

const parseAnyToFavoriteRecords = (
  records: Array<any>,
): Array<FavoriteRecord> => {
  return records.map((
    record: any,
  ) => ({
    title: String(record.title),
    url: new URL(record.url),
  }));
};

const parseAnyToFavoriteAppRecords = (
  apps: Array<any>,
) => {
  return apps.map((
    app: any,
  ): FavoriteAppRecord => {
    let result: FavoriteAppRecord = {
      list: {}
    };
    if(app.list.APP_INDEX) {
      result.list.APP_INDEX = parseAnyToFavoriteRecords(app.list.APP_INDEX);
    }
    if(app.list.APP_SHOW) {
      result.list.APP_SHOW = parseAnyToFavoriteRecords(app.list.APP_SHOW);
    }

    return result;
  });
}

const shapeFetchBookmarkResult = (result: any): KintoneAPIResult => ({
  apps: parseAnyToFavoriteAppRecords(result.apps),
  search: parseAnyToFavoriteRecords(result.search),
  other: parseAnyToFavoriteRecords(result.other),
});

export default fetchBookmark;
