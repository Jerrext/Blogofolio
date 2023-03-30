import React, { useEffect, useState } from "react";
import Title from "../../components/Title";
import Tabs, { TabsNames } from "../../components/Tabs";
import CardsList from "../../components/CardsList";
import { CardType } from "../../components/Card";
import { useDispatch, useSelector } from "react-redux";
import {
  LikeStatus,
  PostSelectors,
  setPostVisibility,
  setSelectedPost,
  setStatus,
} from "../../redux/reducers/postSlice";
import PostModalWindow from "../../components/PostModalWindow";
import PostVisibilityProvider from "../../context/PostVisibility/Provider";

const MOCK_ARRAY = [
  {
    id: 0,
    image:
      "https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg",
    text: "0Astronauts Kayla Barron and Raja Chari floated out of the International Space Station airlock for a spacewalk Tuesday, installing brackets and struts to support new solar arrays to upgrade the research lab’s power system on the same day that crewmate Mark Vande Hei marked his 341st day in orbit, a U.S. record for a single spaceflight.",
    date: "12-10-2023",
    lesson_num: 12,
    title:
      "Astronauts prep for new solar arrays on nearly seven-hour spacewalk ...",
    description: "Описание поста",
    author: 10,
  },
  {
    id: 1,
    image:
      "https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg",
    text: "1Astronauts Kayla Barron and Raja Chari floated out of the International Space Station airlock for a spacewalk Tuesday, installing brackets and struts to support new solar arrays to upgrade the research lab’s power system on the same day that crewmate Mark Vande Hei marked his 341st day in orbit, a U.S. record for a single spaceflight.",
    date: "12-10-2023",
    lesson_num: 12,
    title:
      "Astronauts prep for new solar arrays on nearly seven-hour spacewalk ...",
    description: "Описание поста",
    author: 10,
  },
  {
    id: 2,
    image:
      "https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg",
    text: "2Astronauts Kayla Barron and Raja Chari floated out of the International Space Station airlock for a spacewalk Tuesday, installing brackets and struts to support new solar arrays to upgrade the research lab’s power system on the same day that crewmate Mark Vande Hei marked his 341st day in orbit, a U.S. record for a single spaceflight.",
    date: "12-10-2023",
    lesson_num: 12,
    title:
      "Astronauts prep for new solar arrays on nearly seven-hour spacewalk ...",
    description: "Описание поста",
    author: 10,
  },
  {
    id: 3,
    image:
      "https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg",
    text: "3Astronauts Kayla Barron and Raja Chari floated out of the International Space Station airlock for a spacewalk Tuesday, installing brackets and struts to support new solar arrays to upgrade the research lab’s power system on the same day that crewmate Mark Vande Hei marked his 341st day in orbit, a U.S. record for a single spaceflight.",
    date: "12-10-2023",
    lesson_num: 12,
    title:
      "Astronauts prep for new solar arrays on nearly seven-hour spacewalk ...",
    description: "Описание поста",
    author: 10,
  },
  {
    id: 4,
    image:
      "https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg",
    text: "4Astronauts Kayla Barron and Raja Chari floated out of the International Space Station airlock for a spacewalk Tuesday, installing brackets and struts to support new solar arrays to upgrade the research lab’s power system on the same day that crewmate Mark Vande Hei marked his 341st day in orbit, a U.S. record for a single spaceflight.",
    date: "12-10-2023",
    lesson_num: 12,
    title:
      "Astronauts prep for new solar arrays on nearly seven-hour spacewalk ...",
    description: "Описание поста",
    author: 10,
  },
  {
    id: 5,
    image:
      "https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg",
    text: "5Astronauts Kayla Barron and Raja Chari floated out of the International Space Station airlock for a spacewalk Tuesday, installing brackets and struts to support new solar arrays to upgrade the research lab’s power system on the same day that crewmate Mark Vande Hei marked his 341st day in orbit, a U.S. record for a single spaceflight.",
    date: "12-10-2023",
    lesson_num: 12,
    title:
      "Astronauts prep for new solar arrays on nearly seven-hour spacewalk ...",
    description: "Описание поста",
    author: 10,
  },
  {
    id: 6,
    image:
      "https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg",
    text: "6Astronauts Kayla Barron and Raja Chari floated out of the International Space Station airlock for a spacewalk Tuesday, installing brackets and struts to support new solar arrays to upgrade the research lab’s power system on the same day that crewmate Mark Vande Hei marked his 341st day in orbit, a U.S. record for a single spaceflight.",
    date: "12-10-2023",
    lesson_num: 12,
    title:
      "Astronauts prep for new solar arrays on nearly seven-hour spacewalk ...",
    description: "Описание поста",
    author: 10,
  },
  {
    id: 7,
    image:
      "https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg",
    text: "7Astronauts Kayla Barron and Raja Chari floated out of the International Space Station airlock for a spacewalk Tuesday, installing brackets and struts to support new solar arrays to upgrade the research lab’s power system on the same day that crewmate Mark Vande Hei marked his 341st day in orbit, a U.S. record for a single spaceflight.",
    date: "12-10-2023",
    lesson_num: 12,
    title:
      "Astronauts prep for new solar arrays on nearly seven-hour spacewalk ...",
    description: "Описание поста",
    author: 10,
  },
  {
    id: 8,
    image:
      "https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg",
    text: "8Astronauts Kayla Barron and Raja Chari floated out of the International Space Station airlock for a spacewalk Tuesday, installing brackets and struts to support new solar arrays to upgrade the research lab’s power system on the same day that crewmate Mark Vande Hei marked his 341st day in orbit, a U.S. record for a single spaceflight.",
    date: "12-10-2023",
    lesson_num: 12,
    title:
      "Astronauts prep for new solar arrays on nearly seven-hour spacewalk ...",
    description: "Описание поста",
    author: 10,
  },
  {
    id: 9,
    image:
      "https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg",
    text: "9Astronauts Kayla Barron and Raja Chari floated out of the International Space Station airlock for a spacewalk Tuesday, installing brackets and struts to support new solar arrays to upgrade the research lab’s power system on the same day that crewmate Mark Vande Hei marked his 341st day in orbit, a U.S. record for a single spaceflight.",
    date: "12-10-2023",
    lesson_num: 12,
    title:
      "Astronauts prep for new solar arrays on nearly seven-hour spacewalk ...",
    description: "Описание поста",
    author: 10,
  },
  {
    id: 10,
    image:
      "https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg",
    text: "10Astronauts Kayla Barron and Raja Chari floated out of the International Space Station airlock for a spacewalk Tuesday, installing brackets and struts to support new solar arrays to upgrade the research lab’s power system on the same day that crewmate Mark Vande Hei marked his 341st day in orbit, a U.S. record for a single spaceflight.",
    date: "12-10-2023",
    lesson_num: 12,
    title:
      "Astronauts prep for new solar arrays on nearly seven-hour spacewalk ...",
    description: "Описание поста",
    author: 10,
  },
  {
    id: 11,
    image:
      "https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg",
    text: "11Astronauts Kayla Barron and Raja Chari floated out of the International Space Station airlock for a spacewalk Tuesday, installing brackets and struts to support new solar arrays to upgrade the research lab’s power system on the same day that crewmate Mark Vande Hei marked his 341st day in orbit, a U.S. record for a single spaceflight.",
    date: "12-10-2023",
    lesson_num: 12,
    title:
      "Astronauts prep for new solar arrays on nearly seven-hour spacewalk ...",
    description: "Описание поста",
    author: 10,
  },
];

