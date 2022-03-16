import React from 'react'
import './css/index.css'

function MainFeed() {
  return (
    <div className='mainfeed'>
        <div className='wrapper'>
            <div className='feed-list'>
                <div className='write-feed'>
                     <div className='profile-image'></div>
                     <div className='inp'>
                         <input type="text" placeholder="내용을 입력하세요" />
                     </div>
                     <div className='get-image'>
                         <label htmlFor='get-image-input'>
                                 <img src="/assets/main/add-image.svg" alt="이미지추가하기" />
                         </label>
                         <input type="file" id="get-image-input" />
                     </div>
                </div>  {/* e:쓰기  */}
            </div>{/* e:feed-list */}
            <div className='friend-list'>
                <div className='my-profile'>
                     <div className='profile-image'></div>
                     <div className='nickname'> hjwon </div>
                </div>{/* 마이프로필 */}
                <div className='my-friends'>
                    <div className="title txt-bold">친구 목록 리스트</div>
                    <ul className='friend-list-wrapper'>
                        <li className='friend'>
                            <div className='profile-image'></div>
                            <div className='nickname'>미키마우스</div>
                        </li>
                        <li className='friend'>
                            <div className='profile-image'></div>
                            <div className='nickname'>미키마우스</div>
                        </li>
                        <li className='friend'>
                            <div className='profile-image'></div>
                            <div className='nickname'>미키마우스</div>
                        </li>
                        <li className='friend'>
                            <div className='profile-image'></div>
                            <div className='nickname'>미키마우스</div>
                        </li>
                        <li className='friend'>
                            <div className='profile-image'></div>
                            <div className='nickname'>미키마우스</div>
                        </li>
                    </ul>
                </div>{/* 프랜드목록 */}
            </div>{/* e:friend-list */}
        </div>{/*e:wrapper */}
    </div>
  )
}

export default MainFeed
