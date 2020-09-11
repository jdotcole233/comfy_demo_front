import React from 'react';
import {components} from 'react-select';
import Select from 'react-select/creatable';
import './select2.scss';

const Placeholder = (props) => {
  return <components.Placeholder {...props} />;
};

const customStyles = {
  control: (base, state) => ({
    ...base,
    // background: "#2E3548",
    // color: "#fff",
    // match with the menu
    borderRadius: state.isFocused ? '3px 3px 0 0' : 3,
    // Overwrittes the different states of border
    borderColor: state.isFocused ? '#ced4da' : '#ced4da',
    // Removes weird border around container
    boxShadow: state.isFocused ? null : null,
    '&:hover': {
      // Overwrittes the different states of border
      borderColor: state.isFocused ? '#ced4da' : '#ced4da',
    },
  }),
  input: () => ({
    color: '#fff',
  }),
  option: () => ({
    // background: "#2E3548",
    padding: 10,
  }),
  menu: (base) => ({
    ...base,
    // override border radius to match the box
    borderRadius: 0,
    color: '#000',
    // background: "#2E3548",
    // kill the gap
    marginTop: 0,
  }),
  menuList: (base) => ({
    ...base,
    // background: "#2E3548",
    // color: "#FFF",
    // kill the white space on first and last option
    padding: 0,
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = 'opacity 300ms';

    return {
      ...provided,
      opacity,
      transition,
      color: '#fff',
      backgroundColor: '#556EE6',
      padding: 3,
      borderRadius: 5,
    };
  },
  multiValue: (styles, {data}) => {
    const color = '#556EE6';
    return {
      ...styles,
      backgroundColor: color,
      color: '#fff',
    };
  },
  multiValueLabel: (styles, {data}) => ({
    ...styles,
    color: '#fff',
  }),
  placeholder: (base) => ({
    // ...base,
    fontSize: '1em',
    color: '#A6B0CF',
    fontWeight: 400,
  }),
};

export default ({options, onChange, ...rest}) => {
  return (
    <Select
      isClearable
      components={{Placeholder, ...rest.components}}
      options={options}
      onChange={onChange}
      // defaultValue={{ label: defaultValue, value: defaultValue }}
      styles={customStyles}
      {...rest}
      classNamePrefix="select2-container"
    />
  );
};
