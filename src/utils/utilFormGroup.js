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
    if (validateHasChild && validateHasChild[0].values.hasChild)
      return validateHasChild[0].values.child;
    return null;
  }
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
  // const DataFinal = respData.filter((x, index) => index !== 4);
  return respData;
};

const dataTableFinal = (array) => {
  return array.map((x) => x)[0];
};

const getValuesToQuery = (request) => {
  console.log('request', request);
  const day = Object.values(request.range)[0];
  const identifier = request.identifier.value;
  const typeIdentifier = request.identifier.type;
  const filterPlatform = Object.values(request.filters.platform);
  const filterPortal = Object.values(request.filters.portal);
  const filterCategory = Object.values(request.filters.eventCategory);
  const filterTypeCategory = Object.values(request.filters.eventType);

  const responsive = [
    day,
    identifier,
    typeIdentifier,
    filterPlatform,
    filterPortal,
    filterCategory,
    filterTypeCategory,
  ];
  console.log('Responsive', responsive);
};

const utilFormGroup = (values) => {
  const {
    typeConsult,
    typeIdentifier,
    primaryIndentifiers,
    secondaryIdentifiers,
    deviceIdentifiers,
    identifier,
    platform,
    portalGroup,
    time,

    typeConsult1,
    typeIdentifier1,
    primaryIndentifiers1,
    secondaryIdentifiers1,
    deviceIdentifiers1,
    identifier1,
    platform1,
    portalGroup1,
    time1,

    typeConsult2,
    typeIdentifier2,
    primaryIndentifiers2,
    secondaryIdentifiers2,
    deviceIdentifiers2,
    identifier2,
    platform2,
    portalGroup2,
    time2,
  } = values;
  // const primaryIndentifier = primaryIndentifiers.split(',');

  const secondaryIndentifier =
    secondaryIdentifiers && secondaryIdentifiers.split(',');
  const deviceIndentifier = deviceIdentifiers && deviceIdentifiers.split(',');

  // const primaryIndentifier1 = primaryIndentifiers1.split(',');
  const secondaryIndentifier1 =
    secondaryIdentifiers1 && secondaryIdentifiers1.split(',');
  const deviceIndentifier1 =
    deviceIdentifiers1 && deviceIdentifiers1.split(',');

  // const primaryIndentifier2 = primaryIndentifiers2.split(',');
  // const secondaryIndentifier2 = secondaryIdentifiers2.split(',');
  // const deviceIndentifier2 = deviceIdentifiers2.split(',');
  const getTypeIdentifier = (typeIdentifier) => {
    if (typeIdentifier === 'secondary') return typeIdentifier;
    if (typeIdentifier === 'device') return typeIdentifier;
    return null;
  };

  return {
    and: [
      {
        identifiers: {
          secundario: {
            type: secondaryIndentifier ? secondaryIndentifier[1] : '',
            value: secondaryIndentifier ? identifier : '',
          },
          dispositivo: {
            type: deviceIdentifiers ? deviceIndentifier[1] : '',
            value: deviceIdentifiers ? identifier : '',
          },
        },
        filters: {
          portal: getDropDownOptionSelected(portalGroup),
          platform: getDropDownOptionSelected(platform),
        },
        range: {
          days: formatDate(time),
        },
      },
      {
        identifiers: {
          secundario: {
            secundario: {
              type: secondaryIndentifier1 ? secondaryIndentifier1[1] : '',
              value: secondaryIndentifier1 ? identifier1 : '',
            },
            dispositivo: {
              type: deviceIdentifiers1 ? deviceIndentifier[1] : '',
              value: deviceIdentifiers1 ? identifier1 : '',
            },
          },
        },
        filters: {
          portal: getDropDownOptionSelected(portalGroup1),
          platform: getDropDownOptionSelected(platform1),
        },
        range: {
          days: formatDate(time1),
        },
      },
    ],
  };
};

export const apiKey = 'nYzZgG77QT98NPRcBu5VV9wQoQzC7Q9433qdxBBc';

export {
  getIdentifiers,
  calendar,
  dataTable,
  dataTableFinal,
  utilFormGroup,
  getValuesToQuery,
  getDropDownValue,
  getChilds,
  getLastDate,
  validateDateTypeId,
  validateDropDownsDate,
};
