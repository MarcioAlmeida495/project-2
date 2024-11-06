import P from 'prop-types';
import { useEffect, useState } from 'react';
import { StyledSelect } from './StyledSelect';

const Select = StyledSelect('50%');
export const DataSelect = ({data = [], onChange = () => {}}) => {
  const [dataValues, setDataValues] = useState(data);
  const [clicks, setClicks] = useState(0);
  const onChangeEvent = (event) => {
    const selectedOption = event.target.selectedOptions[0].value;
    onChange(selectedOption);
  }

  const handleClick2times  = (event) => {
    if(clicks === 1){
      console.log(event.target.value);
      onChange(event.target.value);
      setClicks(clicks+1);
    }
    else setClicks(clicks+1);

    if(clicks > 1) setClicks(0);
  }
  useEffect(()=>{
    setClicks(0);
  }, [dataValues])
  useEffect(()=>{
    setDataValues(data);
  }, [data]);

  return (
    <>
      <Select onClick={(event)=>{handleClick2times(event)}} onChange={(event)=>onChangeEvent(event)} name="datas" id="datas">

        {dataValues.map((value, index) => {
          return <option onClick={()=>{console.log(value)}}  key={index} value={value} >{value}</option>
        })}
      </Select>
    </>
  )
}

DataSelect.propTypes = {
  data: P.array,
  onChange: P.func,
}
