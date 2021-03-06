import firebaseApp from '@config/firebaseApp';
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Feed from '../Feed/Feed';
import './css/index.css';
const Fstorage = firebaseApp.storage();
const Fdatabase = firebaseApp.database();

function Profile() {
  const [userImage, setUserImage] = useState(undefined);
  const session = useSelector((state) => state.auth.session);
  const [feeds, setFeeds] = useState([]);
  // 현재 유저의 피드를 받아오는 요청 함수
  const getUserFeed = useCallback(() => {
    if (session) {
      const { uid } = session;
      let url = `https://us-central1-sns-service-db71d.cloudfunctions.net/clientApi/user/feed`;
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
        .then((res) => res.json())
        .then(({ feed, msg }) => {
          setFeeds(feed.reverse());
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [session]);
  //서버에 프로필 이미지 정보 요청 함수
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
    getUserFeed();
  }, [getUserProfileImageFromServer, getUserFeed]);

  //스토리지의 이미지를 데이터 베이스에 저장하는 함수
  const uploadImageToDatabase = useCallback((uid, url) => {
    Fdatabase.ref(`users/${uid}/profile/image`)
      .set(url)
      .then(() => {
        alert('데이터 베이스에 프로필 이미지를 저장하였습니다.');
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //스토리지에 업로드하는 함수
  const uploadImageToStorge = useCallback(
    (data) => {
      if (session) {
        const { uid } = session;
        Fstorage.ref(`user/${uid}/profile.jpg`)
          .putString(data.split(',')[1], 'base64', {
            contentType: 'image/jpg'
          })
          .then((snapshot) => {
            snapshot.ref
              .getDownloadURL()
              .then((url) => {
                uploadImageToDatabase(uid, url);
                alert('프로필 사진 업로드');
                console.log(url);
              })
              .catch((err) => {
                console.log(err);
              });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    [session]
  );

  // 이미지 가져오는 함수
  const getImage = useCallback(
    (e) => {
      const filelist = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        setUserImage(e.target.result);
        uploadImageToStorge(e.target.result);
      }; // 파일을 다 읽어 오면
      reader.readAsDataURL(filelist);
    },
    [uploadImageToStorge]
  );
  return (
    <div className="profile">
      <div className="wrapper">
        <div className="info">
          <div
            className="profile-image"
            style={userImage && { backgroundImage: `url(${userImage})` }}
          >
            <input type="file" onChange={getImage} />
          </div>
          <div className="profile-desc">
            <div className="nickname txt-bold">{session ? session.displayName : 'userName'}</div>
          </div>
        </div>
        {/* info */}

        <div className="profile-contents">
          <div className="feed-list">
            <div className="title txt-bold">작성한 글</div>
            <div className="feeds">
              {feeds.map((item, idx) => {
                return <Feed key={idx} {...item} />;
              })}
            </div>
            {/* feeds */}
          </div>
          {/* feed-list */}
          <div className="profile-info-desc">
            <div className="desc">
              <div className="title txt-bold">좋아요</div>
              <div className="count">0</div>
            </div>
            {/*desc  */}
            <div className="desc">
              <div className="title txt-bold">팔로워</div>
              <div className="count">0</div>
            </div>
            {/*desc  */}
            <div className="desc">
              <div className="title txt-bold">포스트</div>
              <div className="count">{feeds.length}</div>
            </div>
            {/*desc  */}
            <div className="desc">
              <div className="title txt-bold">친구</div>
              <div className="count">0</div>
            </div>
            {/*desc  */}
          </div>{' '}
          {/* profile-info-desc */}
        </div>
        {/* profile-contents */}
      </div>
    </div>
  );
}

export default Profile;
