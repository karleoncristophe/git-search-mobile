import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, View} from 'react-native';
import styled from 'styled-components/native';

const Container = styled.View<any>`
  display: flex;
  flex: 1;
  width: 100%;
  justify-content: ${p => (p.search.length !== 0 ? 'flex-start' : 'center')};
  padding-top: 20px;
`;

const TitleAndAvatarContent = styled.View<any>`
  margin: 20px;
  margin-bottom: 0px;
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

interface Users {
  user: {
    login: string;
    avatar_url: string;
    id: number;
  };
}

const Home: React.FC = () => {
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState<Users[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const baseURL: string = 'https://api.github.com';
  const perPage: number = 100;

  const getUserRepos = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    const {data} = await axios.get(
      `${baseURL}/repositories/8514/issues?page=${page}&per_page=${perPage}`,
    );
    setUsers([...users, ...data]);
    setPage(page + 1);
    setLoading(false);
    console.log(data);
  };

  useEffect(() => {
    getUserRepos();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
        data={users}
        keyExtractor={(item, index) => item + index.toString()}
        onEndReached={getUserRepos}
        onEndReachedThreshold={0.1}
        ListFooterComponent={<FooterList load={loading} />}
        renderItem={({item}: any) => (
          <ListView>
            <Informations>
              <Text>{item.user.login}</Text>
              <Text>{item.user.id}</Text>
            </Informations>
            <Avatar
              source={{
                uri: `${item.user.avatar_url}`,
              }}
            />
          </ListView>
        )}
      />
    </Container>
  );
};

interface Props {
  load: boolean;
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function FooterList({load}: Props) {
  return (
    <View>
      <ActivityIndicator size={25} color="#52b788" />
    </View>
  );
}

export default Home;
