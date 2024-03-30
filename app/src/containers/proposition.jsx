import './proposition.css';

import { useSelector } from 'react-redux';
import Proposition from '../components/UXElements/components/Proposition/index';


const Propositions = ({history}) => {
  const {favorites} = useSelector((state) => state.favorites);

  return(
    <>
      <ul className="ulContainer">
        {history.propositions.map((proposition, index) => {
          return(
            <Proposition key={index} history={true} proposition={proposition}/>
          );
        })}
      </ul>
    </>
  );
};
               

export default Propositions;