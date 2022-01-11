import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useState } from 'react';

const AddContactButton = styled.button`
   {
    padding: 5px 30px;
    margin: 10px;
    border: 1px solid #ccc;
    border-radius: 10%;
    box-shadow: 0px 4px 10px 2px rgba(black, 0.2);
    font-weight: bold;
    color: #00ff00;
    cursor: pointer;
  }
`;
const InputValue = styled.input`
   {
    padding: 5px;
    margin: 10px;
    background-color: #efefef;
    border-color: #cccccc;
  }
`;

export default function ContactForm(props) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChange = event => {
    const { name, value } = event.target;

    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        return;
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
    props.onAddContact({ name, number });
    reset();
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:&nbsp;&nbsp;&nbsp;
        <InputValue
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </label>
      <br />
      <label>
        Number:
        <InputValue
          type="tel"
          name="number"
          value={number}
          onChange={handleChange}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </label>
      <br />

      <AddContactButton type="submit">Add contact</AddContactButton>
    </form>
  );
}

ContactForm.propTypes = {
  onAddContact: PropTypes.func.isRequired,
};
