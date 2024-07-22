const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -15,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 10,
  },
  {
    id: 499489,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App() {
  return (
    <div className="app">
      <div className="sidebar">
        <p>Hi</p>
        <button>Click</button>
      </div>
    </div>
  );
}

function FriendsList() {
  return <ul></ul>;
}

function Friend() {
  return (
    <li className="selected">
      <p>s</p>
    </li>
  );
}

function FormAddFriend() {
  return (
    <form className="form-add-friend">
      <label>👫 Friend name</label>
      <input type="text" />

      <label>🌄 Image URL</label>
      <input type="text" />

      <button>click</button>
    </form>
  );
}

function FormSplitBill() {
  return (
    <form className="form-split-bill">
      <h2>Split a bill with</h2>

      <label>💰Bill value</label>
      <input type="text" />

      <label>🧍 Your expense</label>
      <input type="text" />

      <label>👫friend's expense</label>
      <input type="text" />

      <label>🤑Who is paying the bill</label>
      <select>
        <option value="user"> You</option>
        <option value="friend"> name</option>
      </select>

      <button>click</button>
    </form>
  );
}
