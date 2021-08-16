import React from 'react';
import {
  MDBModalBody as ModalBody,
  MDBModalHeader as ModalHeader,
} from 'mdbreact';
import { Modal } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import currencies from '../assets/currencies.json'
import moment from 'moment'


export { default as Drawer } from './Drawer';
export { default as BottomDrawer } from "./BottomDrawer";
export { default as Prompt } from "./Prompt";
export { default as CurrencyValues } from './CurrencyValues';
export { default as Dropzone } from './DropZone';
export { default as Datatable } from './DataTable';
export { default as SummerNote } from './SummerNote';
export { default as Select } from './Selectize';
export { default as Selector } from './Select';
export { default as Loader } from './Loader';
export { default as NoData } from './Nodata';
export { default as OverViewCard } from './OverViewCard';
export { default as Input } from './Input';
export { default as PageHeader } from './PageTitle';
export { default as TreatyClaimsButtons } from './TreatyClaimsButtons';
export { default as ErrorMessage } from './ErrorMessage';
export { default as Editor } from './Editor';
export { default as ReinsuredComponent } from './ReinsuredComponent';
export { Modal, ModalBody, ModalHeader };

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

export const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
};

export const validateInputs = (obj) => {
  for (var key in obj) {
    if (obj[key] === null || obj[key].length < 1) return true;
  }
  return false;
};

export function chunkArray(myArray, chunk_size) {
  var index = 0;
  var arrayLength = myArray.length;
  var tempArray = [];

  for (index = 0; index < arrayLength; index += chunk_size) {
    const myChunk = myArray.slice(index, index + chunk_size);
    tempArray.push(myChunk);
  }

  return tempArray;
}

export const InsurerOption = ({
  innerProps,
  isSelected,
  isDisabled,
  label,
  value,
}) =>
  !isDisabled && !isSelected ? (
    <div {...innerProps} className="row p-2">
      <div className="col-md-8">
        <h4>{label}</h4>
        <p>{value.insurer_company_email}</p>
      </div>
      <div className="col-md-4 d-flex justify-content-end">
        <span className="avatar-sm d-flex justify-content-center align-items-center rounded-circle header-profile-user rounded-circle bg-soft-primary text-primary font-size-16">
          {value.insurer_abbrv || 'NA'}
        </span>
      </div>
    </div>
  ) : null;

export const CurrencyOption = ({
  innerProps,
  isSelected,
  isDisabled,
  label,
  value,
}) =>
  !isDisabled && !isSelected ? (
    <div {...innerProps} className="row p-2">
      <div className="col-md-2">
        <span className="d-flex justify-content-center align-items-center rounded-circle header-profile-user rounded-circle bg-soft-primary text-primary font-size-12">
          {value.symbol || 'NA'}
        </span>
      </div>
      <div className="col-md-8">
        <>{label}</>
      </div>
    </div>
  ) : null;

export const ReinsurerOption = ({
  innerProps,
  isSelected,
  isDisabled,
  label,
  value,
}) =>
  !isDisabled && !isSelected ? (
    <div {...innerProps} className="row p-2">
      <div className="col-md-8">
        <h4>{label}</h4>
        <p>{value.re_company_email}</p>
      </div>
      <div className="col-md-4 d-flex justify-content-end">
        <span className="avatar-sm d-flex justify-content-center align-items-center rounded-circle header-profile-user rounded-circle bg-soft-primary text-primary font-size-16">
          {value.re_abbrv || 'NA'}
        </span>
      </div>
    </div>
  ) : null;

export const generateNewCulumns = (list, exclude) =>
  list.filter((item) => !exclude.includes(item.field));


export const getCurrencyFullName = (currency) => currencies[currency]?.name

export function getMonday(d) {
  d = new Date(d);
  var day = d.getDay(),
    diff = d.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
  return new Date(d.setDate(diff));
}



export function isWithinAWeek(momentDate) {
  const createdAt = moment(momentDate);
  const today = moment();
  const difference = today.diff(createdAt, "days");
  return difference < 8
}
