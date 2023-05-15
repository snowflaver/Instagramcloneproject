import React, { useState } from "react";
import { Overlay, ModalWrap, Contents, ImageDiv, LeftContainer, ImagePreview, ImageBox, Bodybox, Writebox } from "./styles";
import { Textbutton } from "../common/textbutton";
import { useQuery } from "react-query";
import { getDetailBoard } from "../../api/board";
import { useNavigate } from "react-router-dom";
import { Nickname, Nicknamecontainer } from "../feedcard/styles";
import { Userinfobox } from "../feedcard/styles";
import { Profilephoto } from "../feedcard/styles";
import { Datetime } from "../feedcard/styles";

function ReadModal({ postId }) {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(true);
  const [image, setImage] = useState(null);

  const handleClose = () => {
    setIsOpen(!isOpen);
  };

  const { isLoading, isError, data } = useQuery(["getDetailBoard", postId], () => getDetailBoard(postId));

  if (isLoading) {
    return <div>로딩중입니다...</div>;
  }

  if (isError) {
    return <div>오류가 발생했습니다.</div>;
  }

  console.log(data)
  // {id: 2, contents: 'json-server', nickname: 'test2', img: '/card2.jpg'}

  return (
    <>
      {isOpen ?
        <Overlay>
          <ModalWrap>
            <Contents>
              <ImageDiv style={{
                backgroundImage: `url(${data.img})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}></ImageDiv>
              <Userinfobox>
                {/* 게시자 프로필 이미지 */}
                <Profilephoto ></Profilephoto>
                <Nicknamecontainer>
                  {/* 게시자 닉네임 */}
                  <Nickname>{data.nickname}</Nickname>
                  {/* 게시 시간 */}
                  <Datetime>작성 시간: {data.date || '연결실패'}</Datetime>
                </Nicknamecontainer>
              </Userinfobox>
              내용{data.contents}
              <LeftContainer
              >
              </LeftContainer>
              <Writebox>
              </Writebox>
              <Textbutton onClick={handleClose} >X</Textbutton>
            </Contents>
          </ModalWrap>
        </Overlay>
        : null}
    </>
  );
}

export default ReadModal;
