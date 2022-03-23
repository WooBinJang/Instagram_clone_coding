import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function makeToTimeNum(time) {
  return String(time).padStart(2, '0');
}

function makeFeedTime(timestamp) {
  const feedDate = new Date(timestamp);
  const nowDate = Date.now(); // 현재시간
  const hour = feedDate.getHours();
  const min = feedDate.getMinutes();
  const oneDay = 1000 * 60 * 60 * 24; //86400000
  const timeGap = nowDate - timestamp;
  console.log(timeGap);
  const date = Math.floor(timeGap / oneDay);
  return `${hour >= 12 ? '오후' : '오전'} ${
    hour > 12 ? makeToTimeNum(hour - 12) : makeToTimeNum(hour)
  } : ${makeToTimeNum(min)} , ${date === 0 ? '오늘' : date === 1 ? '어제' : ` ${date}일전`}`;
}

const Feed = ({ feed: { context, image }, profile: { uid }, timestamp }) => {
  const [userImage, setUserImage] = useState(undefined);
  const session = useSelector((state) => state.auth.session);

  const getUserProfileImageFromServer = useCallback(() => {
    if (session) {
      const { uid } = session;
      let url = `https://us-central1-sns-service-db71d.cloudfunctions.net/clientApi/user/profile/image`;
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          'Allow-Control-Access-Origin': '*'
        },
        body: JSON.stringify({
          uid
        })
      })
        .then((res) => res.json().then(({ image }) => setUserImage(image)))
        .catch((err) => {
          console.log(err);
        });
    }
  }, [session]);

  useEffect(() => {
    getUserProfileImageFromServer();
  }, [getUserProfileImageFromServer]);

  return (
    <div className="feed">
      <div className="top">
        <div
          className="profile-image"
          style={userImage && { backgroundImage: `url(${userImage})` }}
        ></div>
        <div className="profile-desc">
          <div className="nickname txt-bold">{session ? session.displayName : 'userName'} </div>
          <div className="timestamp">{makeFeedTime(timestamp)}</div>
        </div>
      </div>
      <div className="contents">
        {context}
        {image && <div className="image" style={{ backgroundImage: `url(${image})` }}></div>}
      </div>
      <div className="bottom">
        <div className="like">
          <div className="asset">
            <img src="/assets/feed/like-dac.svg" alt="좋아요" />
          </div>
          <div className="count txt-bold">25k</div>
        </div>
        <div className="comment">
          <div className="asset">
            <img src="/assets/feed/comment.svg" alt="댓글" />
          </div>
          <div className="count">25k</div>
        </div>
      </div>
    </div>
  );
};

export default Feed;
