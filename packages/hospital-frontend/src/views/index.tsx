import React, { useState, useEffect } from "react";

const apiUrl = process.env.REACT_APP_API_URL;

const useUsers = () => {
  const [users, setUsers] = useState([]);

  const fetchUsersAndUpdate = async () => {
    const response = await fetch(`${apiUrl}/apis/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    setUsers(result.elements);
  };

  useEffect(() => {
    fetchUsersAndUpdate();
  }, []);

  return users;
};

const UserList: React.FC = () => {
  const users = useUsers();
  return users.length ? (
    <div>
      {users.map((user: any) => {
        return <div key={user.id}>{`${user.name}:${user.email}`}</div>;
      })}
    </div>
  ) : (
    <div>no users</div>
  );
};

export default UserList;
