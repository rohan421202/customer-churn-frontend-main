import React, { useState, useEffect } from 'react'
import SideBar from '../../../components/SideBar/SideBar';
import TitleCard from '../../../components/TitleCard/TitleCard';
import axios from 'axios';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import Chart from 'chart.js/auto';
import { Pie, Bar } from 'react-chartjs-2';
import { BsDownload } from 'react-icons/bs';
import { CSVLink, CSVDownload } from "react-csv";
import './predict.css';

let file = ""
let modelName = ""
let y = 0;
let n = 0;
const Predict = () => {
    const [ testFile, setTestFile ] = useState('');
    const [ model, setModel ] = useState('');
    const [errorMessage, setErrorMessage ] = useState('')
    const [ predict, setPredict ] = useState(false);
    const [ loading, setLoading ] = useState(false);
    const [successMessage, setSuccessMessage ] = useState("")

    const [userDetails, setUserDetails ] = useState({
        username: "",
        email: "",
        files: [],
        models: []
    })
    const [ churn, setChurn ] = useState({
      yes: 0,
      no: 0
    })

    const [results, setResults ] = useState({
      columns: [],
      dataframe: []
    })


    const handleTestFile = (e) => {
        console.log(e.target.value);
        setTestFile(e.target.value);
    }
    const handleModelChange = (e) => {
        setModel(e.target.value);
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
          files: user.data.data.test_files,
          models: user.data.data.models,
          scores: user.data.data.scores
        });
        file = user.data.data.test_files[0]
        modelName = user.data.data.models[0]
        setTestFile(file)
        setModel(modelName)
      }
    const handleTestFileUpload = async () => {
      let csvFile = document.getElementById("csv-file").files[0];
      if(!csvFile) {
        setErrorMessage("Please select test file")
        return;
      }
      if(userDetails.files.includes(csvFile.name)) {
        setSuccessMessage("Test File Already uploaded");
          return;
      }

        
        console.log(csvFile);
        let formData = new FormData();
        formData.append('email', userDetails.email);
        formData.append('file', csvFile)
      
    const Config = {
      headers: {
        "Accept": "application/json",
        "Content-Type": "multipart/form-data"
      }
    }
    await axios.post(`http://${import.meta.env.VITE_SERVER_ADDRESS}/uploadtestfile`, formData, { params: {
      'email': userDetails.email
    }}, Config)
    .then((response) => {
      console.log(response);
      console.log(response.data.info);
      if (response.data.info === "You already uploaded this file") {
        setSuccessMessage("Test file already uploaded");
      }
      else {
        setSuccessMessage("File Uploaded successfully");
      }
      getUserDetails();
    })
    .catch((error) => {
      console.log(error);
      setErrorMessage("Test File not uploaded")
    })
    }

    const handlePrediction = async () => {
      setPredict(true);
      setLoading(true);
      let formData = new FormData();
      formData.append('filename', testFile)

      const { data } = await axios.post(`http://${import.meta.env.VITE_SERVER_ADDRESS}/testmodel`,formData, { params: {
      'email': JSON.parse(localStorage.getItem("userInfo")).data.email,
      'filename': testFile,
      'modelname': model
    }}, {
      headers: {
        "Content-type": "application/json"
      }
    })

      setResults({
        ...results,
        columns: data.columns,
        dataframe: data.dataframe
      })
      console.log(data.dataframe);
      console.log(data.dataframe[0][data.columns.length - 1]);

      y = 0;
      n = 0;
      for(let i = 0; i < data.dataframe.length - 1; i++) {
        if(data.dataframe[i][data.columns.length - 1] === 0) {
          n += 1
        } else {
          y += 1
        }
      }
      setChurn({
        ...churn,
        yes: y,
        no: n
      })
      console.log(y + " " + n);
      setLoading(false);
    }
    const handleCSVDownload = () => {
      console.log("In download");
      
    }
    useEffect(() => {
        getUserDetails();
        if(file) {
        }
      }, []);

  return (
    <SideBar>
      <div className="main-predict">
        <div className="predict">
          <TitleCard title={"Select files & Models"} width={"w-half"} className='predict-child'>
            <div>
            <select value={testFile} onChange={(event) => handleTestFile(event)} className="select select-primary w-full max-w-xs">
              {
                userDetails.files.map((file, ind) => {
                  return <option key={ind} value={file}>{file}</option>
                })
              }
            </select>
            </div>

            <div style={{'marginTop': '5vh'}}>
              <select value={model} onChange={(event) => handleModelChange(event)} className="select select-primary w-full max-w-xs">
                {
                  userDetails.models.map((model, ind) => {
                    return <option key={ind} value={model}>{model}</option>
                  })
                }
              </select>
            </div>
            <button className="btn btn-outline custom-btn w-xs" onClick={handlePrediction}>Predict</button>
          </TitleCard>

          <TitleCard title={"Upload Test File"} width={"w-half"} className='predict-child'>
            <div>
            <input type="file" id='csv-file' className="file-input file-input-bordered file-input-primary w-full max-w-xs" onClick={() => {setErrorMessage(""); setSuccessMessage("")}}/>
            </div>
            {errorMessage && <p className={`text-center text-error mt-8`}>{errorMessage}</p>}
            {successMessage && <p className={`text-center text-success mt-8`}>{successMessage}</p>}
            <div>
            <button className='btn btn-primary custom-btn max-w-xs' onClick={handleTestFileUpload}>Upload File</button>
            </div>
          </TitleCard>
        </div>

        {
          loading && <progress className="progress w-full"></progress>
        }

        {predict &&
          <div style={{'marginTop': "10vh"}}>
          <div className="stats stats-vertical lg:stats-horizontal shadow">
            
            <div className="stat">
              <div className="stat-title">Customer Churn Rate</div>
              <div className="stat-value">{`${((churn.yes / (churn.yes + churn.no)) * 100).toFixed(2)}%`}</div>
            </div>
            
            <div className="stat">
              <div className="stat-title">Total Customers</div>
              <div className="stat-value">{`${churn.yes + churn.no}`}</div>
            </div>

            <div className="stat">
              <div className="stat-title">Customers likely to Leave</div>
              <div className="stat-value">{`${churn.yes}`}</div>
            </div>

            <div className="stat">
              <div className="stat-title">Customers who will stay</div>
              <div className="stat-value">{`${churn.no}`}</div>
            </div>
            
          </div>
            <TitleCard topMargin={'mt-12'} bottomMargin= {'mb-8'} title={'New Predictions on Churn'} content={false}>
            </TitleCard>
          <div style={{'maxHeight': '50vh', 'borderRadius': '5vh',  'padding': '5vh', 'display': 'flex', 'justifyContent': 'center', 'alignItems': 'center', 'gap': '2vw',  'flexWrap': 'wrap'}}>
          {
          <Pie data={{
            labels:['Customers Retained', 'Customers Leaving'],
            datasets: [
              {
                label:['No. Of Customers'],
                data:[churn.no, churn.yes],
                backgroundColor: [
                  '#76B947',
                  '#FF8042'
                ],
              }
            ]
          }} options={{
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

          <div className='pred'>

        <TitleCard title={'Predictions on New Data'} width={"w-full"}>
        <CSVLink data={results.dataframe} headers={results.columns} filename={`${testFile}`} target="_blank">
          <BsDownload className='download' onClick={() => handleCSVDownload()}/>
        </CSVLink>
        <div className="overflow-x-auto">
          <table className="table w-full">
            {/* head*/}
            <thead>
              <tr>
              {
                results.columns.map((column, ind) => {
                  return (
                    <th key={ind}>{column}</th>
                  )
                })
              }
              </tr>
            </thead>
            <tbody>
              {results.dataframe.map((ele, ind) => {
                return <tr key={ind} className={ind % 2 !== 0 ? "active" : ""}>
                  {
                    ele.map((element, index) => {
                      return <td key={index} >{element}</td>
                    })
                  }                      
                </tr>
              })}
            </tbody>
          </table>
        </div>
        </TitleCard>
        </div>
        </div>
        }  
      </div>
    </SideBar>
  )
}

export default Predict;