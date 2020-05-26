import React from "react";
import uuid from "uuid/dist/v4";
import Simulador from './containers/Simulador'

const columnsFromBackend = {
  [uuid()]: {
    name: "Archivos",
    items: [
      { id: uuid(), type:'doc', size:51123, content:'KB'},
      { id: uuid(), type:'ppt', size:51211,content:'KB'},
      { id: uuid(), type:'jpg', size:51567,content:'KB'},
      { id: uuid(), type:'mp3', size:51643,content:'KB'},
      { id: uuid(), type:'mp4', size:5413,content:'KB'},
      { id: uuid(), type:'pdf', size:52323,content:'KB'},
    ],
    size: 4294967296,
    fileSystem:{
      clusterSize:4096,
      name:'',
      clusters:[],
      negativeSpace:'',
      maxFileSize:'15'
    },
  },
  [uuid()]: {
    name: "PC 1",
    size: 4294967296,
    fileSystem:{
      clusterSize:4096,
      name:'FAT',
      clusters:[],
      negativeSpace:'',
      auth:false,
      maxFileSize:16777216
    },
    items: []
  },
  [uuid()]: {
    name: "PC 2",
    size: 8589934592,
    fileSystem:{
      clusterSize:262144,
      negativeSpace:'',
      name:'FAT32',
      clusters:[],
      auth:false,
      maxFileSize:4294967296
    },
    items: []
  },
  [uuid()]: {
    name: "PC 3",
    size: 8589934592,
    fileSystem:{
      clusterSize:32768,
      name:'NTFS',
      auth:true,
      clusters:[],
      maxFileSize:17592186044416
    },
    items: []
  }
};

function App() {
  
  return (
    <div className="app">
      <div className="relleno">

      </div>
      <Simulador data={columnsFromBackend} fileSystem="FAT"/>
    </div>
  );
}

export default App;
