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
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);

  function handlerBtn() {
    setIsOpen((show) => !show);
  }

  function handlerAddFriend(newFriend) {
    setFriends((friens) => [...friens, newFriend]);
    setIsOpen(false);
  }

  function handleSelection(friend) {
    setSelectedFriend(friend);
    console.log(friend);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList friends={friends} onSelection={handleSelection} />
        {isOpen && <FormAddFriend onSetFriends={handlerAddFriend} />}
        <Button onHandlerBtn={handlerBtn}>
          {!isOpen ? "Add friends" : "close"}
        </Button>
      </div>
      {selectedFriend && <FormSlitBill selectedFriend={selectedFriend} />}
    </div>
  );
}

function Button({ children, onHandlerBtn }) {
  return (
    <button className="button" onClick={onHandlerBtn}>
      {children}
    </button>
  );
}

function FriendsList({ friends, onSelection }) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend friend={friend} key={friend.id} onSelection={onSelection} />
      ))}
    </ul>
  );
}

function Friend({ friend, onSelection }) {
  return (
    // <>
    <li>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      {friend.balance < 0 && (
        <p className="red">
          you owe {friend.name} {friend.balance}$
        </p>
      )}
      {friend.balance > 0 && (
        <p className="green">
          {friend.name} owes you {Math.abs(friend.balance)}$
        </p>
      )}
      {friend.balance === 0 && <p>You and {friend.name} are even</p>}
      <Button onClick={() => onSelection(friend)}>select</Button>
    </li>
    // </>
  );
}

function FormAddFriend({ onSetFriends }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  function handlerSubmit(e) {
    e.preventDefault();
    if (!name || !image) return;
    const id = crypto.randomUUID();
    const newFriend = {
      id,
      name,
      image: `${image}?=${id}`,
    };
    setName("");
    setImage("https://i.pravatar.cc/48");
    onSetFriends(newFriend);
    console.log(newFriend);
  }
  return (
    <form className="form-add-friend" onSubmit={handlerSubmit}>
      <label>🧞‍♀️Friend name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label>📷Image url</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <Button>Add friend</Button>
    </form>
  );
}

function FormSlitBill() {
  return (
    <form className="form-split-bill">
      <h2>split a bill with selectedFriend</h2>
      <label>💰 Bill value</label>
      <input type="text" />

      <label>🕴 Your expense</label>
      <input type="text" />

      <label>👬 X's value</label>
      <input type="text" disabled />

      <label>💲 who is paying the bill?</label>
      <select name="" id="">
        <option value="user">You</option>
        <option value="friend">...</option>
      </select>
      <Button>Split bill</Button>
    </form>
  );
}
