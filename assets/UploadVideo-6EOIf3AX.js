import{d as D,r as n,c as k,a3 as r,a1 as p,b as d,a7 as V,a2 as c,o as C,l as f}from"./@vue-BY7EiYrW.js";import{_ as R}from"./index-DWUCqHTJ.js";import"./pinia-DwJJglSe.js";import"./vue-demi-Dq6ymT-8.js";import"./vue-router-DvWCsNeQ.js";import"./naive-ui-DotuBcN5.js";import"./@css-render-D3UmSPzJ.js";import"./css-render-BDrvWz3H.js";import"./@emotion-WldOFDRm.js";import"./seemly-CzquFqHg.js";import"./lodash-es-CcN61r44.js";import"./vooks-1sr1GlLd.js";import"./evtd-CI_DDEu_.js";import"./vueuc-CW7KYjMl.js";import"./vdirs-Bxp-63WN.js";import"./@juggle-C8OzoCMD.js";import"./date-fns-DWhyM25l.js";import"./treemate-BD4Oer00.js";import"./date-fns-tz-CV8U58M7.js";import"./async-validator-DKvM95Vc.js";const B={style:{"margin-bottom":"12px"}},N={key:0},W=["value"],_=10*1024*1024,L=D({__name:"UploadVideo",setup(j){const m=n(null),i=n(0),h=n(0),s=n(!1),o=n(!1),l=n(0),g=n("");let e=null;const x=u=>{if(u.file.file){const a=u.file.file,t=a.name;if(s.value&&g.value===t){alert("This file is already uploading!");return}g.value=t,m.value=a,h.value=Math.ceil(m.value.size/_),s.value=!0,i.value=0,l.value=0,U()}},U=()=>{const u=`
    let command, file, chunkSize, currentChunk, totalChunks, uploadUrl, userId, paused, uploading, xhr;
    let lastUpdateTime = 0;
    const updateInterval = 2000;
    self.onmessage = async (e) => {
      console.log('Worker received message:', e.data);
      command = e.data.command;
      paused = e.data.paused;
      if(e.data.currentChunk !== undefined) {
        ({ file, chunkSize, currentChunk, totalChunks, uploadUrl, userId, uploading} = e.data);
      }

      if(command === 'upload') {
        uploadChunks();
      } else if (command === 'pause') {
        paused = true;
        xhr.abort();
      } else if (command === 'resume') {
        paused = false;
        uploadChunks();
      } else if (command === 'cancel') {
        paused = false;
        uploading = false;
        currentChunk = 0;
        totalChunks = 0;
        file = null;
        xhr.abort();
      }
    };

    const uploadChunks = () => {
      if (paused || !uploading || !file) return true;
      const start = currentChunk * chunkSize;
      const end = Math.min(start + chunkSize, file.size);
      const chunk = file.slice(start, end);
      const formData = new FormData();
      formData.append('chunk', chunk, file.name);
      formData.append('userId', userId || '');
      formData.append('videoId', file.name);
      formData.append('chunkIndex', currentChunk.toString());
      formData.append('totalChunks', totalChunks.toString());

      xhr = new XMLHttpRequest();
      xhr.open('POST', uploadUrl, true);
      // xhr.setRequestHeader('Content-Type', 'multipart/form-data');

      xhr.onload = function () {
        if (xhr.status === 200 || xhr.status === 201) {
          const currentTime = Date.now();
          currentChunk++;
          const progress = Math.floor((currentChunk / totalChunks) * 100);
          if (currentChunk < totalChunks) {
            console.log('111111', currentChunk, totalChunks);
            uploadChunks();
            if (currentTime - lastUpdateTime >= updateInterval) {
              self.postMessage({ success: true, message: 'Upload in progress', progress});
              lastUpdateTime = currentTime;
            }
          } else {
            if (currentChunk && totalChunks) {
              console.log('2222222', currentChunk, totalChunks);
              uploading = false;
              self.postMessage({ success: true, message: 'Upload complete', progress});
            }
          }
        } else {
          uploading = false;
          self.postMessage({ success: false, message: 'Upload failed' });
        }
      };

      xhr.onerror = function () {
        uploading = false;
        self.postMessage({ success: false, message: 'Upload failed' });
      };

      xhr.send(formData);
    }
  `,a=new Blob([u],{type:"application/javascript"});e=new Worker(URL.createObjectURL(a)),e==null||e.postMessage({command:"upload",file:m.value,chunkSize:_,currentChunk:i.value,totalChunks:h.value,uploadUrl:"http://127.0.0.1:3000/api/videos/upload",userId:localStorage.getItem("userId")||"",uploading:s.value,paused:o.value}),e.onmessage=t=>{t.data.success&&(t.data.message==="Upload complete"&&(s.value=!1,alert("Upload complete"),v()),l.value=t.data.progress)}},v=()=>{e==null||e.terminate(),e=null},I=()=>{o.value=!0,e==null||e.postMessage({command:"pause",paused:o.value}),alert("Upload paused")},b=()=>{o.value=!1,e==null||e.postMessage({command:"resume",paused:o.value})},M=()=>{s.value=!1,o.value=!1,i.value=0,l.value=0,alert("Upload Canceled"),e==null||e.postMessage({command:"cancel",paused:o.value,uploading:s.value,currentChunk:i.value,progress:l.value}),v()};return(u,a)=>{const t=c("n-icon"),y=c("n-text"),S=c("n-p"),T=c("n-upload-dragger"),z=c("n-upload");return C(),k("div",null,[r(z,{multiple:"","directory-dnd":"",max:5,"on-change":x},{default:p(()=>[r(T,null,{default:p(()=>[d("div",B,[r(t,{size:"48",style:{"font-style":"normal"}},{default:p(()=>a[0]||(a[0]=[f(" ⬆️ ")])),_:1})]),r(y,{style:{"font-size":"16px"}},{default:p(()=>a[1]||(a[1]=[f(" 点击或者拖动文件到该区域来上传 ")])),_:1}),r(S,{depth:"3",style:{margin:"8px 0 0 0"}},{default:p(()=>a[2]||(a[2]=[f(" 请不要上传敏感数据，比如你的银行卡号和密码，信用卡号有效期和安全码 ")])),_:1})]),_:1})]),_:1}),s.value?(C(),k("div",N,[d("progress",{value:l.value,max:"100"},null,8,W),d("button",{onClick:I},"Pause"),d("button",{onClick:b},"Resume"),d("button",{onClick:M},"Cancel")])):V("",!0)])}}}),oe=R(L,[["__scopeId","data-v-ecb90df4"]]);export{oe as default};
