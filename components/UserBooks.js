import React, { useState } from "react";
import styled from "styled-components";
import { useLogOut } from "../AuthContext";
import { Image, ScrollView, TouchableOpacity, Text } from "react-native";
import constants from "../constants";
import { withNavigation } from "react-navigation";
import styles from "../styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useMutation } from "react-apollo-hooks";
import { TOGGLE_FOLLOW } from "../gql/queries";

const View = styled.View`
  background-color: white;
  height: ${constants.height}px;
`;
const Top = styled.View`
  background-color: ${styles.blackColor};
  padding-bottom: 25px;
`;
const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
const Books = styled.View`
justify-content: space-between;
margin: 30px;
  flex-direction: row;
  flex-wrap: wrap;
`;
const Book = styled.View`
margin-bottom: 30px;
  border: 0px solid ${styles.blackColor};
  padding: 1px;
  border-bottom-width: 15px;
  border-right-width: 15px;
  border-bottom-left-radius: 15px;
  border-top-right-radius: 15px;
  background-color: ${styles.blackColor};
`;
const Profile = styled.View`
  justify-content: center;
  align-items: center;
  margin-left: 20px;
`;
const Name = styled.Text`
  font-size: 20px;
  color: white;
`;
const BioBox = styled.View`
  flex-direction: row;
  margin-top: 20px;
  align-items: center;
  justify-content: center;
  padding: 0 10px;
`;
const Bio = styled.Text`
  color: white;
  font-weight: bold;
  font-size: 15px;
`;
const ProfileStats = styled.View`
  flex-direction: row;
  justify-content: center;
`;
const Stat = styled.View`
  align-items: center;
  margin-left: 50px;
`;
const Num = styled.Text`
  font-size: 20px;
  color: white;
`;
const StatName = styled.Text`
  margin-top: 5px;
  font-size: 13px;
  color: white;
`;
const Date = styled.Text`
  background-color: white;
  width: 84px;
  padding: 5px;
  position: absolute;
  bottom: 15px;
  margin: auto;
  border: 1px solid ${styles.blackColor};
  color: black;
  font-size: 12px;
  text-align: center;
`;
const Stats = styled.View`
  align-items: center;
  margin-right: 10px;
`;
const Func = styled.View`
  justify-content: center;
  align-items: center;
  background-color: white;
  border-radius: 5px;
  padding: 3px 15px;
  margin-top: 10px;
`;
const FuncText = styled.Text`
  font-size: 11px;
`;

const UserBooks = ({
  id,
  name,
  bio,
  postsCount,
  followersCount,
  followingCount,
  posts,
  isSelf,
  isFollowing: isFollowingProp,
  navigation
}) => {
  const logOut = useLogOut();
  const [isFollowing, setIsFollowing] = useState(isFollowingProp);
  const [toggleFollowMtation] = useMutation(TOGGLE_FOLLOW, {
    variables: { id }
  });
  const handleFollow = async () => {
    setIsFollowing(p => !p);
    if (isFollowing) {
      setIsFollowing(false);
    } else {
      setIsFollowing(true);
    }
    try {
      await toggleFollowMtation();
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <View>
      <Top>
        <Header>
          <Profile>
            <Name>{name}</Name>
            {isSelf ? (
              <TouchableOpacity onPress={logOut}>
                <Func>
                  <FuncText>로그아웃</FuncText>
                </Func>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={handleFollow}>
                {isFollowing ? (
                  <Func>
                    <FuncText>언팔로우</FuncText>
                  </Func>
                ) : (
                  <Func>
                    <FuncText>팔로우</FuncText>
                  </Func>
                )}
              </TouchableOpacity>
            )}
          </Profile>
          <Stats>
            <ProfileStats>
              <Stat>
                <StatName>게시물</StatName>
                <Num>{postsCount}</Num>
              </Stat>
              <Stat>
                <StatName>팔로워</StatName>
                <Num>{followersCount}</Num>
              </Stat>
              <Stat>
                <StatName>팔로잉</StatName>
                <Num>{followingCount}</Num>
              </Stat>
            </ProfileStats>
          </Stats>
        </Header>
        {bio && (
          <BioBox>
            <MaterialCommunityIcons
              name="format-quote-open"
              color="white"
              size={30}
            />
            <Bio> {bio} </Bio>
            <MaterialCommunityIcons
              name="format-quote-close"
              color="white"
              size={30}
            />
          </BioBox>
        )}
      </Top>
      <ScrollView>
        <Books>
          {posts &&
            posts.map(post => (
              <Book key={post.id}>
                <TouchableOpacity
                  style={{
                    height: 116,
                    width: 82
                  }}
                  onPress={() =>
                    navigation.navigate("PostDetail", {
                      title: post.title,
                      id: post.id
                    })
                  }
                >
                  <Image
                    style={{
                      height: 116,
                      width: 82
                    }}
                    source={{ uri: post.book?.image }}
                  />
                </TouchableOpacity>
                <Date>{post.createdAt.substring(0, 10)}</Date>
              </Book>
            ))}
        </Books>
      </ScrollView>
    </View>
  );
};

export default withNavigation(UserBooks);
