// let command, file, chunkSize, currentChunk, totalChunks, uploadUrl, userId, paused, uploading, xhr;
// self.onmessage = async (e) => {
//   console.log('Worker received message:', e.data);
//   command = e.data.command;
//   paused = e.data.paused;
//   if(e.data.currentChunk !== undefined) {
//     ({ file, chunkSize, currentChunk, totalChunks, uploadUrl, userId, uploading} = e.data);
//   }
//   uploadChunks();
  
// };

// const uploadChunks = () => {
//   if (paused || !uploading || !file) return true;
//     const start = currentChunk * chunkSize;
//     const end = Math.min(start + chunkSize, file.size);
//     const chunk = file.slice(start, end);
//     const formData = new FormData();
//     formData.append('chunk', chunk, file.name);
//     formData.append('userId', userId || '');
//     formData.append('videoId', file.name);
//     formData.append('chunkIndex', currentChunk.toString());
//     formData.append('totalChunks', totalChunks.toString());

//     xhr = new XMLHttpRequest();
//     xhr.open('POST', uploadUrl, true);
//     // xhr.setRequestHeader('Content-Type', 'multipart/form-data');

//     if(command === 'upload') {
//       xhr.onload = function () {
//         if (xhr.status === 200 || xhr.status === 201) {
//           currentChunk++;
//           const progress = Math.floor((currentChunk / totalChunks) * 100);
//           if (currentChunk < totalChunks) {
//             console.log('111111', currentChunk, totalChunks);
//             uploadChunks();
//             // self.postMessage({ success: true, message: 'Upload complete', progress});
//           } else {
//             if (currentChunk && totalChunks) {
//               console.log('2222222', currentChunk, totalChunks);
//               uploading = false;
//               self.postMessage({ success: true, message: 'Upload complete', progress});
//             }
//           }
//         } else {
//           alert('Upload failed');
//           if (e.data.message === 'Upload paused or canceled') {
//             uploading = false;
//           }
//         }
//       };
//     } else if (command === 'pause') {
//       paused = true;
//       // xhr.abort();
//       // uploadChunks();
//     } else if (command === 'resume') {
//       paused = false;
//       // uploadChunks();
//     } else if (command === 'cancel') {
//       paused = false;
//       uploading = false;
//       currentChunk = 0;
//       totalChunks = 0;
//       file = null;
//       xhr.abort();
//     }

//     xhr.onerror = function () {
//       alert('Upload failed');
//       if (e.data.message === 'Upload paused or canceled') {
//         uploading = false;
//       }
//     };

//     xhr.send(formData);
// }





