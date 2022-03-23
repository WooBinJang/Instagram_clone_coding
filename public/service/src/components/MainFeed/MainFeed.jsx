import firebaseApp from '@config/firebaseApp';
import React, { useCallback, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import './css/index.css';

const Fstorage = firebaseApp.storage();

const uploadImageToStorage = (data, timestamp) => {
  return new Promise((resolve, reject) => {
    Fstorage.ref(`feed/${timestamp}/feed.jpg`)
      .putString(data.split(',')[1], 'base64', {
        contentType: 'image/jpg'
      })
      .then((snapshot) => {
        snapshot.ref.getDownloadURL().then((url) => {
          console.log('이미지 업로드 완료');
          resolve(url);
        });
      })
      .catch((err) => {
        reject(err);
      });
  });
};

function MainFeed() {
  const [context, setContext] = useState(undefined);
  const [feedImage, setFeedImage] = useState(undefined);
  const session = useSelector((state) => state.auth.session);
  const contextRef = useRef();

  const makeFeed = useCallback(
    async (e) => {
      e.preventDefault();
      if (session && (context || feedImage)) {
        const nowTime = Date.now();
        let downloadUrl;
        if (feedImage) {
          // 파이어베이스 스토리지에 업로드 후 업로드된 URL을 받아서 fetch로 값을 넘겨준다.
          downloadUrl = await uploadImageToStorage(feedImage, nowTime).catch((err) => {
            console.log(err);
          });
        }
        const { uid } = session;
        let url = 'https://us-central1-sns-service-db71d.cloudfunctions.net/clientApi/feed/new';
        fetch(url, {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
            'Allow-Control-Access-Origin': '*'
          },
          body: JSON.stringify({
            feed: {
              context,
              image: downloadUrl
            },
            profile: {
              uid
            },
            timestamp: nowTime
          })
        })
          .then((res) => res.json())
          .then(({ msg }) => {
            contextRef.current.value = '';
            alert(msg);
          })
          .catch((err) => {
            console.log(err);
          });
      } //if
    },
    [context, session, feedImage]
  );
  const getDataFromImage = useCallback((e) => {
    const filelist = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      setFeedImage(e.target.result);
    };
    reader.readAsDataURL(filelist);
  }, []);
  return (
    <div className="mainfeed">
      <div className="wrapper">
        <div className="feed-list">
          <form className="write-feed" onSubmit={makeFeed}>
            <div className="profile-image"></div>
            <div className="inp">
              <input
                type="text"
                placeholder="내용을 입력하세요"
                ref={contextRef}
                onChange={(e) => setContext(e.target.value)}
                on
              />
            </div>
            <div className="get-image">
              <label htmlFor="get-image-input">
                <img src="/assets/main/add-image.svg" alt="이미지추가하기" />
              </label>
              <input type="file" id="get-image-input" onChange={getDataFromImage} />
            </div>
          </form>{' '}
          {/* e:쓰기  */}
          <div className="feed">
            <div className="top">
              <div className="profile-image"></div>
              <div className="profile-desc">
                <div className="nickname txt-bold">wonhj</div>
                <div className="timestamp">08:15 pm , yesterday</div>
              </div>
            </div>
            <div className="contents">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis molestias
              inventore distinctio rerum earum autem voluptate optio architecto. Autem dolore nisi
              rerum maiores quis. Qui delectus enim harum sequi dolores.
            </div>
            <div className="bottom">
              <div className="like">
                <div className="asset">
                  <img src="/assets/feed/like-ac.svg" alt="좋아요" />
                </div>
                <div className="count txt-bold">25k</div>
              </div>

              <div className="comment">
                <div className="asset">
                  <img src="/assets/feed/comment.svg" alt="댓글" />
                </div>
                <div className="count txt-bold">60</div>
              </div>
            </div>
          </div>
          <div className="feed">
            <div className="top">
              <div className="profile image"></div>
              <div className="profile-desc">
                <div className="nickname txt-bold">wonhj</div>
                <div className="timestamp">08:15 pm , yesterday</div>
              </div>
            </div>
            <div className="contents">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis molestias
              inventore distinctio rerum earum autem voluptate optio architecto. Autem dolore nisi
              rerum maiores quis. Qui delectus enim harum sequi dolores.
              <div className="image"></div>
            </div>
            <div className="bottom">
              <div className="like">
                <div className="asset">
                  <img src="/assets/feed/like-ac.svg" alt="좋아요" />
                </div>
                <div className="count txt-bold">25k</div>
              </div>

              <div className="comment">
                <div className="asset">
                  <img src="/assets/feed/comment.svg" alt="댓글" />
                </div>
                <div className="count txt-bold">60</div>
              </div>
            </div>
          </div>
          <div className="feed">
            <div className="top">
              <div className="profile image"></div>
              <div className="profile-desc">
                <div className="nickname txt-bold">wonhj</div>
                <div className="timestamp">08:15 pm , yesterday</div>
              </div>
            </div>
            <div className="contents">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis molestias
              inventore distinctio rerum earum autem voluptate optio architecto. Autem dolore nisi
              rerum maiores quis. Qui delectus enim harum sequi dolores.
            </div>
            <div className="bottom">
              <div className="like">
                <div className="asset">
                  <img src="/assets/feed/like-ac.svg" alt="좋아요" />
                </div>
                <div className="count txt-bold">25k</div>
              </div>

              <div className="comment">
                <div className="asset">
                  <img src="/assets/feed/comment.svg" alt="댓글" />
                </div>
                <div className="count txt-bold">60</div>
              </div>
            </div>
          </div>
          <div className="feed">
            <div className="top">
              <div className="profile image"></div>
              <div className="profile-desc">
                <div className="nickname txt-bold">wonhj</div>
                <div className="timestamp">08:15 pm , yesterday</div>
              </div>
            </div>
            <div className="contents">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis molestias
              inventore distinctio rerum earum autem voluptate optio architecto. Autem dolore nisi
              rerum maiores quis. Qui delectus enim harum sequi dolores.
              <div className="image"></div>
            </div>
            <div className="bottom">
              <div className="like">
                <div className="asset">
                  <img src="/assets/feed/like-ac.svg" alt="좋아요" />
                </div>
                <div className="count txt-bold">25k</div>
              </div>

              <div className="comment">
                <div className="asset">
                  <img src="/assets/feed/comment.svg" alt="댓글" />
                </div>
                <div className="count txt-bold">60</div>
              </div>
            </div>
          </div>
        </div>
        {/* e:feed-list */}
        <div className="friend-list">
          <div className="my-profile">
            <div className="profile-image"></div>
            <div className="nickname"> hjwon </div>
          </div>
          {/* 마이프로필 */}
          <div className="my-friends">
            <div className="title txt-bold">친구 목록 리스트</div>
            <ul className="friend-list-wrapper">
              <li className="friend">
                <div className="profile-image"></div>
                <div className="nickname">미키마우스</div>
              </li>
              <li className="friend">
                <div className="profile-image"></div>
                <div className="nickname">미키마우스</div>
              </li>
              <li className="friend">
                <div className="profile-image"></div>
                <div className="nickname">미키마우스</div>
              </li>
              <li className="friend">
                <div className="profile-image"></div>
                <div className="nickname">미키마우스</div>
              </li>
              <li className="friend">
                <div className="profile-image"></div>
                <div className="nickname">미키마우스</div>
              </li>
            </ul>
          </div>
          {/* 프랜드목록 */}
        </div>
        {/* e:friend-list */}
      </div>
      {/*e:wrapper */}
    </div>
  );
}

export default MainFeed;
