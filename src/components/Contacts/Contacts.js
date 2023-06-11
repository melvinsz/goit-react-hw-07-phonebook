import { useDispatch, useSelector } from 'react-redux';
import {
  deleteContact,
  filterContacts,
  getContactsValue,
  getFilterValue,
} from 'components/redux/contactsList';
import Input from 'components/Input/Input';
import Notification from 'components/Notification/Notification';

const Contacts = () => {
  const contacts = useSelector(getContactsValue);
  const filter = useSelector(getFilterValue);
  const dispatch = useDispatch();

  const handleDelete = id => {
    dispatch(deleteContact(id));
  };

  const handleChange = e => {
    const value = e.target.value;
    dispatch(filterContacts(value));
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.includes(filter)
  );

  return (
    <div>
      <Input
        label="Find contacts by name"
        value={filter}
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
