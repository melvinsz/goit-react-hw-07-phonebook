import Form from './Form/Form';
import Contacts from './Contacts/Contacts';
import Section from './Section/Section';

const App = () => {
  return (
    <div>
      <Section title="Phonebook">
        <Form />
      </Section>
      <Section title="Contacts">
        <Contacts />
      </Section>
    </div>
  );
};

export default App;
