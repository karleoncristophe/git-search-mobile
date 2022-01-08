import {useNavigation} from '@react-navigation/native';
import React, {useContext, useEffect, useState} from 'react';
import {ActivityIndicator, FlatList} from 'react-native';
import styled from 'styled-components/native';
import {UsersContext} from '../context/UsersContext';

const Container = styled.View<any>`
  display: flex;
  flex: 1;
  width: 100%;
  justify-content: ${p => (p.search.length !== 0 ? 'flex-start' : 'center')};
  padding-top: 20px;
  background: #101111;
`;

const TitleAndAvatarContent = styled.View<any>`
  margin: 20px;
  margin-bottom: 20px;
  display: ${p => (p.search.length !== 0 ? 'none' : 'flex')};
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Avatar = styled.Image`
  width: 70px;
  height: 70px;
  border-radius: 10px;
`;

const Title = styled.Text`
  font-size: 25px;
  font-weight: 600;
  color: white;
  width: 250px;
`;

const Text = styled.Text`
  font-size: 25px;
  color: white;
  text-transform: capitalize;
`;

const TextAndSearchContent = styled.View`
  margin-top: 35px;
  margin: 20px;
  margin-bottom: 0px;
  display: flex;
  flex-direction: row;
  align-items: center;
  background: #52b788;
  height: 60px;
  overflow: hidden;
  border-radius: 10px;
`;

const Input = styled.TextInput`
  flex: 1;
  font-size: 17px;
  display: flex;
  color: black;
  padding-right: 20px;
  height: 100%;
`;

const Button = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 70px;
`;

const Navigation = styled.TouchableOpacity``;

const ImageButton = styled.Image`
  width: 25px;
  height: 25px;
`;

const ListViewContent = styled(FlatList)`
  flex: 1;
  margin-top: 30px;
  display: flex;
`;

const ListView = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background: #52b788;
  display: flex;
  padding: 10px;
  margin: 20px;
  border-radius: 10px;
`;

const Informations = styled.View`
  display: flex;
`;

const Home: React.FC = () => {
  const [search, setSearch] = useState('');
  const [filteredUSers, setFilteredUsers] = useState<any>([]);
  const {users, loading, getUserRepos} = useContext(UsersContext);
  const navigation = useNavigation<any>();

  useEffect(() => {
    setFilteredUsers(
      // @ts-ignore
      users.filter((get: any) => {
        return get.login.toLowerCase().includes(search.toLocaleLowerCase());
      }),
    );
  }, [search, users]);

  return (
    <Container search={search}>
      <TitleAndAvatarContent search={search}>
        <Title ellipsizeMode="tail" numberOfLines={2}>
          Hello, Karleon 👋
        </Title>
        <Avatar
          source={{
            uri: 'https://pbs.twimg.com/profile_images/1440826619988307972/N7Jmx4qv_400x400.jpg',
          }}
        />
      </TitleAndAvatarContent>
      <TextAndSearchContent>
        <Button>
          <ImageButton
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/512/64/64673.png',
            }}
          />
        </Button>
        <Input
          value={search}
          onChangeText={e => setSearch(e)}
          placeholder="Find your friends on GitHub"
          placeholderTextColor="#000"
        />
      </TextAndSearchContent>

      <ListViewContent
        data={filteredUSers}
        keyExtractor={(item, index) => item + index.toString()}
        onEndReached={getUserRepos}
        onEndReachedThreshold={0.1}
        ListFooterComponent={<FooterList load={loading} />}
        renderItem={({item}: any) => (
          <Navigation
            onPress={() => navigation.navigate('Profile', {name: item.login})}>
            <ListView>
              <Informations>
                <Text ellipsizeMode="tail" numberOfLines={2}>
                  {item.login}
                </Text>
                <Text>{item.id}</Text>
              </Informations>
              <Avatar
                source={{
                  uri: `${item.avatar_url}`,
                }}
              />
            </ListView>
          </Navigation>
        )}
      />
    </Container>
  );
};

const Loading = styled.View`
  margin: 10px;
`;

interface Props {
  load: boolean;
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function FooterList({load}: Props) {
  return (
    <Loading>
      <ActivityIndicator size={40} color="#52b788" />
    </Loading>
  );
}

export default Home;
