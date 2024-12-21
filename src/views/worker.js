self.onmessage = async function (event) {
  const { fileChunks, fileName, uploadUrl } = event.data;

  const uploadChunk = async (chunk, index) => {
    const formData = new FormData();
    formData.append("file", chunk);
    formData.append("index", index);
    formData.append("fileName", fileName);

    const response = await fetch(uploadUrl, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) throw new Error(`Chunk ${index} upload failed.`);
  };

  for (let i = 0; i < fileChunks.length; i++) {
    try {
      await uploadChunk(fileChunks[i], i);
      self.postMessage({ index: i, success: true });
    } catch (error) {
      self.postMessage({ index: i, success: false, error: error.message });
      return;
    }
  }

  self.postMessage({ complete: true });
};