const TABS_LIST = [
  {
    title: "All",
    disabled: false,
    key: TabsNames.All,
  },
  {
    title: "My favorites",
    disabled: false,
    key: TabsNames.Favorites,
  },
  {
    title: "Popular",
    disabled: false,
    key: TabsNames.Popular,
  },
];

const Home = () => {
  const [cardsList, setCardsList] = useState<CardType[]>([]);
  const [activeTab, setActiveTab] = useState(TabsNames.All);

  const dispatch = useDispatch();

  const onChangePostVisibility = (
    post: CardType | null,
    isPostOpened: boolean
  ) => {
    dispatch(setPostVisibility(isPostOpened));
    dispatch(setSelectedPost(post));
  };

  const onChangeStatus = (status: LikeStatus, card: CardType) => {
    dispatch(setStatus({ status, card }));
  };

  const isPostOpened = useSelector(PostSelectors.getPostVisibility);
  const post = useSelector(PostSelectors.getPostValue);
  const likedPosts = useSelector(PostSelectors.getLikedPosts);
  const dislikedPosts = useSelector(PostSelectors.getDislikedPosts);

  const onTabClick = (key: TabsNames) => setActiveTab(key);

  useEffect(() => {
    setCardsList(MOCK_ARRAY);
  }, [MOCK_ARRAY]);

  return (
    <PostVisibilityProvider
      postVisibility={isPostOpened}
      onChangePostVisibility={onChangePostVisibility}
      onChangeStatus={onChangeStatus}
      likedPosts={likedPosts}
      dislikedPosts={dislikedPosts}
    >
      <Title title={"Blog"} />
      <Tabs tabsList={TABS_LIST} onClick={onTabClick} activeTab={activeTab} />
      <CardsList cardsList={cardsList} />
      {post && <PostModalWindow post={post} />}
    </PostVisibilityProvider>
  );
};

export default Home;
