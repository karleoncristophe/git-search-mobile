import axios from 'axios';
import React, {createContext, ReactNode, useEffect, useState} from 'react';

interface Users {
  login: string;
  avatar_url: string;
  id: number;
}

type UsersContextValue = {
  users: Users[] | undefined;
  loading: boolean;
  setUsers: (data: Users[]) => void;
  getUserRepos: () => void;
};

interface Props {
  children: ReactNode;
}

export const UsersContext = createContext({} as UsersContextValue);

const UsersProvider = (props: Props) => {
  const [users, setUsers] = useState<Users[]>([]);

  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const baseURL: string = 'https://api.github.com';
  const perPage: number = 20;

  const getUserRepos = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    const {data} = await axios.get(
      `${baseURL}/users/Intrepidd/followers?page=${page}&per_page=${perPage}`,
    );

    setUsers([...users, ...data]);
    setPage(page + 1);
    setLoading(false);
  };

  useEffect(() => {
    getUserRepos();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <UsersContext.Provider value={{users, setUsers, getUserRepos, loading}}>
      {props.children}
    </UsersContext.Provider>
  );
};

export default UsersProvider;
