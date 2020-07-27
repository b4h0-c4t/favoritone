import React, { useState, useEffect } from 'react';

import FavoriteCard from './FavoriteCard';
import BookmarkFetcher from './BookmarkFetcher';

const FavoriteList: React.FC = () => {
  const [favorite_list, favoriteListDispather] = useState<Array<FavoriteRecord>>([]);

  useEffect(() => {
    const local_storage_data = localStorage.getItem(`favoritone-${ document.location.hostname }`);
    const storaged_bookmark: Array<FavoriteRecord> = local_storage_data ? JSON.parse(local_storage_data) : [];

    BookmarkFetcher().then((res: KintoneAPIResult) => {
      const fetched_flat_records: Array<FavoriteRecord> = [
        ...res.apps.map((app: FavoriteAppRecord): Array<FavoriteRecord> => {
          let records: Array<FavoriteRecord> = [];
          if(app.list.APP_INDEX) records = [...records, ...app.list.APP_INDEX]
          if(app.list.APP_SHOW) records = [...records, ...app.list.APP_SHOW]
          return records;
        }).reduce((prev, cur) => [...prev, ...cur]),
        ...res.search,
        ...res.other,
      ];

      let new_favorite_records: Array<FavoriteRecord> = [];
      fetched_flat_records.forEach((fetched_record: FavoriteRecord) => {
        const found_index = storaged_bookmark.findIndex((storaged_record: FavoriteRecord) => fetched_record.url === storaged_record.url);
        if(found_index) new_favorite_records = [...new_favorite_records, fetched_record];
      });

      favoriteListDispather(fetched_flat_records);
    });
  }, []);

  return (
    <>
      { favorite_list.map((record: FavoriteRecord) => <FavoriteCard key={String(record.url)} record={ record } />) }
    </>
  );
};

export default FavoriteList;