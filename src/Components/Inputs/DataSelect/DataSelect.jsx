import P from 'prop-types';
import { useEffect, useState } from 'react';
import { StyledSelect } from './StyledSelect';

const Select = StyledSelect('50%');

export const DataSelect = ({data = []}) => {
  const [dataValues, setDataValues] = useState(data);

  useEffect(()=>{
    setDataValues(data);
  }, [data])

  return (
    <>
      <Select name="datas" id="datas">
        {dataValues.map((value, index) => {
          return <option key={index} value={value} >{value}</option>
        })}
      </Select>
    </>
  )
}

DataSelect.propTypes = {
  data: P.array,
}
