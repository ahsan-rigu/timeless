import React, { useContext, useState } from "react";
import { UserContext } from "../../contexts/UserContextProvider";

const Address = ({
  address: { name, phone, street, city, state, pin },
  index,
}) => {
  const { dispatchUserData } = useContext(UserContext);
  const [isReadOnly, setIsReadOnly] = useState(true);
  const editAddress = (event, index) => {
    event.preventDefault();
    if (!isReadOnly) {
      const address = {
        name: event.target[0].value,
        phone: event.target[1].value,
        street: event.target[2].value,
        city: event.target[3].value,
        state: event.target[4].value,
        pin: event.target[5].value,
      };
      dispatchUserData({
        action: "UPDATE_ADDRESS",
        payload: { address, index },
      });
      setIsReadOnly(true);
    }
  };
  return (
    <form onSubmit={(e) => editAddress(e, index)} className="form-edit">
      <label>
        <input
          type="text"
          required={true}
          placeholder="name"
          defaultValue={name}
          disabled={isReadOnly}
        ></input>
      </label>
      <label>
        <input
          type="number"
          required={true}
          placeholder="phone"
          defaultValue={phone}
          disabled={isReadOnly}
        ></input>
      </label>
      <label>
        <input
          type="text"
          required={true}
          placeholder="street"
          defaultValue={street}
          disabled={isReadOnly}
        ></input>
      </label>
      <label>
        <input
          type="text"
          required={true}
          placeholder="city"
          defaultValue={city}
          disabled={isReadOnly}
        ></input>
      </label>
      <label>
        <input
          type="text"
          required={true}
          placeholder="state"
          defaultValue={state}
          disabled={isReadOnly}
        ></input>
      </label>
      <label>
        <input
          type="number"
          required={true}
          placeholder="pin"
          defaultValue={pin}
          disabled={isReadOnly}
        ></input>
      </label>
      {!isReadOnly ? (
        <button type="submit" className="btn-50">
          SAVE
        </button>
      ) : (
        <button
          onClick={() => setTimeout(() => setIsReadOnly(false), 20)}
          className="btn-50"
        >
          EDIT
        </button>
      )}
      {!isReadOnly ? (
        <button type="reset" className="btn-50 red">
          CLEAR CHANGES
        </button>
      ) : (
        <button
          className="btn-50 red"
          onClick={() =>
            dispatchUserData({ action: "REMOVE_ADDRESS", payload: index })
          }
        >
          DELETE
        </button>
      )}
    </form>
  );
};

export default Address;
