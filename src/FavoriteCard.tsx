import React from 'react';

const FavoriteCard: React.FC<{record: FavoriteRecord}> = props =>
  <li
    className="favoritone-list"
    draggable="true"
    style={{ transition: "1s" }}
  >
    <a
      className="gaia-argoui-spacescrollinglist-item"
      href={String(props.record.url)}
    >
      <span
        className="gaia-argoui-spacescrollinglist-name"
        style={{pointerEvents: "none"}}
      >
        {props.record.title}
      </span>
    </a>
  </li>;

export default FavoriteCard;