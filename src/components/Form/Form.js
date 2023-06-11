import { useDispatch } from 'react-redux';
import { addContact } from 'components/redux/contactsList';
import Input from 'components/Input/Input';

const Form = () => {
  const dispatch = useDispatch();

  const handleSubmit = event => {
    event.preventDefault();
    const name = event.target.name.value;
    const number = event.target.number.value;
    dispatch(addContact(name, number));
    event.target.reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        label="Name"
        type="text"
        name="name"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
      />
      <Input
        label="Number"
        type="tel"
        name="number"
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
      />
      <button type="submit">Add contacts</button>
    </form>
  );
};

export default Form;
