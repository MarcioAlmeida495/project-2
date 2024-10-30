import { styledInputDate } from "../../../StyledComponents";
import PTypes from 'prop-types';
const VarInputDate = styledInputDate();
export const InputDate = ({onChange = () => {}}) => {


  return <VarInputDate onChange={(event)=>{onChange(event)}} type="date" name="date" id="ipdate" />
}

InputDate.propTypes = {
  onChange: PTypes.func,
}
