import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {ScrollView, View} from 'react-native';
import styled from 'styled-components/native';

const Container = styled.View<any>`
  display: flex;
  flex: 1;
  width: 100%;
  background: #101111;
`;

const Content = styled.View`
  display: flex;
  flex: 1;
  align-items: center;
`;
const Avatar = styled.Image`
  width: 160px;
  height: 160px;
  border-radius: 140px;
  margin: 10px;
  margin-bottom: 30px;
  margin-top: 40px;
`;

const AvatarAndNameContent = styled.View`
  display: flex;
  align-items: center;
  width: 90%;
`;

const InformationsContent = styled.View`
  display: flex;
  display: flex;
  padding: 20px;
  margin: 10px;
  width: 95%;
  border-radius: 10px;
`;

const FollowsContent = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding: 20px;
  margin: 10px;
  width: 90%;
  border-radius: 10px;
`;

const Span = styled.Text``;

const TitleName = styled.Text`
  font-size: 25px;
  color: white;
  text-transform: capitalize;

  margin-bottom: 20px;
`;

const Text = styled.Text`
  font-size: 18px;
  color: white;
  text-transform: capitalize;
`;

const Navigation = styled.TouchableOpacity`
  display: flex;
  align-items: center;
  height: 50px;
  width: 100%;
  flex-direction: row;
  margin-top: 20px;
`;

const Image = styled.Image`
  height: 30px;
  width: 30px;
`;

interface User {
  id: 1329626;
  avatar_url: string;
  name: string;
  company: string;
  location: string;
  email: string;
  bio: string;
  twitter_username: string;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
}
const Profile: React.FC = ({navigation}: any) => {
  const [user, setUser] = useState({} as User);
  const baseURL: string = 'https://api.github.com';
  useEffect(() => {
    const getUser = async () => {
      const {data} = await axios.get(`${baseURL}/users/sibelius`);
      setUser(data);
    };
    getUser();
  }, []);
  return (
    <Container>
      <Navigation onPress={() => navigation.goBack()}>
        <Image
          source={{
            uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Antu_arrow-left.svg/1024px-Antu_arrow-left.svg.png',
          }}
        />
        <Text>Go Back</Text>
      </Navigation>

      <ScrollView>
        <Content>
          <AvatarAndNameContent>
            <Avatar
              source={{
                uri: `${user?.avatar_url}`,
              }}
            />

            <TitleName>{user?.name ? user?.name : 'No Name'}</TitleName>
          </AvatarAndNameContent>

          <FollowsContent>
            <View>
              <Span>Followers</Span>
              <Text style={{textAlign: 'center'}}>{user?.followers}</Text>
            </View>
            <View>
              <Span>Following</Span>
              <Text style={{textAlign: 'center'}}>{user?.following}</Text>
            </View>
          </FollowsContent>
          <InformationsContent>
            <Span>Bio</Span>
            <Text>{user?.bio ? user?.bio : 'No Bio'}</Text>
          </InformationsContent>
          <InformationsContent>
            <Span>Twitter</Span>
            <Text
              style={{
                textTransform: user?.twitter_username
                  ? 'lowercase'
                  : 'capitalize',
              }}>
              {user?.twitter_username
                ? `@${user?.twitter_username}`
                : 'No Twitter'}
            </Text>
          </InformationsContent>

          <InformationsContent>
            <Span>Location</Span>
            <Text>{user?.location ? user?.location : 'No Location'}</Text>
          </InformationsContent>

          <InformationsContent>
            <Span>Email</Span>
            <Text>{user?.email ? user?.email : 'No Email'}</Text>
          </InformationsContent>
          <InformationsContent>
            <Span>Company</Span>
            <Text>{user?.company ? user?.company : 'No Company'}</Text>
          </InformationsContent>

          <InformationsContent>
            <Span>Public Gists</Span>
            <Text> {user?.public_gists ? user?.public_gists : 0}</Text>
          </InformationsContent>
          <InformationsContent>
            <Span>Public Repos</Span>
            <Text> {user.public_repos ? user?.public_repos : 0}</Text>
          </InformationsContent>
          <InformationsContent>
            <Span>Id</Span>
            <Text>{user?.id ? user?.id : 'No Id'}</Text>
          </InformationsContent>
        </Content>
      </ScrollView>
    </Container>
  );
};

export default Profile;
