import { useDispatch, useSelector } from 'react-redux';
import { deleteContact, filterContacts } from 'components/redux/slice';
import Input from 'components/Input/Input';
import Notification from 'components/Notification/Notification';
import {
  selectContactsList,
  selectFilterValue,
} from 'components/redux/Selectors';

const Contacts = () => {
  const items = useSelector(selectContactsList);
  const filterValue = useSelector(selectFilterValue);
  const dispatch = useDispatch();

  const handleDelete = id => {
    dispatch(deleteContact(id));
  };

  const handleChange = e => {
    const value = e.target.value;
    dispatch(filterContacts(value));
  };

  const filteredContacts = items.filter(
    item => item.name && item.name.includes(filterValue)
  );

  return (
    <div>
      <Input
        label="Find contacts by name"
        value={filterValue}
        onChange={handleChange}
        type="text"
        name="filter"
      />

      {!filteredContacts.length ? (
        <Notification message="Contact list is empty." />
      ) : (
        <ul>
          {filteredContacts.map(({ id, name, number }) => (
            <li key={id}>
              <span>{name}</span>
              <span>{number}</span>
              <button type="button" onClick={() => handleDelete(id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Contacts;
