import "./addUser.scss";

const AddUser = () => {
  return (
    <div className="addUser">
      <form>
        <input type="text" placeholder="Username" name="username" />
        <button>Search</button>
      </form>

      <div className="user">
        <div className="detail">
          <img src="../../../../../images/11.png" alt="" />
          <span>user</span>
        </div>
        <button>Add User</button>
      </div>
    </div>
  );
};

export default AddUser;
