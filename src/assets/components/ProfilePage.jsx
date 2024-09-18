import React, { useEffect, useState } from "react";
import { getUsers } from "../../api";

const ProfilePage = ({ loggedInUsername }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getUsers()
      .then((users) => {
        console.log(users);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);
};

export default ProfilePage;
