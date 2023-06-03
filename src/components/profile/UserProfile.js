import React, { useContext } from "react";
import { UserContext } from "../../contexts/UserContextProvider";
import { AuthContext } from "../../contexts/AuthContextProvider";
import { CiTrash } from "react-icons/ci";
import Address from "./Address";
import OrderProductCard from "./OrderProductCard";

const UserProfile = () => {
  var addAddressForm = document.querySelector("#addAddress");
  const { signOut, deleteUser, changePassword } = useContext(AuthContext);
  const {
    dispatchUserData,
    userData: { user },
  } = useContext(UserContext);

  const addAddress = (event) => {
    event.preventDefault();
    const address = {
      name: event.target[0].value,
      phone: event.target[1].value,
      street: event.target[2].value,
      city: event.target[3].value,
      state: event.target[4].value,
      pin: event.target[5].value,
    };
    addAddressForm.reset();
    dispatchUserData({ action: "ADD_ADDRESS", payload: { address } });
  };

  return (
    <section className="user-container">
      <article name="User" className="user">
        <h2>{user.name}</h2>
        <h4>{user.email}</h4>
        <button className="btn-secondary" onClick={() => signOut()}>
          {" "}
          SIGN OUT
        </button>
      </article>
      <details className="addresses">
        <summary>Manage Addresses</summary>
        {user.addresses?.map((address, index) => (
          <Address
            key={"address-list" + index}
            address={address}
            index={index}
            dispatchUserData={dispatchUserData}
          />
        ))}
      </details>
      <details className="details-form">
        <summary>Add Address</summary>
        <form id="addAddress" onSubmit={addAddress}>
          <label>
            Name
            <input
              type="text"
              required={true}
              placeholder="name"
              defaultValue={"Mr Nemo"}
            ></input>
          </label>
          <label>
            Phone
            <input
              type="number"
              required={true}
              placeholder="phone"
              defaultValue={"0000000000"}
            ></input>
          </label>
          <label>
            Street
            <input
              type="text"
              required={true}
              placeholder="street"
              defaultValue={"Nowhere I am nothing"}
            ></input>
          </label>
          <label>
            City
            <input
              type="text"
              required={true}
              placeholder="city"
              defaultValue={"Electricity?"}
            ></input>
          </label>
          <label>
            State
            <input
              type="text"
              required={true}
              placeholder="state"
              defaultValue={"Liquid"}
            ></input>
          </label>
          <label>
            Area Code
            <input
              type="number"
              required={true}
              placeholder="pin"
              defaultValue={"000000"}
            ></input>
          </label>
          <button type="submit" className="btn-submit">
            ADD
          </button>
        </form>
      </details>
      <details>
        <summary>Orders & Review</summary>
        {user?.orders?.map((order, index) => {
          return (
            <details className="order-container">
              <summary>Order: {index + 1}</summary>
              {order?.map((product, productIndex) => (
                <OrderProductCard
                  product={{ ...product, orderIndex: index, productIndex }}
                />
              ))}
            </details>
          );
        })}
      </details>
      <details className="details-form">
        <summary>Change Password</summary>
        <form
          onSubmit={(e) =>
            changePassword(user.email, e.target[0].value, e.target[1].value)
          }
        >
          <label>
            <input
              type="password"
              required={true}
              placeholder="old password"
            ></input>
          </label>
          <label>
            <input
              type="password"
              required={true}
              placeholder="new password"
            ></input>
          </label>
          <button type="submit" className="btn-submit btn-delete">
            CHANGE PASSWORD
          </button>
        </form>
      </details>
      <details className="details-form">
        <summary>Delete Account</summary>
        <form onSubmit={(e) => deleteUser(user.email, e.target[0].value)}>
          <label>
            <input type="text" required={true} placeholder="password"></input>
          </label>
          <button type="submit" className="btn-submit btn-delete">
            DELETE ACCOUNT
          </button>
        </form>
      </details>
    </section>
  );
};

export default UserProfile;
