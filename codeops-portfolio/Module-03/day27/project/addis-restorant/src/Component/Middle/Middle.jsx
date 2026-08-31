import './Middle.css'
import LeftMiddle from './Left_Middle/LeftMiddle'
import RigthMiddle from './Right_Middle/RigthMiddle'

function Middle() {
  return (
    <div className='middle-grid'>
        <LeftMiddle/>
        <RigthMiddle/>
    </div>
  )
}

export default Middle