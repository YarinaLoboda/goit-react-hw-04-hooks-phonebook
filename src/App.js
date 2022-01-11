import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import styled, { createGlobalStyle } from 'styled-components';
import toast, { Toaster } from 'react-hot-toast';
import ContactForm from './components/ContactForm/ContactForm';
import Filter from './components/Filter/Filter';
import ContactList from './components/ContactList/ContactList';

const Global = createGlobalStyle`
*{
  margin: 0px;
  padding: 0px;
  box-sizing: border-box;
}

body {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 20px;
}

h1, h2{ 
margin: 10px;
}
`;

const PhoneBookContainer = styled.div`
   {
    width: 100%;
  }
`;

export default function App() {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(window.localStorage.getItem('contacts')) ?? [];
  });

  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const updateStateContact = ({ name, number }) => {
    const result = contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase(),
    );

    if (result) {
      toast.error('This Name is already exists !');
      return;
    }

    setContacts(state => [...state, { id: nanoid(5), name, number }]);
  };

  const updateStateFilter = filter => {
    setFilter(filter);

    getFilteredContacts();
  };

  const getFilteredContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );
  };

  const deleteContactById = id => {
    const { id: idToDel } = id;

    setContacts(contacts.filter(({ id }) => id !== idToDel));
  };

  const FilteredContacts = getFilteredContacts();

  return (
    <>
      <Global />
      <PhoneBookContainer>
        <Toaster />
        <h1>Phonebook</h1>
        <ContactForm onAddContact={updateStateContact} />
        <h2>Contacts</h2>

        {contacts.length > 0 && (
          <Filter value={filter} onChangeFilter={updateStateFilter} />
        )}

        {contacts.length > 0 ? (
          <ContactList
            contacts={FilteredContacts}
            onDeleteButtonClick={deleteContactById}
          />
        ) : (
          <p>Your phonebook is empty</p>
        )}
      </PhoneBookContainer>
    </>
  );
}
