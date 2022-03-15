import React from 'react'
import './css/index.css';

function Join() {
  return (
    <div className='join'>
     <div className='wrapper'>
      
        <h1 className='logo'>instagram</h1>
      
        <form className='join-contents'>
            <div className='email-inp custom-inp'>
                <div className='top'>
                   <div className='title txt-bold'>이메일</div>
                   <div className='warning'></div>
                </div>
                <div className='inp'>
                        <input type="email" placeholder='이메일을 입력해주세요' required />
                </div>
             </div>
             <div className='password-inp custom-inp'>
                 <div className='top'>
                  <div className='title txt-bold'>비밀번호</div>
                   <div className='warning'>비밀번호는 8자리 이상지정</div>
                 </div>
                 <div className='inp'>
                    <input type="password" placeholder='비밀번호를 8이상으로 지정하세요' required />
                 </div>
             </div>
             <div className='nickname-inp custom-inp'>
                 <div className='top'>
                  <div className='title txt-bold'>닉네임</div>
                   <div className='warning'>이미사용하고 있는 닉네임입니다.</div>
                 </div>
                 <div className='inp'>
                    <input type="text" placeholder='닉네임을 입력하세요' required />
                 </div>
             </div>
             <button type="submit" className='join-btn'>회원가입하기</button>
        </form>
     </div>
      
    </div>
  )
}

export default Join;
