'use strict';

exports = {
  generateQueueId(resourceType) {
    return resourceType + '_' + Date.now();
  }
};
