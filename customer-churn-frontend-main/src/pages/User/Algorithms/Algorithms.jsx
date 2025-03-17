import React, { useState, useEffect } from 'react'
import SideBar from '../../../components/SideBar/SideBar';
import TitleCard from '../../../components/TitleCard/TitleCard';
import axios from 'axios';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import Chart from 'chart.js/auto';
import { Pie, Bar } from 'react-chartjs-2';

let file = "";
const Algorithms = () => {
  const [ currentFile, setCurrentFile ] = useState(file);
  const [ score, setScore ] = useState([]);
  const [ loading, setLoading ] = useState(false);
  const [ successMessage, setSuccessMessage ] = useState("");
  const [ radio, setRadio ] = useState("accuracy");
  const [ userDetails , setUserDetails ] = useState({
    username: "",
    email: "",
    files: [],
    models: []
  });

  const handleCurrentFile = (event) => {
    setCurrentFile(event.target.value);
    setSuccessMessage("");
    file = event.target.value;
  }
  const handleModelTraining = async () => {
    setLoading(true);
    let formData = new FormData();
    formData.append('filename', file)

    // console.log(file);
    const { data } = await axios.post(`http://${import.meta.env.VITE_SERVER_ADDRESS}/trainmodel`, formData, { params: {
      'email': JSON.parse(localStorage.getItem("userInfo")).data.email,
      'filename': file
    }}, {
      headers: {
        "Content-type": "application/json"
      }
    })

    if(data.info === "model trained already") {
      setLoading(false);
      setSuccessMessage("Model Already Trained")
      return;
    }
    // console.log(data);
    getUserDetails();
    setLoading(false);
  }
  const getUserDetails = async () => {
    const user = await axios.get(`http://${import.meta.env.VITE_SERVER_ADDRESS}/user/${JSON.parse(localStorage.getItem("userInfo")).data.email}`, {
      headers: {
          "Content-type": "application/json"
      }
    });
    // console.log(user);
    setUserDetails({
      ...userDetails,
      username: user.data.data.username,
      email: user.data.data.email,
      files: user.data.data.train_files,
      models: user.data.data.models,
      scores: user.data.data.scores
    });

    file = user.data.data.train_files[0]
    // console.log(userDetails.scores);
  }
  const handleGetModelScores = (file) => { 
    // console.log(file);

    let ind = userDetails.models.indexOf(file);
    setCurrentFile(file);
    setScore([]);
    setScore(userDetails.scores[ind]);
   
    console.log(score);
  }
  const handleRadioChange = (e) => {
    // console.log(e.target.value);
    setRadio(e.target.value);
  }
  useEffect(() => {
    getUserDetails();
    if(file) {
      // handleModelTraining();
    }
  }, [])

  return (
    <SideBar>
      <div className="algorithms">
        <TitleCard title={'Select a file to Train model'} width={"w-full"}>
          <div>
            <select value={currentFile} onChange={(event) => handleCurrentFile(event)} className="select select-primary w-full max-w-lg">
              {
                userDetails.files.map((file, ind) => {
                  return <option key={ind} value={file}>{file}</option>
                })
              }
            </select>
            </div>
            {successMessage && <p className={`text-center text-success mt-8`}>{successMessage}</p>}
            <div>
            <button className="btn btn-primary custom-btn" onClick={handleModelTraining}>Train Model</button>
          </div>
        </TitleCard>

          
        
        <TitleCard title={"Your Models"} width={"w-full"}>
            {
              loading 
              ? 
              <div><progress className="progress w-56"></progress></div>
              :
              <div className="overflow-x-auto">
                <table className="table w-full">
                  <thead>
                    <tr>
                      <th></th>
                      <th>Model Name</th>
                      <th>Details</th>
                    </tr>
                  </thead>
                  <tbody>
                      {
                        userDetails.models.map((model, ind) => {
                          return (<tr key={ind}>
                            <th>{ind + 1}</th>
                            <td>{model}</td>
                            <td><button className='btn btn-primary' onClick={() => handleGetModelScores(model)}>View Details</button></td>
                          </tr>
                        )})
                      }  
                  </tbody>
                </table>
              </div>
            }
        </TitleCard>

        {currentFile && 

          <TitleCard title={`Classification Metrics for ${currentFile}`} width={'w-full'}>
            {
              <div>
              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text">Accuracy</span> 
                  <input type="radio" name="radio-10" className="radio checked:bg-green-500" value={'accuracy'} onClick={(e) => handleRadioChange(e)} defaultChecked />
                </label>
              </div>
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text">Precision</span> 
                <input type="radio" name="radio-10" className="radio checked:bg-blue-500" value={'precision'} onClick={(e) => handleRadioChange(e)}/>
              </label>
            </div>
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text">Recall</span> 
                <input type="radio" name="radio-10" className="radio checked:bg-red-500" value={'recall'} onClick={(e) => handleRadioChange(e)}/>
              </label>
            </div>
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text">f1-score</span> 
                <input type="radio" name="radio-10" className="radio checked:bg-secondary" value={'f1-score'} onClick={(e) => handleRadioChange(e)}/>
              </label>
            </div>
                <Bar className='chart' style={{ 'border': '0.5vh solid black', 'borderRadius': '1vh', 'padding': '1vh'}} data={{
                labels: score.map((ele) => ele.model),
                datasets:[
                  {
                    label:radio,
                    data: score.map((ele) => {
                      if(radio === 'accuracy') return ele.accuracy
                      if(radio === 'precision') return ele.precision
                      if(radio === 'f1-score') return ele.f1_score
                      if(radio === 'recall') return ele.recall
                    }),
                    backgroundColor: radio === 'accuracy' ? '#76B947' : (radio === 'precision' ? 'blue': (radio === 'recall' ? 'red' : '#d923c7')),
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
              }}/>
              </div>
            }
            
            </TitleCard>  
          }

        {score &&

        <div className='scores'>
          {
            score.map((ele, ind) => {
              return (
                <TitleCard classname = "algo" title={ele.model} width={'w-half'} topMargin={'mt-12'} bottomMargin= {'mb-8'}>
                   <div className="stat">
                      <div className="topic">Accuracy: </div>
                      <div className="value">{`${ele.accuracy * 100}`.substring(0, 5)}</div>
                    </div>
                  
                  <div className="stat">
                    <div className="topic">Precision: </div>
                    <div className="value">{`${ele.precision * 100}`.substring(0, 5)}</div>
                  </div>

                  <div className="stat">
                    <div className="topic">Recall: </div>
                    <div className="value">{`${ele.recall * 100}`.substring(0, 5)}</div>
                  </div>

                  <div className="stat">
                    <div className="topic">F1-score: </div>
                    <div className="value">{`${ele.f1_score * 100}`.substring(0, 5)}</div>
                  </div>
                </TitleCard>
              )
            })
          }

        </div>

        }
      </div>
    </SideBar>
  )
}

export default Algorithms;