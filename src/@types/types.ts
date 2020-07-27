type FavoriteRecord = {
  title: string;
  url: URL;
};

type FavoriteAppRecord = {
  list: {
    APP_INDEX?: Array<FavoriteRecord>;
    APP_SHOW?: Array<FavoriteRecord>;
  };
}

type KintoneAPIResult = {
  apps: Array<FavoriteAppRecord>;
  search: Array<FavoriteRecord>;
  other: Array<FavoriteRecord>;
};