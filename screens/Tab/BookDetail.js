import React from "react";
import styled from "styled-components";
import { useQuery } from "react-apollo-hooks";
import { SEARCH } from "../../gql/queries";
import { Text, ScrollView, Linking } from "react-native";
import Loader from "../../components/Loader";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import styles from "../../styles";

const Container = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;
const Img = styled.View`
  align-items: center;
`;
const Image = styled.Image`
  width: 130px;
  height: 180px;
  border-radius: 15px;
`;
const Link = styled.View`
  flex-direction: row;
  background-color: #00c73c;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  padding: 5px;
  border-radius: 5px;
`;
const Info = styled.View`
  margin: 20px;
`;
const Descript = styled.View`
  margin-top: 20px;
  padding: 10px;
  border-radius: 10px;
  background-color: ${styles.lightGreyColor};
`;
const Title = styled.Text`
  text-align: center;
  font-weight: bold;
  font-size: 17px;
  margin-top: 15px;
  margin-bottom: 15px;
`;
const TextRow = styled.View`
  flex-direction: row;
`;
const TextColumn = styled.View`
  margin-left: 10px;
`;
const Kind = styled.Text`
  opacity: 0.7;
`;
const Upload = styled.TouchableOpacity`
  flex-direction: row;
  margin-left: auto;
  padding: 15px;
  align-items: center;
  justify-content: center;
`;

export default ({ navigation }) => {
  const { loading, data } = useQuery(SEARCH, {
    variables: { term: navigation.getParam("isbn") }
  });
  const detail = data?.books[0];
  return (
    <ScrollView>
      {loading ? (
        <Loader />
      ) : (
        detail && (
          <Container>
            <Upload
              onPress={() =>
                navigation.navigate("Upload", { bookId: detail.isbn })
              }
            >
              <Text>글쓰러 가기 </Text>
              <MaterialCommunityIcons name="arrow-right" size={20} />
            </Upload>
            <Info>
              <Img>
                <Image
                  style={{ position: "absolute" }}
                  source={require("../../assets/noImage.png")}
                />
                {detail.image !== "" && (
                  <Image source={{ uri: detail.image }} />
                )}
                {detail.image === "" && (
                  <Image source={require("../../assets/noImage.png")} />
                )}
              </Img>
              <Title>{detail.title.replace(/&quot;/gi, '"')}</Title>
              <TextRow>
                <TextColumn>
                  <Kind>출판사</Kind>
                  <Kind>저자</Kind>
                  <Kind>정가</Kind>
                  <Kind>할인가</Kind>
                </TextColumn>
                <TextColumn>
                  <Text>{detail.publisher}</Text>
                  <Text>{detail.author}</Text>
                  <Text>{detail.price}</Text>
                  <Text>{detail.discount}</Text>
                </TextColumn>
              </TextRow>
              <Descript>
                <Text>{detail.description.replace(/&quot;/gi, '"')}</Text>
              </Descript>
              <Link>
                <MaterialCommunityIcons
                  name={"alpha-n-box"}
                  color={"white"}
                  size={30}
                />
                <Text
                  style={{ color: "white", fontSize: 15, fontWeight: "bold" }}
                  onPress={() => Linking.openURL(detail.link)}
                >
                  네이버 책으로 이동
                </Text>
              </Link>
            </Info>
          </Container>
        )
      )}
    </ScrollView>
  );
};
