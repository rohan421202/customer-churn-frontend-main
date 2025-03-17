import React, { useState, useEffect } from 'react'
import SideBar from '../../../components/SideBar/SideBar';
import TitleCard from "../../../components/TitleCard/TitleCard";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import Chart from 'chart.js/auto';
import { Pie, Bar } from 'react-chartjs-2';

import './insights.css';

let file = "";
let bgColor = ['#FFBB28', '#FF8042', '#A8FE99']
ChartJS.register(ArcElement, Tooltip, Legend);

const Insights = () => {
  const [ pieChartData, setPieChartData ] = useState({});
  const [ barChartData, setBarChartData ] = useState([]);
  const [ histogramData, setHistogramData ] = useState([]);

  const [ currentFile, setCurrentFile ] = useState(file);
  const [ progress, setProgress ] = useState(false);
  const [ getInsight, setGetInsight ] = useState(false);
  const [ success, setSuccess ] = useState('');

  const [ userDetails , setUserDetails ] = useState({
    username: "",
    email: "",
    files: []
  });

  const [ dataInsight, setDataInsight ] = useState({
    rows: 0,
    cols: 0,
    features: [],
    na_cols: [],
    num_cols:[],
    cat_cols: [],
    churn: []
  })

  const [ errorMessage, setErrorMessage ] = useState("");
  const history = useNavigate();
  
    
  const handleDataInsights = async () => {
    setGetInsight(false);
    console.log(currentFile);
    setProgress(true);
    let formData = new FormData();
    formData.append('filename', currentFile)

    console.log(file);
    const { data } = await axios.post(`http://${import.meta.env.VITE_SERVER_ADDRESS}/overview`,formData, { params: {
      'email': JSON.parse(localStorage.getItem("userInfo")).data.email,
      'filename': file
    }}, {
      headers: {
          "Content-type": "application/json"
      }
    })
    setDataInsight({
      ...dataInsight,
      rows: data.rows,
      cols: data.cols,
      features: data.data_features,
      na_cols: data.na_variables,
      num_cols: data.num_variables,
      cat_cols: data.cat_variables,
      churn: data.target_instance
    })
    // setPieChartData({})
    setPieChartData({
      labels:['Customers Retained', 'Customers Leaving'],
      datasets: [
        {
          label:['No. Of Customers'],
          data:[data.target_instance[0], data.target_instance[1]],
          backgroundColor: [
            '#FFBB28',
            '#FF8042'
          ],
        }
      ]
    })
    setBarChartData([]);
    setBarChartData([data.cat_col_data]);
    setHistogramData([]);
    setHistogramData([data.numeric_col_data]);
    console.log(data);
    setProgress(false);
    setGetInsight(true);
    console.log(barChartData);
    console.log(pieChartData);
    console.log(histogramData);
  }
  const getUserDetails = async () => {
    const user = await axios.get(`http://${import.meta.env.VITE_SERVER_ADDRESS}/user/${JSON.parse(localStorage.getItem("userInfo")).data.email}`, {
      headers: {
          "Content-type": "application/json"
      }
    });
    console.log(user);
    setUserDetails({
      ...userDetails,
      username: user.data.data.username,
      email: user.data.data.email,
      files: user.data.data.train_files
    });
    file = user.data.data.train_files[0]
  }
  const handleCurrentFile = (event) => {
    setCurrentFile(event.target.value);
    file = event.target.value;
    console.log(file);
  }
  const handleAlgorithm = () => {
    history('/algorithms')
  }
  const handleUploadFile = async () => {
    let csvFile = document.getElementById("csv-file").files[0];
    if(!csvFile) {
      setErrorMessage("Please select a train file");
      return;
    }
    console.log(csvFile.name);

    let formData = new FormData();
    formData.append('email', userDetails.email);
    formData.append('file', csvFile)
      
    // console.log(formData);

    await axios.post(`http://${import.meta.env.VITE_SERVER_ADDRESS}/uploadtrainfile`, formData, { params: {
      'email': userDetails.email
    }}, {
      headers: {
        "Accept": "application/json",
        "Content-Type": "multipart/form-data"
      }
    })
    .then((response) => {
      console.log(response);
      console.log(response.data.info);
      if (response.data.info === "You already uploaded this file") {
        setSuccess("You already uploaded this file")
        return;
      }
      else {
        setSuccess("File Uploaded successfully")
      }
      getUserDetails();
    })
    .catch((error) => {
      console.log(error);
      toast({
        title: "File not uploaded",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top"
      })
    })
  }

  useEffect(() => {
    getUserDetails();
    if(file) {
      handleDataInsights();
    }
  }, []);

  return (
    <SideBar >
      <div className='insight-content'>
      <div className="insights">
        <TitleCard title={"Your Uploaded Files"} width={"w-half"}>
          <div>
          <select value={currentFile} onChange={(event) => handleCurrentFile(event)} className="select select-primary min-w-lg">
            {
              userDetails.files.map((file, ind) => {
                return <option key={ind} value={file}>{file}</option>
              })
            }
          </select>
          </div>
          <div>
          <button className="btn btn-primary custom-btn max-w-xs" onClick={handleDataInsights}>Get Insights</button>
          </div>
        </TitleCard>
        <TitleCard title={"Upload File"} width={"w-half"}>
          <div>
          <input type="file" id='csv-file' className="file-input file-input-bordered file-input-primary w-full max-w-xs" onClick={() => {setErrorMessage(""); setSuccess("")}}/>
          </div>
          {success && <p className={`text-center text-success mt-8`}>{success}</p>}

          {errorMessage && <p className={`text-center text-error mt-8`}>{errorMessage}</p>}
          <div>
          <button className='btn btn-primary custom-btn max-w-xs' onClick={handleUploadFile}>Upload File</button>
          </div>
        </TitleCard>


        {
          progress 
          &&
          <TitleCard topMargin={'30vh'} title={'Stats and Visualizations'}>
            <progress className="progress w-full"></progress>
          </TitleCard>
        }
        {
          getInsight && 
        <div>
          <div style={{'display': 'flex', 'flexDirection': 'column', 'flexWrap': 'wrap'}} >

            <TitleCard topMargin={'30vh'} bottomMargin= {'mb-8'} title={'Stats and Visualizations'} content={false}>
            </TitleCard>
          <div className="stats stats-vertical lg:stats-horizontal shadow">
            <div className="stat">
              <div className="stat-title">Number of Rows</div>
              <div className="stat-value">{dataInsight.rows}</div>
              <div className="stat-desc"></div>
            </div>
            
            <div className="stat">
              <div className="stat-title">Number of Features</div>
              <div className="stat-value">{dataInsight.cols}</div>
              {/* <div className="stat-desc">↗︎ 400 (22%)</div> */}
            </div>
            
            <div className="stat">
              <div className="stat-title">Current Churn Rate</div>
              <div className="stat-value">{`${(((dataInsight.churn[1]) / dataInsight.rows) * 100).toFixed(2)}%`}</div>
              {/* <div className="stat-desc">↘︎ 90 (14%)</div> */}
            </div>
            
          </div>
          <TitleCard topMargin={'mt-12'} bottomMargin= {'mb-8'} title={'All Features'} content={false}>
            </TitleCard>
          <div style={{ 'borderRadius': '5vh',  'padding': '5vh', 'display': 'flex', 'justifyContent': 'flex-start', 'alignItems': 'center', 'gap': '2vw',  'flexWrap': 'wrap'}}>
              {
                dataInsight.features.map((feature, ind) => {
                  return (
                    <div className="card bg-base-100 shadow-xl" >
                      <div className="card-body">
                        <h2 className="card-title">{feature}</h2>
                      </div>
                    </div>
                  )
                })
              }
          </div>

            <TitleCard topMargin={'mt-12'} bottomMargin= {'mb-8'} title={'Categorical Features'} content={false}>
            </TitleCard>
          <div style={{'borderRadius': '5vh',  'padding': '5vh', 'display': 'flex', 'justifyContent': 'flex-start', 'alignItems': 'center', 'gap': '2vw', 'flexWrap': 'wrap'}}>
              {
                dataInsight.cat_cols.map((feature, ind) => {
                  return (
                    <div className="card bg-base-100 shadow-xl" >
                      <div className="card-body">
                        <h2 className="card-title">{feature}</h2>
                      </div>
                    </div>
                  )
                })
              }
            </div>

            <TitleCard topMargin={'mt-12'} bottomMargin= {'mb-8'} title={'Numerical Features'} content={false}>
            </TitleCard>
            <div style={{'borderRadius': '5vh',  'padding': '5vh', 'display': 'flex', 'justifyContent': 'flex-start', 'alignItems': 'center', 'gap': '2vw', 'flexWrap': 'wrap'}}>
              {
                dataInsight.num_cols.map((feature, ind) => {
                  return (
                    <div className="card bg-base-100 shadow-xl" >
                      <div className="card-body">
                        <h2 className="card-title">{feature}</h2>
                      </div>
                    </div>
                  )
                })
              }
            </div>

            <TitleCard topMargin={'mt-12'} bottomMargin= {'mb-8'} title={'Distribution of Churn'} content={false}>
            </TitleCard>

            <div style={{'maxHeight': '50vh', 'borderRadius': '5vh',  'padding': '5vh', 'display': 'flex', 'justifyContent': 'center', 'alignItems': 'center', 'gap': '2vw',  'flexWrap': 'wrap'}}>
              {
               <Pie data={pieChartData} options={{
                responsive:true,
                plugins: {
                  legend: {
                    position: 'top',
                    labels: {
                      font: {
                        size: 20,
                      }
                   }
                  },
                }
              }} />
              }
            </div>

            <TitleCard topMargin={'mt-12'} bottomMargin= {'mb-8'} title={'Bar Charts for all Categorical Features'} content={false}>
            </TitleCard>
             
            <div style={{'overflow': 'auto', 'maxHeight': '70vh', 'borderRadius': '5vh',  'padding': '5vh', 'display': 'flex', 'justifyContent': 'center', 'alignItems': 'center', 'gap': '2vw',  'flexWrap': 'wrap'}}>
            {barChartData[0].map((ele, ind) => {
              return (<Bar className='chart' style={{ 'border': '0.5vh solid black', 'borderRadius': '1vh', 'padding': '1vh'}} data={{
                labels:ele[0],
                datasets:[
                  {
                    label: dataInsight.cat_cols[ind],
                    data: ele[1],
                    backgroundColor: bgColor[ind % 3],
                  }
                ]
              }} options={{
                responsive:true,
                plugins: {
                  legend: {
                    position: 'top',
                    labels: {
                        font: {
                          size: 30,
                        }
                    }
                  },
                  tooltip: {
                    bodyFont: {
                      size: 25,
                    }
                  }
                },
                scales: {
                  x: {
                    ticks: {
                      font: {
                        weight: 'bold',
                        size: 20 
                      }
                    }
                  },
                  y: {
                    ticks: {
                        font: {
                          weight: 'bold',
                          size: 20 
                        }
                    }
                  }
                }
              }}/>)
            })}
            </div>

          </div>
        </div>
        }
        </div>
        </div>
    </SideBar>
  )
}

export default Insights;