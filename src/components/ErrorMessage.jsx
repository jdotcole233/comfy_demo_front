import React from 'react';

const ErrorMessage = ({ errors, name }) => errors[name] ? <p style={{ lineHeight: 0 }} className="text-danger">{errors[name]?.message}</p> : null


export default ErrorMessage;