import React, { useState, useEffect } from 'react'
import { FormControl, InputLabel, Input, Button, List, ListItem, ListItemText, TextField, ListItemSecondaryAction, IconButton, ListItemIcon, Checkbox, Select, MenuItem, Grid, Card, CardContent } from '@material-ui/core'
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import DeleteIcon from '@material-ui/icons/Delete'
import { useDispatch, useSelector } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import { RootState } from '../store/store'
import { setCurrentImages } from '../store/NASAIg-actions'
import { getAPODDefault } from '../store/NASAIg-actions'
import { SolarSystemLoading } from 'react-loadingg';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { setLoading } from '../store/NASAIg-actions'
import { setLikes } from '../store/NASAIg-actions'
import { PURGE } from 'redux-persist'
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date'
import { setCopyImages } from '../store/NASAIg-actions'
import { SET_COPY_LIKES } from '../store/NASAIg-types'
import { setCopyLikes } from '../store/NASAIg-actions'

export default function NASAIg(this: any) {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const forceUpdate = useForceUpdate()
  const [selectedDateStart, setSelectedDateStart] = useState('01/01/2019')
  const [selectedDateEnd, setSelectedDateEnd] = useState('01/01/2019')
  const dispatch = useDispatch<ThunkDispatch<{}, {}, AnyAction>>()
  const currentImages = useSelector((state: RootState) => state.NASAIg.currentImages)
  const [buttonDisplay, setButtonDisplay] = useState(true)
  const loading = useSelector((state: RootState) => state.NASAIg.loading)
  const likes = useSelector((state: RootState) => state.NASAIg.likes)
  const copyImages = useSelector((state: RootState) => state.NASAIg.copyImages)
  const copyLikes = useSelector((state: RootState) => state.NASAIg.copyLikes)
  function useForceUpdate(){
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => value + 1); // update the state to force render
  }

  const handleLike = (evt: React.MouseEvent, idx: number) => {
    if (likes[idx] === 0) {
      likes[idx] = 1
      console.log(likes)
      dispatch(setLikes(likes))
    } else if (likes[idx] === 1) {
      likes[idx] = 0
      console.log(likes)
      dispatch(setLikes(likes))
    } else {
      likes[idx] = 1
      console.log(likes)
      dispatch(setLikes(likes))
    }
    forceUpdate()
  }

  const filterImages = (evt: React.MouseEvent) => {
    dispatch(setCopyImages(currentImages))
    dispatch(setCopyLikes(likes))
    const temp3 = currentImages.filter((element: any, idx: number) => {
      const check = new Date(element.date)
      const to = new Date(selectedDateEnd)
      const from = new Date(selectedDateStart)
      if((check.getTime() <= to.getTime() && check.getTime() >= from.getTime())) {
        return true
      } else {
        const temp4 = likes.slice(0, idx)
        temp4.concat(likes.slice(idx+1, likes.length))
        dispatch(setLikes(temp4))
        return false
      }
    })
    dispatch(setCurrentImages(temp3))
    console.log(likes)
    forceUpdate()
  }
  const resetFilter = (evt: React.MouseEvent) => {
    dispatch(setCurrentImages(copyImages))
    dispatch(setLikes(copyLikes))
    forceUpdate()
  }

  const purgeStore = (evt: React.MouseEvent) => { 
    evt.preventDefault();
    dispatch({ 
        type: PURGE,
        key: "root",    // Whatever you chose for the "key" value when initialising redux-persist in the **persistCombineReducers** method - e.g. "root"
        result: () => null              // Func expected on the submitted action. 
    })  
    dispatch(setLoading(true))  
  }

  useEffect(() => {
    setButtonDisplay(false)
    dispatch(setLoading(true))
    dispatch(getAPODDefault()).then(res => {
      dispatch(setLoading(false))
      dispatch(setCurrentImages(res))
      dispatch(setCopyImages(currentImages))
      console.log(currentImages)
      const temp = new Array<number>()
      currentImages.forEach((element: any) => {
        temp.push(0)
      })
      dispatch(setLikes(temp))
      console.log(temp)
      console.log(likes)
      forceUpdate()
    }).catch(err => {
      console.log(err)
    })
  }, [])

  return (
    <div>
      <h1>NASA Photo Feed</h1>
      <Button variant="contained" color="primary" onClick={purgeStore}>New Images</Button>
      {loading &&
        <SolarSystemLoading size={"large"}/>
      }
      <React.Fragment>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          disableToolbar
          style={{marginTop: "-0.5%", marginLeft: "1%", marginRight: "1%"}}
          variant="inline"
          format="yyyy/dd/MM"
          margin="normal"
          id="date-picker-inline"
          label="Start Date"
          value={selectedDateStart}
          onChange={(_, newValue) => setSelectedDateStart(newValue ? newValue : '2019/01/01')}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        > Start Date</KeyboardDatePicker>
      </MuiPickersUtilsProvider>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        style={{marginTop: "-0.5%", marginLeft: "1%", marginRight: "1%"}}
        disableToolbar
        variant="inline"
        format="yyyy/dd/MM"
        margin="normal"
        id="date-picker-inline"
        label="End Date"
        value={selectedDateEnd}
        onChange={(_, newValue) => setSelectedDateEnd(newValue ? newValue : '2019/01/01')}
        KeyboardButtonProps={{
          'aria-label': 'change date',
        }}
      > End Date</KeyboardDatePicker>
    </MuiPickersUtilsProvider>
    <Button variant="contained" color="primary" onClick={filterImages}>Filter By Date</Button>
    <Button variant="contained" color="primary" onClick={resetFilter} style={{marginLeft: "1%"}}>Reset Filter</Button>
    </React.Fragment>
      <List style={{
        position: 'absolute', left: '50%',
        transform: 'translate(-50%, 0%)'
      }}>
        {currentImages.map((img, idx) => 
        <ListItem key={idx}> 
          <Card style={{width: "50vw", height: "60vh"}}>
            <CardContent style={{
        position: 'relative', left: '50%',
        transform: 'translate(-50%, 0%)'
      }}>
          <IconButton onClick={(evt) => handleLike(evt, idx)}>
                <FavoriteIcon/>
                {likes[idx]}
              </IconButton>
              <ListItemText
              primary={img.title}
              secondary={img.date}  
              />
              <img src={img.url}></img>
            </CardContent>
          </Card>
        </ListItem>
        )}
      </List>
    </div>
  )
}  


