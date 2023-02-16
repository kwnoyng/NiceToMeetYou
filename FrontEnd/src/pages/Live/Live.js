/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import API_URL from '../../api/api';
import Header from '../../components/common/Header';
import Nav from '../../components/common/Nav';
import {
  liveListAtom,
  timetableShelterIdAtom,
  roomNumberAtom,
  userAtom,
} from '../../recoilState';
import '../../styles/fonts.css';
import CreateLive from '../../images/Video/CreateLive.png';
import cat1 from '../../images/dummy/cat1.png';
import * as S from './LiveStyle';

const SContainer = styled.div`
  ul {
    margin: auto;
  }
`;

const SLiveHeader = styled.div`
  display: flex;
  padding: 1.5rem;
  justify-content: space-between;
  font-family: mainFont;
`;

const STitle = styled.div`
  font-size: 2.4rem;
  /* width: 30%;
  font-size: 1.6rem;
  margin: auto;
  border-radius: 15px 15px 15px 0;
  border-bottom: 5px solid #b9c4c4;
  padding: 1rem 2.5rem;
  background: #cedada;
  margin-top: 1rem;
  margin-bottom: 1rem;
  text-align: center; */
`;
const SLiveCreateImg = styled.img`
  height: 2rem;
  color: red;
  /* background-color: green;
  height: 2.5rem;
  border: 1px solid green;
  border-radius: 15%;
  font-size: 1.1rem;
  color: white; */
`;

const SLiveContainer = styled.div`
  a {
    text-decoration: none;
    color: black;
  }
`;
const SLiveItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 2rem;
  border: 1px solid black;
`;
const SLiveImgBox = styled.div`
  width: 34%;
  height: 6rem;
  border: 1px solid black;
  background-color: yellow;
`;
const SLiveContentBox = styled.div`
  width: 66%;
  height: 6rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: beige;
`;
const SLiveImg = styled.img``;

const SLiveTitle = styled.div`
  font-size: 1.2rem;
  margin-top: 0.5rem;
  margin-left: 0.5rem;
`;
const SLiveShelter = styled.div`
  font-size: 1rem;
  margin-bottom: 0.5rem;
  margin-right: 0.5rem;
  text-align: right;
`;

const SLink = styled(Link)`
  padding: 3% 5% 3% 5%;
  color: black;
  text-decoration: none;
`;

function Live() {
  const today = new Date();
  const payloadRoomNumber = today.getTime();

  const user = useRecoilValue(userAtom);
  const [liveList, setLiveList] = useRecoilState(liveListAtom);
  const [timetableShelterId, setTimetableShelterId] = useRecoilState(
    timetableShelterIdAtom,
  );
  const [thumbnailImages, setThumbnailImages] = useState([]);
  const [lifeInfo, setLifeInfo] = useState([]);
  const [roomNumberInfo, setRoomNumberInfo] = useRecoilState(roomNumberAtom);

  // const [liveInfo,setLiveInfo] = useState([]);

  // tempLiveInfo.forEach(liveId => {
  //   axios.get(`${API_URL}/${liveId}/image`).then(res => tempImgList.push(res));
  // });
  // console.log(tempImgList);
  const handleClickLive = id => {
    setTimetableShelterId(id);
  };
  // console.log(liveList);
  useEffect(async () => {
    await axios.get(`${API_URL}/live/all`).then(res => {
      setLiveList(res.data.data);
    });
  }, []);

  const saveRoomNumber = l => {
    console.log(l.room);
    setRoomNumberInfo(l.room);
    // setRoomNumberAtom
  };

  return (
    <>
      <Header />
      <SLiveHeader>
        <STitle>라이브</STitle>
        {user.role === 'HOST' ? (
          <Link to="/livechat" state={{ roomNumber: payloadRoomNumber }}>
            <SLiveCreateImg src={CreateLive} alt="CreateLive" />
          </Link>
        ) : null}
      </SLiveHeader>
      <S.LiveListContainer>
        {liveList.map((live, index) => (
          <SLink to="/livechat" key={index} state={{ roomNumber: live.room }}>
            <S.LiveItemContainer
              className={live.room}
              onClick={() => saveRoomNumber(live)}
            >
              <S.LiveImage src={cat1} alt="ThumbnailImage" />
              <S.LiveInformationContainer>
                <S.LiveTitle>{live.title}</S.LiveTitle>
                <S.ShelterName>{live.shelterName}</S.ShelterName>
              </S.LiveInformationContainer>
            </S.LiveItemContainer>
          </SLink>
        ))}
      </S.LiveListContainer>

      <Nav />
    </>
  );
}
export default Live;
