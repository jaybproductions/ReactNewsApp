import React from "react";
import firebase from "../../firebase";
import UserItem from "../Users/UserItem";
import UserContext from "../../contexts/UserContext";

const UsersList = (props) => {
  const [users, setUsers] = React.useState([]);
  const isTrending = props.location.pathname.includes("trending");
  const { user } = React.useContext(UserContext);

  React.useEffect(() => {
    const unsubscribe = getEvents();
    return () => unsubscribe();
    // eslint-disable-next-line
  }, [isTrending]);

  function getEvents() {
    return firebase.db
      .collection("users")

      .orderBy("name", "desc")
      .onSnapshot(handleSnapshot);
  }

  function handleSnapshot(snapshot) {
    const users = snapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });

    setUsers(users);
  }

  return (
    <>
      {users.length > 0 && (
        <>
          {users.map((user, index) => (
            <>
              <UserItem
                key={user.id}
                url={`/user/${user.id}`}
                user={user}
                index={index + 1}
              />
            </>
          ))}
        </>
      )}
    </>
  );
};

export default UsersList;
