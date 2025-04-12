const trimWhiteSpaces = (input) => {
  if (typeof input === 'string') {
    return input.trim();
  }

  if (Array.isArray(input)) {
    return input.map((item) => (typeof item === 'string' ? item.trim() : item));
  }

  if (typeof input === 'object' && input !== null) {
    const trimmedObj = {};
    for (const key in input) {
      if (typeof input[key] === 'string') {
        trimmedObj[key] = input[key].trim();
      } else {
        trimmedObj[key] = input[key];
      }
    }
    return trimmedObj;
  }

  return input;
};

const validateRequiredFields = (data, requiredFields) => {
  const trimmedData = trimWhiteSpaces(data);
  const missingFields = [];

  const result = {};

  for (const field of requiredFields) {
    if (!trimmedData[field]) {
      missingFields.push(field);
    } else {
      result[field] = trimmedData[field];
    }
  }

  if (missingFields.length > 0) {
    return {
      success: false,
      message: `Missing required field(s): ${missingFields.join(', ')}`,
    };
  }

  return {
    success: true,
    data: result,
  };
};

const filterAllowedFields = (data, allowedFields) => {
  const trimmedData = trimWhiteSpaces(data);

  if (Array.isArray(trimmedData)) {
    return trimmedData.map((item) => {
      const filteredItem = {};
      for (const key of allowedFields) {
        if (item[key] !== undefined) {
          filteredItem[key] = item[key];
        }
      }
      return filteredItem;
    });
  }

  if (typeof trimmedData === 'object' && trimmedData !== null) {
    const result = {};
    for (const key of allowedFields) {
      if (trimmedData[key] !== undefined) {
        result[key] = trimmedData[key];
      }
    }
    return result;
  }

  return trimmedData;
};

module.exports = { trimWhiteSpaces, validateRequiredFields, filterAllowedFields };
