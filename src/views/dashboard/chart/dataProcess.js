self.onmessage = function (event) {
  const largeData = event.data;
  const processedData = {
    female:[],
    male: []
  };

  // 处理数据的逻辑（例如对数据进行采样或其他计算）
  for (let i = 0; i < largeData.female.length; i++) {
    processedData.female.push([largeData.female[i][0], largeData.female[i][1]])
    processedData.male.push([largeData.male[i][0], largeData.male[i][1]])
  }

  // 处理完成后，向主线程发送处理后的数据
  self.postMessage(processedData);
};