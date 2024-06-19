import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App() {
  const [friends, setFriends] = useState(initialFriends);
  //   const [openSplit, isOpenSplit] = useState(false);
  const [openAdd, isOpenAdd] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  //   function handleOpen() {
  //     isOpenSplit(!openSplit);
  //     console.log("A");
  //   }

  function handleAddFriend() {
    isOpenAdd(!openAdd);
  }

  function addFriends(newFriend) {
    setFriends((friend) => [...friend, newFriend]);
  }

  function handleSelect(fr) {
    // friends.map((friend) => (friend.id === id ? setSelectedUser(friend) : ""));
    setSelectedUser((cur) => (cur?.id === fr.id ? null : fr));
    console.log(selectedUser);
  }

  function handleSplitBill(value) {
    setFriends((friendos) =>
      friendos.map((fri) =>
        fri.id === selectedUser.id
          ? { ...fri, balance: fri.balance + value }
          : fri
      )
    );
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          friends={friends}
          handleSelect={handleSelect}
          selectedUser={selectedUser}
        />
        {openAdd && <FormAddFriend onSetFriends={addFriends} />}
        <Button onClick={handleAddFriend}>
          {" "}
          {!openAdd ? "Add friend" : "close"}
        </Button>
      </div>
      {selectedUser && <FormSplitBill handleSplitBill={handleSplitBill} />}
    </div>
  );
}

function FriendsList({ handleSelect, friends, selectedUser }) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend
          friend={friend}
          key={friend.id}
          handleSelect={handleSelect}
          selectedUser={selectedUser}
        />
      ))}
    </ul>
  );
}

function Friend({ friend, handleSelect, selectedUser }) {
  const isSelected = selectedUser?.id === friend.id;

  return (
    <li className={isSelected ? "selected" : ""}>
      <img src="" alt="user-pic" />
      <h3>{friend.name}</h3>
      {friend.balance > 0 && (
        <p style={{ color: "green" }}>
          {friend.name} owes you {friend.balance}$
        </p>
      )}
      {friend.balance < 0 && (
        <p style={{ color: "red" }}>
          you owe {friend.name} {Math.abs(friend.balance)}$
        </p>
      )}
      {friend.balance === 0 && <p>you and {friend.name} are even</p>}
      <Button onClick={() => handleSelect(friend)}>
        {isSelected ? "close" : "select"}
      </Button>
    </li>
  );
}

function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

function FormAddFriend({ onSetFriends }) {
  const [name, setName] = useState("");
  const [img, setImg] = useState("https://i.pravatar.cc/48");

  function handleAddFriend(e) {
    e.preventDefault();
    if (!name || !img) return;
    const id = crypto.randomUUID();
    const newFriend = {
      id,
      name,
      img: `${img}?=${id}`,
    };
    setName("");
    setImg("https://i.pravatar.cc/48");
    onSetFriends(newFriend);
  }

  return (
    <form className="form-add-friend" onSubmit={handleAddFriend}>
      <label>👫Friend name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label>🌄Image URL</label>
      <input
        type="text"
        value={img}
        onChange={(e) => setImg(e.target.value)}
        disabled
      />

      <Button> Add new friend </Button>
    </form>
  );
}

function FormSplitBill({ handleSplitBill }) {
  const [billValue, setBillValue] = useState("");
  const [yourExp, setYourExp] = useState("");
  const [whoIsPaying, setWhoIsPaying] = useState("user");

  const friendExp = billValue - yourExp;

  function handleBill(e) {
    e.preventDefault();
    console.log("a");
    const value = 8;
    handleSplitBill(value);
  }

  return (
    <form className="form-split-bill" onSubmit={handleBill}>
      <h2>Split a bill with</h2>

      <label>💰Bill value</label>
      <input
        type="text"
        value={billValue}
        onChange={(e) => setBillValue(Number(e.target.value))}
      />

      <label>🧍‍♀️ Your expense</label>
      <input
        type="text"
        value={yourExp}
        onChange={(e) =>
          setYourExp(
            Number(e.target.value) > billValue
              ? yourExp
              : Number(e.target.value)
          )
        }
      />

      <label>👫 friend's expense</label>
      <input type="text" value={friendExp} disabled />

      <label>🤑Who is paying the bill</label>
      <select>
        <option value="user">You</option>
        <option value="friend">name</option>
      </select>

      <Button>Click</Button>
    </form>
  );
}
