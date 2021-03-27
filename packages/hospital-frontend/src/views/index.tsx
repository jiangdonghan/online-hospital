import React, { useState, useEffect } from "react";

const useUsers = () => {
  const [users, setUsers] = useState([]);

  const fetchUsersAndUpdate = async () => {
    const response = await fetch("http://localhost:5099/apis/users", {
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

  console.log(users);

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
