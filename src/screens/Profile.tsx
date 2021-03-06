import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, ScrollView, View} from 'react-native';
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
  height: 80px;
  width: 100%;
  flex-direction: row;
  padding-left: 15px;
`;

const Image = styled.Image`
  height: 30px;
  width: 30px;
  margin-right: 10px;
`;

interface User {
  login?: string;
  id: number;
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

const Profile: React.FC = ({navigation, route}: any) => {
  const [user, setUser] = useState({} as User);
  const [loading, setLoading] = useState(false);
  const baseURL: string = `https://api.github.com/users/${route.params.name}`;
  useEffect(() => {
    const getUser = async () => {
      if (loading) {
        return;
      }
      setLoading(true);

      const {data} = await axios.get(`${baseURL}`);
      setUser(data);
      setLoading(false);
    };
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <>
      {loading === false ? (
        <Container>
          <Navigation onPress={() => navigation.goBack()}>
            <Image source={require('../assets/icons/arrow-left.png')} />
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
      ) : (
        <Load load={loading} />
      )}
    </>
  );
};

const LoadContet = styled.View`
  display: flex;
  flex: 1;
  justify-content: center;
  width: 100%;
  background: #101111;
`;

interface Props {
  load: boolean;
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function Load({load}: Props) {
  return (
    <LoadContet>
      <ActivityIndicator size={100} color="#52b788" />
    </LoadContet>
  );
}

export default Profile;
