/*jshint esversion: 6 */

const getIdentifiers = (identifiers) => {
  const id = Object.values(identifiers).map((x) => ({
    scope: x.scope,
    type: x.type,
    date: x.lastDate,
  }));
  return id;
};

const getDropDownValue = (data) => {
  let result = [];
  if (data) {
    result.length = Object.keys(data).length;
    for (let i = 0; i < Object.keys(data).length; i++) {
      const key = Object.keys(data)[i];
      const values = data[Object.values(Object.keys(data))[i]];
      result[i] = {key, values};
    }
    return result;
  }
  return null;
};

const getChilds = (data, value) => {
  if (data && value) {
    const valueKey = Object.values(value)[0];
    const validateHasChild = data.filter((x) => x.key === valueKey);
    if (
      validateHasChild &&
      validateHasChild[0] &&
      validateHasChild[0].values.hasChild
    )
      return validateHasChild[0].values.child;
    return null;
  }
};
const gettypeIdentifiersSelectOptions = (identifier) => {
  if (identifier === 'llavecliente') return 'Bancolombia id';
  if (identifier === 'cii') return 'Omnisage id';
  if (identifier === 'cedulahash') return 'Cedula';
  if (identifier === 'GOOGLEANALYTICS') return 'GOOGLE ANALYTICS';
  if (identifier === 'BANCOLOMBIA APP PERSONAS') return 'APP PERSONAS';
  return identifier;
};
const calendar = [
  {
    time: 'time',
    value: '1 día',
  },
  {
    time: 'time',
    value: '7 días',
  },
  {
    time: 'time',
    value: '15 días',
  },
  {
    time: 'time',
    value: '30 días',
  },
];

const formatDate = (value) => {
  if (value === '1 día') return 1;
  if (value === '7 días') return 7;
  if (value === '15 días') return 15;
  if (value === '30 días') return 30;
  return 1;
};

const getDropDownOptionSelected = (infoSelected) => {
  if (infoSelected) return infoSelected.map((i) => Object.values(i)[1].key);
  return [];
};

const validateDateTypeId = (lastDate, values) => {
  const {typeIndentifiers} = values;
  const typeIdentifier = typeIndentifiers.split(',');
  if (typeIdentifier[2] >= lastDate) {
    return true;
  }
  return false;
};

const validateDropDownsDate = (lastDate, values) => {
  const {platform, portal, category, typeCategory} = values;
  if (platform && typeof platform === 'object') {
    return (
      platform.map((i) => Object.values(i)[1].value.lastDate)[0] <= lastDate
    );
  }
  if (portal && typeof portal === 'object') {
    return portal.map((i) => Object.values(i)[1].value.lastDate)[0] <= lastDate;
  }
  if (category && typeof category === 'object') {
    return (
      category.map((i) => Object.values(i)[1].value.lastDate)[0] <= lastDate
    );
  }
  if (typeCategory && typeof typeCategory === 'object') {
    return (
      typeCategory.map((i) => Object.values(i)[1].value.lastDate)[0] <= lastDate
    );
  }
  return false;
};

const getLastDate = (time) => {
  var today = new Date();
  today.setDate(today.getDate() - formatDate(time));
  var lastDate =
    today.getFullYear() +
    '-' +
    ('0' + (today.getMonth() + 1)).slice(-2) +
    '-' +
    ('0' + today.getDate()).slice(-2);
  return lastDate;
};
const dataTable = (data) => {
  const respData = Object.values(data).map((x) => x);
  return respData;
};

const dataTableFinal = (array) => {
  return array.map((x) => x)[0];
};

const getEvents = (eventArray) => {
  const id = `Id: ${Object.values(eventArray)[0].id}`;
  const eventDate = `Fecha de evento: ${Object.values(
    eventArray
  )[0].eventdate.substring(0, 10)}`;
  const description = `Descripción: ${
    Object.values(eventArray)[0].description
  }`;
  const type = `Tipo: ${Object.values(eventArray)[0].type}`;
  const eventFinal = id + '\n' + eventDate + '\n' + description + '\n' + type;
  return eventFinal;
};

const utilFormSingle = (values) => {
  const {
    typeIndentifiers,
    identifier,
    platform,
    portal,
    category,
    typeCategory,
    time,
  } = values;
  const typeIdentifier = typeIndentifiers.split(',');
  return {
    range: {
      days: formatDate(time),
    },
    identifier: {
      scope: typeIdentifier[0],
      type: typeIdentifier[1],
      value: identifier,
    },
    filters: {
      portal: getDropDownOptionSelected(portal),
      platform: getDropDownOptionSelected(platform),
      eventCategory: getDropDownOptionSelected(category),
      eventType: getDropDownOptionSelected(typeCategory),
    },
  };
};

export const apiKey = 'nYzZgG77QT98NPRcBu5VV9wQoQzC7Q9433qdxBBc';

export {
  getIdentifiers,
  gettypeIdentifiersSelectOptions,
  calendar,
  dataTable,
  dataTableFinal,
  utilFormSingle,
  getDropDownValue,
  getChilds,
  getLastDate,
  validateDateTypeId,
  validateDropDownsDate,
  getEvents,
};
